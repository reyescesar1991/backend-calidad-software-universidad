import { inject, injectable } from "tsyringe";
import { TransactionManager } from "../../core/database/transactionManager";
import { TwoFactorUserService } from "./services/TwoFactorUser.service";
import { SessionManagamentService } from "./services/SessionManagement.service";
import { SecurityAuditService } from "./services/SecurityAudit.service";
import { TokenService } from "./services/Token.service";
import { UserService } from "../userService/user.service";
import { LoginDataDto, LogoutUserDto, ObjectIdParam, RecoverPasswordUserDto, RecoverUsernameDataUserDto, SecondFactorRequestDto, SessionManagementDto, TwoFactorCodeVerificationDto } from "../../validations";
import { ClientSession } from "mongoose";
import { Transactional } from "../../core/utils/transaccional-wrapper";
import { AuthPasswordMismatchUsernameError, handleError } from "../../core/exceptions";
import { SecurityAuditValidator, SessionManagementValidator, UserValidator } from "../../core/validators";
import { MailService } from "../mailService/mail.service";
import { LoginResponseDto } from "../../core/types";
import { JwtValidator } from "../../core/utils/jwt.util";
import { SecurityAuditDocument } from "../../db/models";
import { StatusUserEnum } from "../../core/enums";
import { RoleConfigService } from "../roleConfig/roleConfig.service";

@injectable()
export class OAuthService {


    constructor(
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("TwoFactorUserService") private readonly twoFactorUserService: TwoFactorUserService,
        @inject("SessionManagamentService") private readonly sessionManagamentService: SessionManagamentService,
        @inject("SecurityAuditService") private readonly securityAuditService: SecurityAuditService,
        @inject("JwtService") private readonly JwtService: TokenService,
        @inject("UserService") private readonly userService: UserService,
        @inject(MailService) private mailService: MailService,
    ) { }

//     //Funcion que me permite verificar que si el intentos ha sido mas de dos, bloquear al usuario
    private async validateNumberAttempsLogin(dataUserAudit: SecurityAuditDocument, idUser: ObjectIdParam, session ?: ClientSession): Promise<void> {

        if (dataUserAudit.loginAttempts >= 3) {

            console.log(dataUserAudit.secondFactorAttempts);
            await this.userService.changeStatusUser(StatusUserEnum.BLOCKED, idUser, session);
        }

    }

    /**
     * Metodo para solicitar el segundo factor en los flujos del OAuth
     * Inicia el flujo de reseteo de contraseña enviando un código 2FA al usuario.
     * @param dataLogin DTO con el username del usuario y la contraseña del usuario
     * @throws UserNotFoundByIdError si el usuario no es encontrado por el customId.
     * @returns Un mensaje de éxito indicando que el código 2FA ha sido enviado.
     */
    @Transactional()
    async loginUser(dataLogin: LoginDataDto, session?: ClientSession): Promise<LoginResponseDto> {

        try {

            //1. Primer paso es comprobar que el usuario exista por su username
            const user = await this.userService.findUserByUsername(dataLogin.username);
            UserValidator.validateUserExistsByUsername(user);

            //1.1 Que el usuario no este bloqueado
            UserValidator.validateStatusUserIsActive(user.status);

            //2. Luego comprobamos que la contraseña sea igual a la del user extraido de la DB
            //2.1 En caso de no ser iguales lanzaremos la excepcion AuthPasswordMismatchUsernameError()
            if (user.password !== dataLogin.password) {

                //2.1.1 Agrego el intento de login y valido que ya no exceda el limite, en tal caso bloqueo al usuario
                const updateAudit = await this.securityAuditService.addAttempLogin(user._id);
                await this.validateNumberAttempsLogin(updateAudit, user._id);
                throw new AuthPasswordMismatchUsernameError();
            }

            //3. Consultamos el status del segundo factor de autenticacion
            const userTwoFactorStatus = await this.userService.getSecondFactorUserStatus(user._id);

            //4. Generamos el token 
            const token = this.JwtService.generateToken({
                userId: user.idUser,
                jti: "",
            });


            //5. Diferentes tipos de inicio de sesion
            //5.1 Si el usuario no tiene el segundo factor activo
            if (!userTwoFactorStatus) {

                //5.1.2 Creamos una session para el usuario
                const sessionUserParam: SessionManagementDto = {

                    userId: user.idUser,
                    token: token,
                    userAgent: "web",
                    ipAddress: "192.123.4.123",
                }

                //5.1.3 La creamos en BD
                await this.sessionManagamentService.createSessionUser(sessionUserParam, session);

                //5.1.4 reseteamos los intentos de login
                await this.securityAuditService.resetAttempLogin(user._id, session);

                //5.1.5 Retornamos el token que es lo que necesita el usuario para poder acceder a la app
                return { token: token };;
            }
            //5.2 Si tiene segundo factor debemos hacer el flujo de validacion primero, enviamos un booleano
            else {

                //5.2.1 Genero un token temporal para poder pedir el segundo factor para el login
                const preAuthToken = await this.JwtService.generatePreAuthToken(user.username, user.idUser);

                //5.2.2 Agrego el intento de login y valido que ya no exceda el limite, en tal caso bloqueo al usuario
                const updateAudit = await this.securityAuditService.addAttempLogin(user._id);
                await this.validateNumberAttempsLogin(updateAudit, user._id, session);

                //5.2.2 Retorno una repuesta de login con pre Auth para poder pedir el segundo factor
                return {

                    needsTwoFactor: true,
                    userId: user.idUser,
                    preAuthToken: preAuthToken,
                };
            }


        } catch (error) {

            handleError(error);
        }
    }

    /**
     * Metodo para solicitar el segundo factor en los flujos del OAuth
     * Inicia el flujo de solicitud de login con seguridad enviando un código 2FA al usuario.
     * @param data DTO con el email del usuario y el userId necesario para el metodo generateCodeAndSend.
     * @throws UserNotFoundByIdError si el usuario no es encontrado por el customId.
     * @returns Un mensaje de éxito indicando que el código 2FA ha sido enviado.
     */
    @Transactional()
    private async requestSecondFactorLogin(data: LoginResponseDto, session?: ClientSession): Promise<{ message: string }> {

        try {

            //1. Verificar que el usuario exista
            const user = await this.userService.findUserByCustomId(data.userId);
            UserValidator.validateUserExists(user);

            //2. Verificamos la firma del token temporal
            const preAuthToken = await this.JwtService.verifyPreAuthToken(data.preAuthToken);

            //3. Validamos que el token aun sea valido
            JwtValidator.isValidPreAuth(preAuthToken);

            //4. Ya el email es validado por el servicio que genera el segundo factor
            //5. Si todo va bien, genera el codigo y lo envia al correo registrado en la base de datos
            await this.twoFactorUserService.generateAndSendCode(user._id, user.email, session);

            return { message: "Un código de verificación ha sido enviado a tu email registrado." };

        } catch (error) {

            handleError(error);
        }
    }


    /**
 * Metodo para solicitar el segundo factor en los flujos del OAuth
 * Confirma el segundo factor enviando un código 2FA al usuario para el login.
 * @param dataConfirmSecondFactor DTO con el userId y el codigo enviando por el usuario para poder validarlo.
 * @throws UserNotFoundError si el email no existe (o InvalidCredentialsError por seguridad).
 * @returns Un booleano true si coincide el codigo con el almacenado, o false si no coincide el codigo almacenado
 */
    @Transactional()
    private async confirmSecondFactorLogin(dataConfirmSecondFactor: TwoFactorCodeVerificationDto, session?: ClientSession): Promise<LoginResponseDto> {

        try {

            //1. Verificar que el usuario exista
            const user = await this.userService.findUserByCustomId(dataConfirmSecondFactor.userId);

            //2. Validamos el usuario
            UserValidator.validateUserExists(user);

            //3. Validamos que el factor sea el enviado y almacenado en la base de datos
            await this.twoFactorUserService.validateFactorUser(user._id, dataConfirmSecondFactor.code, session);

            //4. Resetear el intento de login, ya que para este punto fue exitoso
            await this.securityAuditService.resetAttempLogin(user._id, session);

            //5. Generamos el token transaccional
            const token = this.JwtService.generateToken({
                userId: user.idUser,
                jti: "",
            });

            //6. Creamos una session para el usuario
            const sessionUserParam: SessionManagementDto = {

                userId: user.idUser,
                token: token,
                userAgent: "web",
                ipAddress: "192.123.4.123",
            }

            //7. Creamos
            await this.sessionManagamentService.createSessionUser(sessionUserParam, session);

            //5. Devolvemos el booleano
            return { token: token };

        } catch (error) {

            handleError(error);
        }
    }


    /**
     * Metodo solicitar el 2FA para iniciar el login con seguridad
     * @param data DTO con el payload del login necesario para poder pedir el segundo factor
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un mensaje de exito confirmando el envio de un correo con el factor 2FA
     */
    @Transactional()
    async initiateLogin2FA(data: LoginResponseDto, session?: ClientSession): Promise<{ message: string }> {

        try {
            // Llama al método genérico para solicitar el 2FA
            return await this.requestSecondFactorLogin(data, session);

        } catch (error) {
            handleError(error);
        }
    }


    /**
     * Metodo confirmar el 2FA para recuperar la contraseña
     * @param data DTO con el userId y el codigo para confirmar el 2FA para el flujo de recuperacion de contraseña
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un booleano true si coincide el codigo con el almacenado, o false si no coincide el codigo almacenado
     */
    @Transactional()
    async verify2FALogin(data: TwoFactorCodeVerificationDto, session?: ClientSession): Promise<LoginResponseDto> {

        try {

            return await this.confirmSecondFactorLogin(data, session);

        } catch (error) {
            handleError(error);
        }
    }


    /**
     * Metodo para solicitar el segundo factor en los flujos del OAuth
     * Inicia el flujo de reseteo de contraseña enviando un código 2FA al usuario.
     * @param data DTO con el email del usuario y el userId necesario para el metodo generateCodeAndSend.
     * @throws UserNotFoundByIdError si el usuario no es encontrado por el customId.
     * @returns Un mensaje de éxito indicando que el código 2FA ha sido enviado.
     */
    @Transactional()
    private async requestSecondFactorRecoverData(data: SecondFactorRequestDto, session?: ClientSession): Promise<{ message: string }> {

        try {

            //1. Verificar que el usuario exista
            const user = await this.userService.findUserByCustomId(data.userId);

            UserValidator.validateUserExists(user);

            //2. Ya el email es validado por el servicio que genera el segundo factor
            //3. Si todo va bien, genera el codigo y lo envia al correo registrado en la base de datos
            await this.twoFactorUserService.generateAndSendCode(user._id, data.email, session);

            return { message: "Un código de verificación ha sido enviado a tu email registrado." };

        } catch (error) {

            handleError(error);
        }
    }

    /**
     * Metodo para solicitar el segundo factor en los flujos del OAuth
     * Inicia el flujo de reseteo de contraseña enviando un código 2FA al usuario.
     * @param dataConfirmSecondFactor DTO con el userId y el codigo enviando por el usuario para poder validarlo.
     * @throws UserNotFoundError si el email no existe (o InvalidCredentialsError por seguridad).
     * @returns Un booleano true si coincide el codigo con el almacenado, o false si no coincide el codigo almacenado
     */
    @Transactional()
    private async confirmSecondFactorUser(dataConfirmSecondFactor: TwoFactorCodeVerificationDto, session?: ClientSession): Promise<boolean> {

        try {

            //1. Verificar que el usuario exista
            const user = await this.userService.findUserByCustomId(dataConfirmSecondFactor.userId);

            //2. Validamos el usuario
            UserValidator.validateUserExists(user);

            //3. Validamos que el factor sea el enviado y almacenado en la base de datos
            const validatedFactor = await this.twoFactorUserService.validateFactorUser(user._id, dataConfirmSecondFactor.code, session);

            //4. Devolvemos el booleano
            return validatedFactor;

        } catch (error) {

            handleError(error);
        }
    }

    /**
     * Metodo solicitar el 2FA para recuperar la contraseña
     * @param data DTO con el userId y el email para poder solicitar el 2FA para el flujo de recuperacion de contraseña
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un mensaje de exito confirmando el envio de un correo con el factor 2FA
     */
    @Transactional()
    async initiatePasswordReset(data: SecondFactorRequestDto, session?: ClientSession): Promise<{ message: string }> {

        try {
            // Llama al método genérico para solicitar el 2FA
            return await this.requestSecondFactorRecoverData(data, session);

        } catch (error) {
            handleError(error);
        }
    }

    /**
     * Metodo confirmar el 2FA para recuperar la contraseña
     * @param data DTO con el userId y el codigo para confirmar el 2FA para el flujo de recuperacion de contraseña
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un booleano true si coincide el codigo con el almacenado, o false si no coincide el codigo almacenado
     */
    @Transactional()
    async verify2FAPasswordReset(data: TwoFactorCodeVerificationDto, session?: ClientSession): Promise<boolean> {

        try {

            return await this.confirmSecondFactorUser(data, session);

        } catch (error) {
            handleError(error);
        }
    }

    /**
     * Metodo para confirmar el cambio de contraseña
     * Luego de validar el segundo factor, se debe usar este metodo para culminar con el proceso de recuperacion de contraseña
     * @param dataResetPasswordUser DTO con el userId y la nueva contraseña para realizar el cambio
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un mensaje de exito confirmando la actualizacion de la contraseña
     */
    @Transactional()
    async confirmPasswordReset(dataResetPasswordUser: RecoverPasswordUserDto, session?: ClientSession): Promise<{ message: string }> {

        try {

            //1. Validamos que el usuario exista

            const user = await this.userService.findUserByCustomId(dataResetPasswordUser.idUser);

            UserValidator.validateUserExists(user);

            //2. Verificamos que el usuario se encuentre autenticado

            const registryAudit = await this.securityAuditService.getRegistrySecurityAuditByUser(user._id);
            SecurityAuditValidator.validateStatusUser2FA(registryAudit);

            //3. Creamos la data password para modificar el usuario con su nueva contraseña

            await this.userService.updateUser(
                user._id,
                dataResetPasswordUser.idUser,
                { password: dataResetPasswordUser.newPassword },
                session
            );

            return { message: "Tu contraseña ha sido actualizada con exito" };

        } catch (error) {

            handleError(error);
        }
    }

    /**
     * Metodo solicitar el 2FA para recuperar el usuario
     * @param data DTO con el userId y el email para poder solicitar el 2FA para el flujo de recuperacion de usuario
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un mensaje de exito confirmando el envio de un correo con el factor 2FA
     */
    @Transactional()
    async initiateUsernameRecover(data: SecondFactorRequestDto, session?: ClientSession): Promise<{ message: string }> {

        try {
            // Llama al método genérico para solicitar el 2FA
            return await this.requestSecondFactorRecoverData(data, session);

        } catch (error) {
            handleError(error);
        }
    }

    /**
     * Metodo confirmar el 2FA para recuperar el usuario
     * @param data DTO con el userId y el codigo para confirmar el 2FA para el flujo de recuperacion de usuario
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un booleano true si coincide el codigo con el almacenado, o false si no coincide el codigo almacenado
     */
    @Transactional()
    async verify2FAUsernameRecover(data: TwoFactorCodeVerificationDto, session?: ClientSession): Promise<boolean> {

        try {

            return await this.confirmSecondFactorUser(data, session);

        } catch (error) {
            handleError(error);
        }
    }


    /**
     * Metodo para confirmar la recuperacion de usuario
     * Luego de validar el segundo factor, se debe usar este metodo para culminar con el proceso de recuperacion de usuario
     * @param dataUsername DTO con el userId para obtener el username
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un mensaje de exito confirmando la actualizacion de la contraseña
     */
    @Transactional()
    async confirmUsernameReset(dataUsername: RecoverUsernameDataUserDto, session?: ClientSession): Promise<{ message: string }> {

        try {

            console.log("Data username en el confirm: ", dataUsername);

            //1. Verificar que el usuario exista
            const user = await this.userService.findUserByCustomId(dataUsername.idUser);

            UserValidator.validateUserExists(user);

            //2. Si existe y ya tiene confirmado el 2FA, envio el correo con el username
            await this.mailService.sendRecoverUsername(user.email, user.username);

            //3. Retorno el mensaje de exito
            return { message: "Tu usuario ha sido enviado a tu email registrado." };

        } catch (error) {

            handleError(error);
        }
    }



    /**
     * Metodo para hacer el logout del usuario
     * El usuario usara esto para cerrar su sesion y salir de la aplicacion
     * @param dataLogout DTO con el userId para obtener el usuario
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un mensaje de exito confirmando el cierre de la sesion
     */
    @Transactional()
    async logoutSession(dataLogout: LogoutUserDto, session ?: ClientSession): Promise<{ message: string }> {

        try {

            //1. Verificar que el usuario exista
            const user = await this.userService.findUserByCustomId(dataLogout.userId);

            UserValidator.validateUserExists(user);

            //2. Validamos que el usuario tenga una sesion activa
            const sessionActive = await this.sessionManagamentService.getSessionUser(user.idUser);

            //3. Eliminamos el registro en la tabla temporal de logueo
            await this.sessionManagamentService.deleteSessionUser({
                token: sessionActive.token,
            }, session);

            //4. Retorno el mensaje de exito
            return { message: "Tu sesion fue cerrada de forma exitosa." };

        } catch (error) {

            handleError(error);
        }
    }


    /**
     * Metodo para hacer el logout del usuario
     * El usuario usara esto para cerrar su sesion y salir de la aplicacion
     * @param dataLogout DTO con el userId para obtener el usuario
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un mensaje de exito confirmando el cierre de la sesion
     */
    // @Transactional()
    // async logoutSession(dataLogout: LogoutUserDto, session ?: ClientSession): Promise<{ message: string }> {

    //     try {

    //         //1. Verificar que el usuario exista
    //         const user = await this.userService.findUserByCustomId(dataLogout.userId);

    //         UserValidator.validateUserExists(user);

    //         //2. Validamos que el usuario tenga una sesion activa
    //         const sessionActive = await this.sessionManagamentService.getSessionUser(user.idUser);

    //         //3. Eliminamos el registro en la tabla temporal de logueo
    //         await this.sessionManagamentService.deleteSessionUser({
    //             token: sessionActive.token,
    //         }, session);

    //         //4. Retorno el mensaje de exito
    //         return { message: "Tu sesion fue cerrada de forma exitosa." };

    //     } catch (error) {

    //         handleError(error);
    //     }
    // }

}