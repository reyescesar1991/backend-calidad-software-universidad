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
exports.OAuthService = void 0;
const tsyringe_1 = require("tsyringe");
const transactionManager_1 = require("../../core/database/transactionManager");
const TwoFactorUser_service_1 = require("./services/TwoFactorUser.service");
const SessionManagement_service_1 = require("./services/SessionManagement.service");
const SecurityAudit_service_1 = require("./services/SecurityAudit.service");
const Token_service_1 = require("./services/Token.service");
const user_service_1 = require("../userService/user.service");
const transaccional_wrapper_1 = require("../../core/utils/transaccional-wrapper");
const exceptions_1 = require("../../core/exceptions");
const validators_1 = require("../../core/validators");
const mail_service_1 = require("../mailService/mail.service");
const jwt_util_1 = require("../../core/utils/jwt.util");
const enums_1 = require("../../core/enums");
let OAuthService = class OAuthService {
    transactionManager;
    twoFactorUserService;
    sessionManagamentService;
    securityAuditService;
    JwtService;
    userService;
    mailService;
    constructor(transactionManager, twoFactorUserService, sessionManagamentService, securityAuditService, JwtService, userService, mailService) {
        this.transactionManager = transactionManager;
        this.twoFactorUserService = twoFactorUserService;
        this.sessionManagamentService = sessionManagamentService;
        this.securityAuditService = securityAuditService;
        this.JwtService = JwtService;
        this.userService = userService;
        this.mailService = mailService;
    }
    //Funcion que me permite verificar que si el intentos ha sido mas de dos, bloquear al usuario
    async validateNumberAttempsLogin(dataUserAudit, idUser, session) {
        if (dataUserAudit.loginAttempts >= 3) {
            console.log(dataUserAudit.secondFactorAttempts);
            await this.userService.changeStatusUser(enums_1.StatusUserEnum.BLOCKED, idUser, session);
        }
    }
    /**
     * Metodo para solicitar el segundo factor en los flujos del OAuth
     * Inicia el flujo de reseteo de contraseña enviando un código 2FA al usuario.
     * @param dataLogin DTO con el username del usuario y la contraseña del usuario
     * @throws UserNotFoundByIdError si el usuario no es encontrado por el customId.
     * @returns Un mensaje de éxito indicando que el código 2FA ha sido enviado.
     */
    async loginUser(dataLogin, session) {
        try {
            //1. Primer paso es comprobar que el usuario exista por su username
            const user = await this.userService.findUserByUsername(dataLogin.username);
            validators_1.UserValidator.validateUserExistsByUsername(user);
            //1.1 Que el usuario no este bloqueado
            validators_1.UserValidator.validateStatusUserIsActive(user.status);
            //2. Luego comprobamos que la contraseña sea igual a la del user extraido de la DB
            //2.1 En caso de no ser iguales lanzaremos la excepcion AuthPasswordMismatchUsernameError()
            if (user.password !== dataLogin.password) {
                //2.1.1 Agrego el intento de login y valido que ya no exceda el limite, en tal caso bloqueo al usuario
                const updateAudit = await this.securityAuditService.addAttempLogin(user._id);
                await this.validateNumberAttempsLogin(updateAudit, user._id);
                throw new exceptions_1.AuthPasswordMismatchUsernameError();
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
                const sessionUserParam = {
                    userId: user.idUser,
                    token: token,
                    userAgent: "web",
                    ipAddress: "192.123.4.123",
                };
                //5.1.3 La creamos en BD
                await this.sessionManagamentService.createSessionUser(sessionUserParam, session);
                //5.1.4 reseteamos los intentos de login
                await this.securityAuditService.resetAttempLogin(user._id, session);
                //5.1.5 Retornamos el token que es lo que necesita el usuario para poder acceder a la app
                return { token: token };
                ;
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
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    /**
     * Metodo para solicitar el segundo factor en los flujos del OAuth
     * Inicia el flujo de solicitud de login con seguridad enviando un código 2FA al usuario.
     * @param data DTO con el email del usuario y el userId necesario para el metodo generateCodeAndSend.
     * @throws UserNotFoundByIdError si el usuario no es encontrado por el customId.
     * @returns Un mensaje de éxito indicando que el código 2FA ha sido enviado.
     */
    async requestSecondFactorLogin(data, session) {
        try {
            //1. Verificar que el usuario exista
            const user = await this.userService.findUserByCustomId(data.userId);
            validators_1.UserValidator.validateUserExists(user);
            //2. Verificamos la firma del token temporal
            const preAuthToken = await this.JwtService.verifyPreAuthToken(data.preAuthToken);
            //3. Validamos que el token aun sea valido
            jwt_util_1.JwtValidator.isValidPreAuth(preAuthToken);
            //4. Ya el email es validado por el servicio que genera el segundo factor
            //5. Si todo va bien, genera el codigo y lo envia al correo registrado en la base de datos
            await this.twoFactorUserService.generateAndSendCode(user._id, user.email, session);
            return { message: "Un código de verificación ha sido enviado a tu email registrado." };
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    /**
 * Metodo para solicitar el segundo factor en los flujos del OAuth
 * Confirma el segundo factor enviando un código 2FA al usuario para el login.
 * @param dataConfirmSecondFactor DTO con el userId y el codigo enviando por el usuario para poder validarlo.
 * @throws UserNotFoundError si el email no existe (o InvalidCredentialsError por seguridad).
 * @returns Un booleano true si coincide el codigo con el almacenado, o false si no coincide el codigo almacenado
 */
    async confirmSecondFactorLogin(dataConfirmSecondFactor, session) {
        try {
            //1. Verificar que el usuario exista
            const user = await this.userService.findUserByCustomId(dataConfirmSecondFactor.userId);
            //2. Validamos el usuario
            validators_1.UserValidator.validateUserExists(user);
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
            const sessionUserParam = {
                userId: user.idUser,
                token: token,
                userAgent: "web",
                ipAddress: "192.123.4.123",
            };
            //7. Creamos
            await this.sessionManagamentService.createSessionUser(sessionUserParam, session);
            //5. Devolvemos el booleano
            return { token: token };
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    /**
     * Metodo solicitar el 2FA para iniciar el login con seguridad
     * @param data DTO con el payload del login necesario para poder pedir el segundo factor
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un mensaje de exito confirmando el envio de un correo con el factor 2FA
     */
    async initiateLogin2FA(data, session) {
        try {
            // Llama al método genérico para solicitar el 2FA
            return await this.requestSecondFactorLogin(data, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    /**
     * Metodo confirmar el 2FA para recuperar la contraseña
     * @param data DTO con el userId y el codigo para confirmar el 2FA para el flujo de recuperacion de contraseña
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un booleano true si coincide el codigo con el almacenado, o false si no coincide el codigo almacenado
     */
    async verify2FALogin(data, session) {
        try {
            return await this.confirmSecondFactorLogin(data, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    /**
     * Metodo para solicitar el segundo factor en los flujos del OAuth
     * Inicia el flujo de reseteo de contraseña enviando un código 2FA al usuario.
     * @param data DTO con el email del usuario y el userId necesario para el metodo generateCodeAndSend.
     * @throws UserNotFoundByIdError si el usuario no es encontrado por el customId.
     * @returns Un mensaje de éxito indicando que el código 2FA ha sido enviado.
     */
    async requestSecondFactorRecoverData(data, session) {
        try {
            //1. Verificar que el usuario exista
            const user = await this.userService.findUserByCustomId(data.userId);
            validators_1.UserValidator.validateUserExists(user);
            //2. Ya el email es validado por el servicio que genera el segundo factor
            //3. Si todo va bien, genera el codigo y lo envia al correo registrado en la base de datos
            await this.twoFactorUserService.generateAndSendCode(user._id, data.email, session);
            return { message: "Un código de verificación ha sido enviado a tu email registrado." };
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    /**
     * Metodo para solicitar el segundo factor en los flujos del OAuth
     * Inicia el flujo de reseteo de contraseña enviando un código 2FA al usuario.
     * @param dataConfirmSecondFactor DTO con el userId y el codigo enviando por el usuario para poder validarlo.
     * @throws UserNotFoundError si el email no existe (o InvalidCredentialsError por seguridad).
     * @returns Un booleano true si coincide el codigo con el almacenado, o false si no coincide el codigo almacenado
     */
    async confirmSecondFactorUser(dataConfirmSecondFactor, session) {
        try {
            //1. Verificar que el usuario exista
            const user = await this.userService.findUserByCustomId(dataConfirmSecondFactor.userId);
            //2. Validamos el usuario
            validators_1.UserValidator.validateUserExists(user);
            //3. Validamos que el factor sea el enviado y almacenado en la base de datos
            const validatedFactor = await this.twoFactorUserService.validateFactorUser(user._id, dataConfirmSecondFactor.code, session);
            //4. Devolvemos el booleano
            return validatedFactor;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    /**
     * Metodo solicitar el 2FA para recuperar la contraseña
     * @param data DTO con el userId y el email para poder solicitar el 2FA para el flujo de recuperacion de contraseña
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un mensaje de exito confirmando el envio de un correo con el factor 2FA
     */
    async initiatePasswordReset(data, session) {
        try {
            // Llama al método genérico para solicitar el 2FA
            return await this.requestSecondFactorRecoverData(data, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    /**
     * Metodo confirmar el 2FA para recuperar la contraseña
     * @param data DTO con el userId y el codigo para confirmar el 2FA para el flujo de recuperacion de contraseña
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un booleano true si coincide el codigo con el almacenado, o false si no coincide el codigo almacenado
     */
    async verify2FAPasswordReset(data, session) {
        try {
            return await this.confirmSecondFactorUser(data, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    /**
     * Metodo para confirmar el cambio de contraseña
     * Luego de validar el segundo factor, se debe usar este metodo para culminar con el proceso de recuperacion de contraseña
     * @param dataResetPasswordUser DTO con el userId y la nueva contraseña para realizar el cambio
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un mensaje de exito confirmando la actualizacion de la contraseña
     */
    async confirmPasswordReset(dataResetPasswordUser, session) {
        try {
            //1. Validamos que el usuario exista
            const user = await this.userService.findUserByCustomId(dataResetPasswordUser.idUser);
            validators_1.UserValidator.validateUserExists(user);
            //2. Verificamos que el usuario se encuentre autenticado
            const registryAudit = await this.securityAuditService.getRegistrySecurityAuditByUser(user._id);
            validators_1.SecurityAuditValidator.validateStatusUser2FA(registryAudit);
            //3. Creamos la data password para modificar el usuario con su nueva contraseña
            await this.userService.updateUser(user._id, dataResetPasswordUser.idUser, { password: dataResetPasswordUser.newPassword }, session);
            return { message: "Tu contraseña ha sido actualizada con exito" };
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    /**
     * Metodo solicitar el 2FA para recuperar el usuario
     * @param data DTO con el userId y el email para poder solicitar el 2FA para el flujo de recuperacion de usuario
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un mensaje de exito confirmando el envio de un correo con el factor 2FA
     */
    async initiateUsernameRecover(data, session) {
        try {
            // Llama al método genérico para solicitar el 2FA
            return await this.requestSecondFactorRecoverData(data, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    /**
     * Metodo confirmar el 2FA para recuperar el usuario
     * @param data DTO con el userId y el codigo para confirmar el 2FA para el flujo de recuperacion de usuario
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un booleano true si coincide el codigo con el almacenado, o false si no coincide el codigo almacenado
     */
    async verify2FAUsernameRecover(data, session) {
        try {
            return await this.confirmSecondFactorUser(data, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    /**
     * Metodo para confirmar la recuperacion de usuario
     * Luego de validar el segundo factor, se debe usar este metodo para culminar con el proceso de recuperacion de usuario
     * @param dataUsername DTO con el userId para obtener el username
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un mensaje de exito confirmando la actualizacion de la contraseña
     */
    async confirmUsernameReset(dataUsername, session) {
        try {
            console.log("Data username en el confirm: ", dataUsername);
            //1. Verificar que el usuario exista
            const user = await this.userService.findUserByCustomId(dataUsername.idUser);
            validators_1.UserValidator.validateUserExists(user);
            //2. Si existe y ya tiene confirmado el 2FA, envio el correo con el username
            await this.mailService.sendRecoverUsername(user.email, user.username);
            //3. Retorno el mensaje de exito
            return { message: "Tu usuario ha sido enviado a tu email registrado." };
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    /**
     * Metodo para hacer el logout del usuario
     * El usuario usara esto para cerrar su sesion y salir de la aplicacion
     * @param dataLogout DTO con el userId para obtener el usuario
     * @throws UserNotFoundError si el usuario no existe
     * @returns Un mensaje de exito confirmando el cierre de la sesion
     */
    async logoutSession(dataLogout, session) {
        try {
            //1. Verificar que el usuario exista
            const user = await this.userService.findUserByCustomId(dataLogout.userId);
            validators_1.UserValidator.validateUserExists(user);
            //2. Validamos que el usuario tenga una sesion activa
            const sessionActive = await this.sessionManagamentService.getSessionUser(user.idUser);
            //3. Eliminamos el registro en la tabla temporal de logueo
            await this.sessionManagamentService.deleteSessionUser({
                token: sessionActive.token,
            }, session);
            //4. Retorno el mensaje de exito
            return { message: "Tu sesion fue cerrada de forma exitosa." };
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
};
exports.OAuthService = OAuthService;
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthService.prototype, "loginUser", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthService.prototype, "requestSecondFactorLogin", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthService.prototype, "confirmSecondFactorLogin", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthService.prototype, "initiateLogin2FA", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthService.prototype, "verify2FALogin", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthService.prototype, "requestSecondFactorRecoverData", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthService.prototype, "confirmSecondFactorUser", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthService.prototype, "initiatePasswordReset", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthService.prototype, "verify2FAPasswordReset", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthService.prototype, "confirmPasswordReset", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthService.prototype, "initiateUsernameRecover", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthService.prototype, "verify2FAUsernameRecover", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthService.prototype, "confirmUsernameReset", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OAuthService.prototype, "logoutSession", null);
exports.OAuthService = OAuthService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("TransactionManager")),
    __param(1, (0, tsyringe_1.inject)("TwoFactorUserService")),
    __param(2, (0, tsyringe_1.inject)("SessionManagamentService")),
    __param(3, (0, tsyringe_1.inject)("SecurityAuditService")),
    __param(4, (0, tsyringe_1.inject)("JwtService")),
    __param(5, (0, tsyringe_1.inject)("UserService")),
    __param(6, (0, tsyringe_1.inject)(mail_service_1.MailService)),
    __metadata("design:paramtypes", [transactionManager_1.TransactionManager,
        TwoFactorUser_service_1.TwoFactorUserService,
        SessionManagement_service_1.SessionManagamentService,
        SecurityAudit_service_1.SecurityAuditService,
        Token_service_1.TokenService,
        user_service_1.UserService,
        mail_service_1.MailService])
], OAuthService);
//# sourceMappingURL=OAuth.service.js.map