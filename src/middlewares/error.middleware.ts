// src/middlewares/error.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError, BadFormatMongoIDError, DatabaseConnectionError, InvalidParamError, UnexpectedError } from '../core/exceptions';
import { UnauthorizedSessionError } from '../core/exceptions/generals/general.exceptions';

interface ErrorResponse {
    message: string;
    code?: number;    // Usaremos tu 'appCode' aquí
    details?: any;    // Para errores de validación o detalles específicos
    stack?: string;   // Solo en desarrollo para depuración
}

export const errorHandler = (
    err: Error, // TypeScript reconocerá 'err' como un Error
    req: Request,
    res: Response,
    next: NextFunction // Aunque a menudo no se usa, es parte de la firma
) => {
    let statusCode = 500; // Por defecto, Error Interno del Servidor
    let message = 'Algo salió mal en el servidor.';
    let internalAppCode: number | undefined; // Usaremos este para tus códigos 100x
    let details: any = undefined;

    // 1. Manejo de ZodError (Errores de Validación de Formato)
    if (err instanceof ZodError) {
        statusCode = 400; // Bad Request
        message = 'Error de validación de entrada.';
        internalAppCode = undefined; // ZodErrors no tienen tu appCode 100x
        details = err.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message
        }));
    }
    // 2. Manejo de tus AppError Personalizados
    else if (err instanceof AppError) {
        // Asignamos el código interno de la aplicación
        internalAppCode = err.code;

        // Determinamos el código de estado HTTP basado en el tipo específico de AppError
        if (err instanceof InvalidParamError) {
            statusCode = 400; // Bad Request
            message = err.message;
        } else if (err instanceof BadFormatMongoIDError) {
            statusCode = 400; // Bad Request
            message = err.message;
        } else if (err instanceof DatabaseConnectionError) {
            statusCode = 500; // Internal Server Error
            message = err.message;
        } else if (err instanceof UnauthorizedSessionError) {
            statusCode = 401; // Internal Server Error
            message = err.message;
        } else if (err instanceof UnexpectedError) {
            statusCode = 500; // Internal Server Error
            message = err.message;
            // Para UnexpectedError, podrías querer loggear el error original
            // o incluir más detalles del error original en `details`
            details = err.details; // Asumiendo que UnexpectedError ya pone el error original en details
        } else {
            // Si es un AppError pero no una subclase específica que hemos mapeado,
            // mantenemos el default 500.
            message = err.message;
            // No asignamos statusCode aquí si AppError base no lo tiene por defecto
        }
    }
    // 3. Manejo de cualquier otro Error genérico no capturado (ej. Error de JavaScript estándar)
    else {
        // Por defecto, ya tenemos 500 y un mensaje genérico.
        message = err.message || message; // Usamos el mensaje del error si existe
    }

    // Construye la respuesta final
    const errorResponse: ErrorResponse = {
        message: message,
        code: internalAppCode, // Aquí va tu 1001, 1002, etc.
        details: details,
    };

    // Solo incluye el stack trace en entornos de desarrollo para depuración
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack;
    }

    // Envía la respuesta con el código de estado HTTP determinado
    res.status(statusCode).json(errorResponse);
};