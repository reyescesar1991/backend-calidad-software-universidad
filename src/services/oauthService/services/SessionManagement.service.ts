import { inject, injectable } from "tsyringe";
import { ISessionManagementRepository } from "../interfaces/ISessionManagementRepository";
import { TransactionManager } from "../../../core/database/transactionManager";
import { SessionManagementValidator } from "../../../core/validators";
import { SessionManagementDto, UpdateSessionManagementDto } from "../../../validations";
import { SessionManagementDocument } from "../../../db/models";
import { handleError } from "../../../core/exceptions";
import { UserService } from "../../userService/user.service";
import { TokenService } from "./Token.service";
import { JwtValidator } from "../../../core/utils/jwt.util";
import { configureDateToJwt } from "../../../core/helper";
import redisClient from "../../../core/utils/connectRedis";
import { Transactional } from "../../../core/utils/transaccional-wrapper";
import { ClientSession } from "mongoose";


@injectable()
export class SessionManagamentService {

    constructor(
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("ISessionManagementRepository") private readonly sessionManagementRepository: ISessionManagementRepository,
        @inject("SessionManagementValidator") private readonly sessionManagementValidator: SessionManagementValidator,
        @inject("JwtService") private readonly tokenService: TokenService,
        //users

        @inject("UserService") private readonly userService: UserService,
    ) { }

    /**
     * Verifica la validez de un token y su sesión activa en la base de datos.
     * Este método está diseñado para ser usado por middlewares de autenticación.
     * @param token El token JWT a verificar.
     * @returns El payload del JWT si todo es correcto.
     * @throws {UnauthorizedError} Si el token es inválido, ha expirado, o la sesión no es válida.
     */
    async verifyActiveSessionAndToken(token: string) {
        try {
            // 1. Verificamos la firma y expiración del token.
            const userData = this.tokenService.verifyToken(token);

            // 2. Verificamos que el usuario esté activo.
            await this.userService.getStatusUserActive(userData.userId);

            // 3. Verificamos que el token exista en una sesión activa en la BD.
            await this.sessionManagementValidator.validateUserTokenIsValid(userData.userId, token);

            return userData;
        } catch (error) {
            handleError(error); // Relanza el error para que el middleware lo capture.
        }
    }

    async getSessionUserValidate(customId: string): Promise<SessionManagementDocument | null> {

        try {

            //1. Verificamos que el usuario este activo y exista
            await this.userService.getStatusUserActive(customId);

            //2. Verificamos que ya no tenga previamente una sesion activa
            const sessionUser = await this.sessionManagementRepository.getSessionUserValidate(customId);
            SessionManagementValidator.validateUserAlreadyHaveASessionActive(sessionUser);

            return sessionUser;

        } catch (error) {

            handleError(error);
        }
    }

    async getSessionUser(customId: string): Promise<SessionManagementDocument | null> {

        try {

            //1. Verificamos que el usuario este activo y exista
            await this.userService.getStatusUserActive(customId);

            //2. Verificamos que ya no tenga previamente una sesion activa
            const sessionUser = await this.sessionManagementRepository.getSessionUserValidate(customId);
            SessionManagementValidator.validateUserIsNotAlreadyHaveASessionActive(sessionUser);

            return sessionUser;

        } catch (error) {

            handleError(error);
        }
    }

    @Transactional()
    async createSessionUser(sessionUserParam: SessionManagementDto, session?: ClientSession): Promise<SessionManagementDocument | null> {

        try {

            //1. Verificamos que el usuario se encuentre en un estado de activo y exista en una sola operacion a traves del servicio de user

            await this.userService.getStatusUserActive(sessionUserParam.userId);


            //2. Verificamos que ya no tenga previamente una sesion activa
            const sessionUser = await this.sessionManagementRepository.getSessionUserValidate(sessionUserParam.userId);

            SessionManagementValidator.validateUserAlreadyHaveASessionActive(sessionUser);

            //3. Creamos la sesion
            const jwtExpiration = this.tokenService.verifyToken(sessionUserParam.token).exp;
            sessionUserParam.expiresAt = configureDateToJwt(jwtExpiration);
            return await this.sessionManagementRepository.createSessionUser(sessionUserParam, session);

        } catch (error) {

            handleError(error);
        }
    }

    async updateSessionUser(dataUpdate: UpdateSessionManagementDto): Promise<SessionManagementDocument | null> {

        return await this.transactionManager.executeTransaction(

            async (session) => {

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
                    const jwtExpiration = configureDateToJwt(this.tokenService.verifyToken(newToken).exp);

                    const newDataUpdate: UpdateSessionManagementDto = {

                        token: newToken,
                        expiresAt: jwtExpiration,
                    }

                    return await this.sessionManagementRepository.updateSessionUser(userData.userId, newDataUpdate, session);

                } catch (error) {

                    handleError(error);
                }
            }
        )
    }

    @Transactional()
    async deleteSessionUser(dataUpdate: UpdateSessionManagementDto, session?: ClientSession): Promise<SessionManagementDocument | null> {

        try {

            //1. Verificamos que el usuario se encuentre en un estado de activo y exista en una sola operacion a traves del servicio de user
            const userData = await this.tokenService.verifyToken(dataUpdate.token);
            await this.userService.getStatusUserActive(userData.userId);

            //2. Verificamos que tenga previamente una sesion activa
            await this.sessionManagementValidator.validateUserIsLogged(userData.userId);

            //3. Verificamos que el token sea valido
            await this.sessionManagementValidator.validateUserTokenIsValid(userData.userId, dataUpdate.token);

            console.log("Tiempo restante del token: ", JwtValidator.getRemainingTime(userData));

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

        } catch (error) {

            handleError(error);
        }
    }
}