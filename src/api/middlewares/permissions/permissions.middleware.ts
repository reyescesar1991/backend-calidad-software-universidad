// src/middlewares/permissions.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { logger } from '../../../core/logger';
import { UserService } from '../../../services/userService/user.service';
import { ForbiddenError, UnauthorizedError } from '../../../core/exceptions';

// Resuelve tu servicio de permisos (usando Tsyring como ya lo haces)
const userService = container.resolve(UserService);

export const checkPermission = (requiredPermissionLabel: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        logger.info(`Middleware: Verificando permiso '${requiredPermissionLabel}' para la ruta.`);
        try {
            // Asume que tu token JWT (en el header 'Authorization') ya ha sido decodificado
            // por un middleware de autenticación previo y el userId se ha adjuntado al request.
            // Si tu userId viene en el token, necesitas un middleware de autenticación antes.
            const userId = req.user?.id; // Ejemplo: si el middleware de auth adjunta `req.user = { id: '...', roleId: '...' }`

            if (!userId) {
                logger.warn('Middleware de permisos: No se encontró userId en el request. Posible falta de autenticación.');
                throw new UnauthorizedError('Acceso no autorizado. Se requiere autenticación.');
            }

            logger.debug(`Middleware de permisos: userId '${userId}' intentando '${requiredPermissionLabel}'.`);

            // Consulta tu servicio de permisos
            const hasPermission = await userService.verifyPermissionUser(userId, requiredPermissionLabel);

            if (hasPermission) {
                logger.info(`Middleware de permisos: userId '${userId}' TIENE permiso '${requiredPermissionLabel}'.`);
                next(); // Permiso concedido, pasa al siguiente middleware/controlador
            } else {
                logger.warn(`Middleware de permisos: userId '${userId}' NO TIENE permiso '${requiredPermissionLabel}'.`);
                throw new ForbiddenError(`Acceso denegado. No tiene permiso para '${requiredPermissionLabel}'.`); // 403 Forbidden
            }
        } catch (error) {
            logger.error({ message: `Middleware de permisos: Error durante la verificación de '${requiredPermissionLabel}'.`, error });
            next(error); // Pasa el error al middleware de errores global
        }
    };
};