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


@injectable()
export class SessionManagamentService{

    constructor(
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("ISessionManagementRepository") private readonly sessionManagementRepository : ISessionManagementRepository,
        @inject("SessionManagementValidator") private readonly sessionManagementValidator: SessionManagementValidator,
        @inject("JwtService") private readonly tokenService : TokenService,
        //users

        @inject("UserService") private readonly userService: UserService,
    ){}

    async createSessionUser(sessionUserParam : SessionManagementDto) : Promise<SessionManagementDocument | null>{

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    //1. Verificamos que el usuario se encuentre en un estado de activo y exista en una sola operacion a traves del servicio de user

                    await this.userService.getStatusUserActive(sessionUserParam.userId);
                    

                    //2. Verificamos que ya no tenga previamente una sesion activa
                    const sessionUser = await this.sessionManagementRepository.getSessionUserValidate(sessionUserParam.userId);

                    SessionManagementValidator.validateUserAlreadyHaveASessionActive(sessionUser);

                    //3. Creamos la sesion
                    sessionUserParam.expiresAt = JwtValidator.getRemainingTime(this.tokenService.verifyToken(sessionUserParam.token));
                    return await this.sessionManagementRepository.createSessionUser(sessionUserParam, session);
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }

    async updateSessionUser(dataUpdate : UpdateSessionManagementDto) : Promise<SessionManagementDocument | null>{

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

                    const newDataUpdate : UpdateSessionManagementDto = {

                        token : newToken,
                        expiresAt : JwtValidator.getRemainingTime(this.tokenService.verifyToken(dataUpdate.token)),
                    }
                    
                    return await this.sessionManagementRepository.updateSessionUser(userData.userId, newDataUpdate, session);
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }

    async deleteSessionUser(dataUpdate : UpdateSessionManagementDto): Promise<SessionManagementDocument | null>{

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

                    console.log("Tiempo restante del token: ", JwtValidator.getRemainingTime(userData));
                    
                    //4. Eliminamos la sesion del usuario
                    // return await this.sessionManagementRepository.deleteSessionUser(userData.userId, session);

                    return null
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }
}