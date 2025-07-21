import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../core/logger'; // Es mejor usar un logger centralizado
import { handleMiddlewareError } from '../../../core/utils/middlewareErrorHandler';
import { secondFactorRequestSchemaZod } from '../../../validations/oauthValidators/oauth.validation';

export const validateInitiateRecoveryPassword2FA = (req: Request, res: Response, next: NextFunction) => {
    logger.info('--- MIDDLEWARE: Ejecutando validateInitiateRecoveryPassword2FA ---');
    logger.debug({ message: 'Request Body Recibido:', body: req.body });

    // --- PUNTO DE CONTROL #1: Verificar que el schema no sea undefined ---
    // Esto nos dirá inmediatamente si hay un problema con la importación.
    if (!secondFactorRequestSchemaZod) {
        const importError = new Error('FATAL: El schema de validación (secondFactorRequestSchemaZod) es undefined. Revisa la importación.');
        logger.error(importError.message);
        // Pasamos el error al manejador global para que nos dé un 500 y sepamos que algo está muy mal.
        return next(importError);
    }

    try {
        // --- PUNTO DE CONTROL #2: Intentar la validación ---
        secondFactorRequestSchemaZod.parse(req.body);

        // Si el código llega aquí, la validación fue exitosa.
        logger.info('Validación de Zod para la solicitud del 2FA de recuperacion de contraseña SUPERADA. Pasando al controlador.');
        next();

    } catch (error) {

        handleMiddlewareError(error, res, next, 'Datos de solicitud de 2fa de recuperacion de contraseña inválidos');
    }
};