import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { SessionManagamentService } from '../services/oauthService';
import { JwtPayload } from '../core/types';
import { UnauthorizedSessionError } from '../core/exceptions/generals/general.exceptions';

// Extendemos el tipo Request de Express para incluir la propiedad 'user'
declare global {
    namespace Express {
        export interface Request {
            user?: JwtPayload;
        }
    }
}

/**
 * Middleware para verificar un token JWT y su sesión activa.
 * Si la validación es exitosa, adjunta el payload del usuario a `req.user`.
 * Si no, lanza un error que será capturado por el errorHandler global.
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

        if (!token) {
            throw new UnauthorizedSessionError('No se proporcionó token de autenticación.');
        }

        // 1. Obtenemos la instancia del servicio del contenedor de tsyringe
        const sessionService = container.resolve(SessionManagamentService);

        // 2. El servicio se encarga de toda la validación compleja
        const userPayload = await sessionService.verifyActiveSessionAndToken(token);

        // 3. Si todo es válido, adjuntamos el payload al objeto Request para uso posterior
        req.user = userPayload;

        // 4. Pasamos al siguiente middleware o al controlador de la ruta
        next();
    } catch (error) {
        // Cualquier error (token inválido, sesión no encontrada, etc.)
        // es enviado al middleware de manejo de errores.
        next(error);
    }
};