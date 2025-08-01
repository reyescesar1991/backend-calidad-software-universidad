import { Request, Response, NextFunction } from 'express';
import { logoutRequestSchemaZod } from '../../../validations/oauthValidators/oauth.validation';
import { logger } from '../../../core/logger'; // Es mejor usar un logger centralizado
import { handleMiddlewareError } from '../../../core/utils/middlewareErrorHandler';

export const validateLogoutData = (req: Request, res: Response, next: NextFunction) => {
    logger.info('--- MIDDLEWARE: Ejecutando validateLogoutData ---');
    logger.debug({ message: 'Request Body Recibido:', body: req.body });

    // --- PUNTO DE CONTROL #1: Verificar que el schema no sea undefined ---
    // Esto nos dirá inmediatamente si hay un problema con la importación.
    if (!logoutRequestSchemaZod) {
        const importError = new Error('FATAL: El schema de validación (logoutRequestSchemaZod) es undefined. Revisa la importación.');
        logger.error(importError.message);
        // Pasamos el error al manejador global para que nos dé un 500 y sepamos que algo está muy mal.
        return next(importError);
    }

    try {
        // --- PUNTO DE CONTROL #2: Intentar la validación ---
        logoutRequestSchemaZod.parse(req.body);

        // Si el código llega aquí, la validación fue exitosa.
        logger.info('Validación de Zod para la validacion del request de logout SUPERADA. Pasando al controlador.');
        next();

    } catch (error) {

        handleMiddlewareError(error, res, next, 'Datos de verificacion de logout inválidos');
    }
};