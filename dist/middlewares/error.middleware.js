"use strict";
// src/middlewares/error.middleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const exceptions_1 = require("../core/exceptions");
const general_exceptions_1 = require("../core/exceptions/generals/general.exceptions");
const errorHandler = (err, // TypeScript reconocerá 'err' como un Error
req, res, next // Aunque a menudo no se usa, es parte de la firma
) => {
    let statusCode = 500; // Por defecto, Error Interno del Servidor
    let message = 'Algo salió mal en el servidor.';
    let internalAppCode; // Usaremos este para tus códigos 100x
    let details = undefined;
    // 1. Manejo de ZodError (Errores de Validación de Formato)
    if (err instanceof zod_1.ZodError) {
        statusCode = 400; // Bad Request
        message = 'Error de validación de entrada.';
        internalAppCode = undefined; // ZodErrors no tienen tu appCode 100x
        details = err.errors.map(e => ({
            path: e.path.join('.'),
            message: e.message
        }));
    }
    // 2. Manejo de tus AppError Personalizados
    else if (err instanceof exceptions_1.AppError) {
        // Asignamos el código interno de la aplicación
        internalAppCode = err.code;
        // Determinamos el código de estado HTTP basado en el tipo específico de AppError
        if (err instanceof exceptions_1.InvalidParamError) {
            statusCode = 400; // Bad Request
            message = err.message;
        }
        else if (err instanceof exceptions_1.BadFormatMongoIDError) {
            statusCode = 400; // Bad Request
            message = err.message;
        }
        else if (err instanceof exceptions_1.DatabaseConnectionError) {
            statusCode = 500; // Internal Server Error
            message = err.message;
        }
        else if (err instanceof general_exceptions_1.UnauthorizedSessionError) {
            statusCode = 401; // Internal Server Error
            message = err.message;
        }
        else if (err instanceof exceptions_1.UnexpectedError) {
            statusCode = 500; // Internal Server Error
            message = err.message;
            // Para UnexpectedError, podrías querer loggear el error original
            // o incluir más detalles del error original en `details`
            details = err.details; // Asumiendo que UnexpectedError ya pone el error original en details
        }
        else {
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
    const errorResponse = {
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
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map