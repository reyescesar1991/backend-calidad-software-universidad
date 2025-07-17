"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const tsyringe_1 = require("tsyringe");
const oauthService_1 = require("../services/oauthService");
const general_exceptions_1 = require("../core/exceptions/generals/general.exceptions");
/**
 * Middleware para verificar un token JWT y su sesión activa.
 * Si la validación es exitosa, adjunta el payload del usuario a `req.user`.
 * Si no, lanza un error que será capturado por el errorHandler global.
 */
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
        if (!token) {
            throw new general_exceptions_1.UnauthorizedSessionError('No se proporcionó token de autenticación.');
        }
        // 1. Obtenemos la instancia del servicio del contenedor de tsyringe
        const sessionService = tsyringe_1.container.resolve(oauthService_1.SessionManagamentService);
        // 2. El servicio se encarga de toda la validación compleja
        const userPayload = await sessionService.verifyActiveSessionAndToken(token);
        // 3. Si todo es válido, adjuntamos el payload al objeto Request para uso posterior
        req.user = userPayload;
        // 4. Pasamos al siguiente middleware o al controlador de la ruta
        next();
    }
    catch (error) {
        // Cualquier error (token inválido, sesión no encontrada, etc.)
        // es enviado al middleware de manejo de errores.
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authentication.middleware.js.map