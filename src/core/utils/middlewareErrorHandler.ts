// utils/middlewareErrorHandler.ts (o donde consideres que va mejor)

import { Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../logger';
import { handleZodError } from './errorZodHandler';

/**
 * Helper genérico para manejar errores en middlewares de validación.
 * Distingue entre ZodError y otros tipos de errores.
 *
 * @param error El error capturado.
 * @param res El objeto Response de Express.
 * @param next La función NextFunction de Express.
 * @param zodErrorMessage Mensaje específico para ZodError (ej. "Datos inválidos").
 * @param zodErrorStatusCode Código de estado HTTP para ZodError (por defecto 400).
 * @param zodErrorCode Código de error interno para ZodError (por defecto 'VALIDATION_ERROR').
 */
export const handleMiddlewareError = (
    error: unknown, // 'unknown' es el tipo más seguro para errores en un catch
    res: Response,
    next: NextFunction,
    zodErrorMessage: string,
    zodErrorStatusCode: number = 400,
    zodErrorCode: string = 'VALIDATION_ERROR'
) => {
    logger.warn('La validación FALLÓ. Entrando al bloque CATCH en el middleware.');

    if (error instanceof ZodError) {
        logger.warn('El error es de tipo ZodError. Se manejará con handleZodError.');
        // Llama a tu helper específico para ZodError
        return handleZodError(error, res, next, zodErrorMessage, zodErrorStatusCode, zodErrorCode);
    } else {
        // Si el error NO es de Zod, es un error inesperado.
        logger.error({ message: 'Error inesperado durante la validación en el middleware, NO es un ZodError. Pasando al manejador global.', error });
        next(error); // Pasa errores no-Zod al siguiente middleware
    }
};