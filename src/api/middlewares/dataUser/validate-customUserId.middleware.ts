import { Request, Response, NextFunction } from 'express';
import { validateCustomUserIdSchemaZod } from '../../../validations';
import { logger } from '../../../core/logger';
import { handleMiddlewareError } from '../../../core/utils/middlewareErrorHandler';


export const validateCustomUserIdData = (req: Request, res: Response, next: NextFunction) => {

    logger.info('--- MIDDLEWARE: Ejecutando validateCustomUserIdData ---');
    logger.debug({ message: 'Request Body Recibido:', body: req.body });

    // --- PUNTO DE CONTROL #1: Verificar que el schema no sea undefined ---
    // Esto nos dirá inmediatamente si hay un problema con la importación.
    if (!validateCustomUserIdSchemaZod) {
        const importError = new Error('FATAL: El schema de validación (validateCustomUserIdSchemaZod) es undefined. Revisa la importación.');
        logger.error(importError.message);
        // Pasamos el error al manejador global para que nos dé un 500 y sepamos que algo está muy mal.
        return next(importError);
    }

    try {
        
        validateCustomUserIdSchemaZod.parse(req.body);

        // Si el código llega aquí, la validación fue exitosa.
        logger.info('Validación de Zod para el custom Id del usuario SUPERADA. Pasando al controlador.');

        next();
    } catch (error) {
        
        handleMiddlewareError(error, res, next, 'Datos de custom Id de usuario inválidos');
    }
};

