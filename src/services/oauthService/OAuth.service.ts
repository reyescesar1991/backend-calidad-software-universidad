import { inject, injectable } from "tsyringe";
import { TransactionManager } from "../../core/database/transactionManager";
import { TwoFactorUserService } from "./services/TwoFactorUser.service";
import { SessionManagamentService } from "./services/SessionManagement.service";
import { SecurityAuditService } from "./services/SecurityAudit.service";
import { TokenService } from "./services/Token.service";
import { UserService } from "../userService/user.service";
import { LoginDataDto, RecoverPasswordUserDto, RecoverUsernameDataUserDto, SecondFactorRequestDto, TwoFactorCodeVerificationDto } from "../../validations";
import { ClientSession } from "mongoose";
import { Transactional } from "../../core/utils/transaccional-wrapper";
import { handleError } from "../../core/exceptions";

@injectable()
export class OAuthService {


    constructor(
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("TwoFactorUserService") private readonly twoFactorUserService: TwoFactorUserService,
        @inject("SessionManagamentService") private readonly sessionManagamentService: SessionManagamentService,
        @inject("SecurityAuditService") private readonly securityAuditService: SecurityAuditService,
        @inject("JwtService") private readonly JwtService: TokenService,
        @inject("UserService") private readonly userService: UserService,
    ) { }


    async loginUser(dataLogin: LoginDataDto, session?: ClientSession): Promise<string> { 

        try {

            return "Token";
            
        } catch (error) {
            
            handleError(error);
        }
    }


    /**
     * PASO 1 de Recuperación de Contraseña con 2FA:
     * Inicia el flujo de reseteo de contraseña enviando un código 2FA al usuario.
     * @param data DTO con el email del usuario y el userId necesario para el metodo generateCodeAndSend.
     * @throws UserNotFoundError si el email no existe (o InvalidCredentialsError por seguridad).
     * @returns Un mensaje de éxito indicando que el código 2FA ha sido enviado.
     */
    @Transactional()
    async requestSecondFactorRecoverData(data: SecondFactorRequestDto, session?: ClientSession): Promise<{ message: string }> {

        try {

            //1. Verificar que el usuario exista


            //2. Ya el email es validado por el servicio que genera el segundo factor
            //3. Si todo va bien, genera el codigo y lo envia al correo registrado en la base de datos
            await this.twoFactorUserService.generateAndSendCode(data.userId, data.email);

            return { message: "Un código de verificación ha sido enviado a tu email registrado." };
            
        } catch (error) {
            
            handleError(error);
        }
    }


    async confirmSecondFactorUser(dataConfirmSecondFactor: TwoFactorCodeVerificationDto, session?: ClientSession) : Promise<boolean> {

        try {

            return true
            
        } catch (error) {
            
            handleError(error);
        }
    }


    async confirmPasswordReset(dataResetPasswordUser: RecoverPasswordUserDto, session?: ClientSession): Promise<{ message: string }> {

        try {

            return { message: "Un código de verificación ha sido enviado a tu email registrado." };
            
        } catch (error) {
            
            handleError(error);
        }
    }


    async confirmUsernameReset(dataLogin: RecoverUsernameDataUserDto, session?: ClientSession): Promise<{ message: string }> {

        try {

            return { message: "Un código de verificación ha sido enviado a tu email registrado." };
            
        } catch (error) {
            
            handleError(error);
        }
    }

}