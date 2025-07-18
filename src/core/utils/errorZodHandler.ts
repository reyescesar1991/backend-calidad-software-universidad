// utils/zodErrorHandler.ts (o el path que prefieras para tus helpers)

import { Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { sendErrorResponse } from '../../core/helper'; // Ajusta la ruta a tu helper de respuesta de error
import { logger } from '../logger';

/**
 * Helper para manejar y formatear errores de Zod en middlewares de Express.
 * Transforma un ZodError en una respuesta de error estandarizada.
 *
 * @param error El error capturado en el bloque catch.
 * @param res El objeto Response de Express.
 * @param next La función NextFunction de Express.
 * @param customMessage Mensaje personalizado para la respuesta de error (ej. "Datos de registro inválidos").
 * @param statusCode Código de estado HTTP para la respuesta (por defecto 400).
 * @param errorCode Código de error interno para la respuesta (por defecto 'VALIDATION_ERROR').
 */
export const handleZodError = (
    error: unknown, // Usamos 'unknown' porque el error puede ser de cualquier tipo antes de la comprobación
    res: Response,
    next: NextFunction,
    customMessage: string,
    statusCode: number = 400, // Valor por defecto para el código de estado
    errorCode: string = 'VALIDATION_ERROR' // Valor por defecto para el código de error interno
) => {
    
    if (error instanceof ZodError) {
        const errorDetails = error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));
        // Logueamos los detalles específicos del error de validación.
        // Usamos 'warn' porque es un error esperado del cliente (4xx), no un fallo del servidor (5xx).
        logger.warn({
            message: `Error de validación de Zod: ${customMessage}`,
            details: errorDetails
        });
        sendErrorResponse(res, statusCode, customMessage, errorDetails, errorCode);
    } else {
        // Si no es un ZodError, pásalo al siguiente middleware de errores
        next(error);
    }
};