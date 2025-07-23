import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { SessionManagamentService } from '../../services/oauthService/services/SessionManagement.service';
import { logger } from '../../core/logger';
import { sendErrorResponse } from '../../core/helper';

const sessionManagementService = container.resolve(SessionManagamentService);

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    logger.info('--- MIDDLEWARE: Ejecutando authMiddleware ---');

    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            logger.warn('Auth Middleware: No se proporcionó token o el formato es incorrecto.');
            return sendErrorResponse(res, 401, 'Acceso no autorizado. Se requiere token Bearer.');
        }

        const token = authHeader.split(' ')[1];

        // Aquí usamos el servicio que ya tienes para validar todo.
        // ¡Esto es reutilizar código de forma inteligente!
        const userData = await sessionManagementService.verifyActiveSessionAndToken(token);

        if (!userData) {
            // Aunque el servicio ya lanza errores, esta es una doble verificación.
            logger.warn('Auth Middleware: La validación del token no devolvió datos de usuario.');
            return sendErrorResponse(res, 401, 'Token inválido o sesión expirada.');
        }

        // ¡IMPORTANTE! Adjuntamos los datos del usuario al objeto `req`.
        // Así, el siguiente middleware o el controlador final sabrán quién está haciendo la petición.
        // @ts-ignore - Añadiremos la definición de tipo para `req.user` en el siguiente paso.
        req.user = userData;

        logger.info(`Auth Middleware: Autenticación exitosa para userId: ${userData.userId}.`);
        next(); // ¡Paso libre! El token es válido.

    } catch (error: any) {
        logger.error({ message: 'Auth Middleware: Error durante la autenticación.', error: error.message });
        // El servicio ya maneja y lanza errores específicos (AppError).
        // Dejamos que el manejador de errores global lo capture y envíe la respuesta adecuada.
        next(error);
    }
};
