"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManagamentService = void 0;
const tsyringe_1 = require("tsyringe");
const transactionManager_1 = require("../../../core/database/transactionManager");
const validators_1 = require("../../../core/validators");
const exceptions_1 = require("../../../core/exceptions");
const user_service_1 = require("../../userService/user.service");
const Token_service_1 = require("./Token.service");
const jwt_util_1 = require("../../../core/utils/jwt.util");
const helper_1 = require("../../../core/helper");
const transaccional_wrapper_1 = require("../../../core/utils/transaccional-wrapper");
let SessionManagamentService = class SessionManagamentService {
    transactionManager;
    sessionManagementRepository;
    sessionManagementValidator;
    tokenService;
    userService;
    constructor(transactionManager, sessionManagementRepository, sessionManagementValidator, tokenService, userService) {
        this.transactionManager = transactionManager;
        this.sessionManagementRepository = sessionManagementRepository;
        this.sessionManagementValidator = sessionManagementValidator;
        this.tokenService = tokenService;
        this.userService = userService;
    }
    /**
     * Verifica la validez de un token y su sesión activa en la base de datos.
     * Este método está diseñado para ser usado por middlewares de autenticación.
     * @param token El token JWT a verificar.
     * @returns El payload del JWT si todo es correcto.
     * @throws {UnauthorizedError} Si el token es inválido, ha expirado, o la sesión no es válida.
     */
    async verifyActiveSessionAndToken(token) {
        try {
            // 1. Verificamos la firma y expiración del token.
            const userData = this.tokenService.verifyToken(token);
            // 2. Verificamos que el usuario esté activo.
            await this.userService.getStatusUserActive(userData.userId);
            // 3. Verificamos que el token exista en una sesión activa en la BD.
            await this.sessionManagementValidator.validateUserTokenIsValid(userData.userId, token);
            return userData;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error); // Relanza el error para que el middleware lo capture.
        }
    }
    async getSessionUserValidate(customId) {
        try {
            //1. Verificamos que el usuario este activo y exista
            await this.userService.getStatusUserActive(customId);
            //2. Verificamos que ya no tenga previamente una sesion activa
            const sessionUser = await this.sessionManagementRepository.getSessionUserValidate(customId);
            validators_1.SessionManagementValidator.validateUserAlreadyHaveASessionActive(sessionUser);
            return sessionUser;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async getSessionUser(customId) {
        try {
            //1. Verificamos que el usuario este activo y exista
            await this.userService.getStatusUserActive(customId);
            //2. Verificamos que ya no tenga previamente una sesion activa
            const sessionUser = await this.sessionManagementRepository.getSessionUserValidate(customId);
            validators_1.SessionManagementValidator.validateUserIsNotAlreadyHaveASessionActive(sessionUser);
            return sessionUser;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async createSessionUser(sessionUserParam, session) {
        try {
            //1. Verificamos que el usuario se encuentre en un estado de activo y exista en una sola operacion a traves del servicio de user
            await this.userService.getStatusUserActive(sessionUserParam.userId);
            //2. Verificamos que ya no tenga previamente una sesion activa
            const sessionUser = await this.sessionManagementRepository.getSessionUserValidate(sessionUserParam.userId);
            validators_1.SessionManagementValidator.validateUserAlreadyHaveASessionActive(sessionUser);
            //3. Creamos la sesion
            const jwtExpiration = this.tokenService.verifyToken(sessionUserParam.token).exp;
            sessionUserParam.expiresAt = (0, helper_1.configureDateToJwt)(jwtExpiration);
            return await this.sessionManagementRepository.createSessionUser(sessionUserParam, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async updateSessionUser(dataUpdate) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                //1. Verificamos que el usuario se encuentre en un estado de activo y exista en una sola operacion a traves del servicio de user
                const userData = await this.tokenService.verifyToken(dataUpdate.token);
                await this.userService.getStatusUserActive(userData.userId);
                //2. Verificamos que tenga previamente una sesion activa
                await this.sessionManagementValidator.validateUserIsLogged(userData.userId);
                //3. Verificamos que el token sea valido
                await this.sessionManagementValidator.validateUserTokenIsValid(userData.userId, dataUpdate.token);
                //4. Actualizamos la data de la version
                const newToken = this.tokenService.refreshToken(dataUpdate.token);
                const jwtExpiration = (0, helper_1.configureDateToJwt)(this.tokenService.verifyToken(newToken).exp);
                const newDataUpdate = {
                    token: newToken,
                    expiresAt: jwtExpiration,
                };
                return await this.sessionManagementRepository.updateSessionUser(userData.userId, newDataUpdate, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async deleteSessionUser(dataUpdate, session) {
        try {
            //1. Verificamos que el usuario se encuentre en un estado de activo y exista en una sola operacion a traves del servicio de user
            const userData = await this.tokenService.verifyToken(dataUpdate.token);
            await this.userService.getStatusUserActive(userData.userId);
            //2. Verificamos que tenga previamente una sesion activa
            await this.sessionManagementValidator.validateUserIsLogged(userData.userId);
            //3. Verificamos que el token sea valido
            await this.sessionManagementValidator.validateUserTokenIsValid(userData.userId, dataUpdate.token);
            console.log("Tiempo restante del token: ", jwt_util_1.JwtValidator.getRemainingTime(userData));
            const jti = userData.jti;
            const remainingTimeInSeconds = 300;
            //TODO: // src/core/middleware/auth.middleware.ts (EJEMPLO) EL MIDDLEWARE IMPLEMENTAR ESTO EN EL CONTROLADOR 
            /*
                    
                    export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];

if (!token) {
return res.status(401).json({ message: 'No se proporcionó token.' });
}

try {
const decoded = verify(token, process.env.JWT_SECRET) as JwtPayload;

// --- LA NUEVA VERIFICACIÓN CON REDIS ---
const redisClient = redisService.getClient();
const isBlocked = await redisClient.get(`blocklist:${decoded.jti}`);

if (isBlocked) {
    return res.status(401).json({ message: 'Token inválido o sesión cerrada.' });
}
// --- FIN DE LA VERIFICACIÓN ---

// Si todo está bien, adjuntamos los datos del usuario al request
req.user = decoded;
next();

} catch (error) {
return res.status(401).json({ message: 'Token inválido o expirado.' });
}
}
            */
            // try {
            //     // Usa los comandos de Redis. Son muy parecidos.
            //     // set(key, value, options)
            //     await redisClient.set(`blocklist:${jti}`, 'blocked', {
            //         ex: remainingTimeInSeconds, // ex = expire en segundos
            //     });
            //     console.log(`Token ${jti} añadido a la lista negra.`);
            // } catch (error) {
            //     console.error("Error al contactar Redis:", error);
            // }
            //4. Eliminamos la sesion del usuario
            return await this.sessionManagementRepository.deleteSessionUser(userData.userId, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
};
exports.SessionManagamentService = SessionManagamentService;
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SessionManagamentService.prototype, "createSessionUser", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SessionManagamentService.prototype, "deleteSessionUser", null);
exports.SessionManagamentService = SessionManagamentService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("TransactionManager")),
    __param(1, (0, tsyringe_1.inject)("ISessionManagementRepository")),
    __param(2, (0, tsyringe_1.inject)("SessionManagementValidator")),
    __param(3, (0, tsyringe_1.inject)("JwtService")),
    __param(4, (0, tsyringe_1.inject)("UserService")),
    __metadata("design:paramtypes", [transactionManager_1.TransactionManager, Object, validators_1.SessionManagementValidator,
        Token_service_1.TokenService,
        user_service_1.UserService])
], SessionManagamentService);
//# sourceMappingURL=SessionManagement.service.js.map