import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../core/logger'; // Es mejor usar un logger centralizado
import { handleMiddlewareError } from '../../../core/utils/middlewareErrorHandler';
import { dataRecoverUsernameSchemaZod } from '../../../validations/oauthValidators/oauth.validation';

export const validateRecoveryUser = (req: Request, res: Response, next: NextFunction) => {
    logger.info('--- MIDDLEWARE: Ejecutando validateRecoveryUser ---');
    logger.debug({ message: 'Request Body Recibido:', body: req.body });

    // --- PUNTO DE CONTROL #1: Verificar que el schema no sea undefined ---
    // Esto nos dirá inmediatamente si hay un problema con la importación.
    if (!dataRecoverUsernameSchemaZod) {
        const importError = new Error('FATAL: El schema de validación (dataRecoverUsernameSchemaZod) es undefined. Revisa la importación.');
        logger.error(importError.message);
        // Pasamos el error al manejador global para que nos dé un 500 y sepamos que algo está muy mal.
        return next(importError);
    }

    try {
        // --- PUNTO DE CONTROL #2: Intentar la validación ---
        dataRecoverUsernameSchemaZod.parse(req.body);

        // Si el código llega aquí, la validación fue exitosa.
        logger.info('Validación de Zod recuperacion de usuario SUPERADA. Pasando al controlador.');
        next();

    } catch (error) {

        handleMiddlewareError(error, res, next, 'Datos de recuperacion de usuario inválidos');
    }
};