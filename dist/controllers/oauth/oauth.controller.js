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
exports.AuthController = void 0;
const tsyringe_1 = require("tsyringe");
const OAuth_service_1 = require("../../services/oauthService/OAuth.service");
const helper_1 = require("../../core/helper");
const exceptions_1 = require("../../core/exceptions");
let AuthController = class AuthController {
    oAuthService;
    constructor(oAuthService) {
        this.oAuthService = oAuthService;
    }
    /**
     * Inicia el proceso de login.
     * Si 2FA está inactivo, devuelve el token final.
     * Si 2FA está activo, inicia el flujo de verificación y devuelve un token temporal.
     */
    login = async (req, res, next) => {
        try {
            const loginData = req.body;
            // 1. Llama al servicio de login
            const result = await this.oAuthService.loginUser(loginData);
            // 2. El controlador interpreta la respuesta del servicio
            if (result.needsTwoFactor) {
                // CASO 2FA: El usuario necesita un segundo factor.
                // 2a. El servicio ya generó un `preAuthToken`. Ahora le pedimos que inicie el envío del código.
                await this.oAuthService.initiateLogin2FA(result);
                // 2b. Se le responde al cliente que se necesita un paso más, enviando los datos necesarios.
                (0, helper_1.sendSuccessResponse)(res, 200, {
                    userId: result.userId,
                    preAuthToken: result.preAuthToken,
                }, "Codigo de verificacion enviado. Por favor introduzca el codigo y termine su proceso de login");
                // res.status(200).json({
                //     message:
                //         "Codigo de verificacion enviado. Por favor introduzca el codigo y termine su proceso de login",
                //     userId: result.userId,
                //     preAuthToken: result.preAuthToken,
                // });
            }
            else {
                // CASO SIN 2FA: El login fue exitoso y directo.
                // Se le envía el token de sesión final.
                (0, helper_1.sendSuccessResponse)(res, 200, {
                    token: result.token,
                }, "Login exitoso");
                // res.status(200).json({
                //     message: "Login successful.",
                //     token: result.token,
                // });
            }
        }
        catch (error) {
            // Dejamos que el middleware de errores maneje cualquier excepción
            next(error);
        }
    };
    /**
     * Verifica el código 2FA y, si es correcto, completa el login devolviendo el token de sesión final.
     */
    verify2FALogin = async (req, res, next) => {
        try {
            const verificationData = req.body;
            // 1. Llama al servicio para verificar el código
            const result = await this.oAuthService.verify2FALogin(verificationData);
            // 2. Si el código es correcto, el servicio ya nos devuelve el token final.
            // res.status(200).json({
            //     message: "Login successful.",
            //     token: result.token,
            // });
            (0, helper_1.sendSuccessResponse)(res, 200, {
                token: result.token,
            }, "Login exitoso");
        }
        catch (error) {
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    };
    // Aquí irían los demás métodos del controlador: logout, recoverPassword, etc.
    /**
     * Inicia el proceso de segundo factor para la recuperacion de contraseña.
     *
     *
     */
    initiateRecoveryPassword2FA = async (req, res, next) => {
        try {
            const recoveryPassword2FAData = req.body;
            // 1. Llama al servicio de iniciar 2fa password
            const result = await this.oAuthService.initiatePasswordReset(recoveryPassword2FAData);
            // 2. Enviar la respuesta al usuario
            // res.status(200).json({
            //     message: result.message,
            // });
            (0, helper_1.sendSuccessResponse)(res, 200, {}, result.message);
        }
        catch (error) {
            // Dejamos que el middleware de errores maneje cualquier excepción
            next(error);
        }
    };
    /**
     * Termine el proceso de segundo factor de recuperacion de contraseña.
     *
     *
     */
    confirmRecoveryPassword2FA = async (req, res, next) => {
        try {
            const confirmRecoveryPassword2FAData = req.body;
            // 1. Llama al servicio de confirmar 2fa password
            const isVerificationSuccessful = await this.oAuthService.verify2FAPasswordReset(confirmRecoveryPassword2FAData);
            // 2. Transforma la respuesta del servicio en una acción de controlador
            if (isVerificationSuccessful) {
                // Si el servicio devuelve true, significa éxito
                (0, helper_1.sendSuccessResponse)(res, 200, {}, "Código de verificación correcto");
            }
            else {
                // Si el servicio devuelve false, significa un error de negocio.
                // Lanzamos una AppError para que el middleware de errores la capture.
                // Es crucial dar un mensaje significativo y un código de estado adecuado.
                throw new exceptions_1.UserCodeNotMatchError("Código de verificación inválido o expirado");
            }
        }
        catch (error) {
            // Si es false, enviamos mensaje de error
            // Dejamos que el middleware de errores maneje cualquier excepción
            next(error);
        }
    };
    /**
     * Culmina el proceso de recuperacion de contraseña.
     *
     *
     */
    confirmRecoveryPassword = async (req, res, next) => {
        try {
            const confirmRecoveryPasswordData = req.body;
            // 1. Llama al servicio de recoverypassword
            const result = await this.oAuthService.confirmPasswordReset(confirmRecoveryPasswordData);
            // Si es true, enviamos mensaje de confirmacion
            // res.status(200).json({
            //     code: 1000,
            //     message: result.message,
            // });
            (0, helper_1.sendSuccessResponse)(res, 200, {}, result.message);
        }
        catch (error) {
            // Dejamos que el middleware de errores maneje cualquier excepción
            next(error);
        }
    };
    /**
     * Inicia el proceso de segundo factor para la recuperacion de usuario.
     *
     *
     */
    initiateRecoveryUser2FA = async (req, res, next) => {
        try {
            const recoveryUser2FAData = req.body;
            // 1. Llama al servicio de usernamerecover2fa
            const result = await this.oAuthService.initiateUsernameRecover(recoveryUser2FAData);
            // 2. Enviar la respuesta al usuario
            // res.status(200).json({
            //     message: result.message,
            // });
            (0, helper_1.sendSuccessResponse)(200, res, {}, result.message);
        }
        catch (error) {
            // Dejamos que el middleware de errores maneje cualquier excepción
            next(error);
        }
    };
    /**
 * Termine el proceso de segundo factor de recuperacion de usuario.
 *
 *
 */
    confirmRecoveryUser2FA = async (req, res, next) => {
        try {
            const confirmRecoveryUser2FAData = req.body;
            // 1. Llama al servicio de confirmar 2fa User
            const isVerificationSuccessful = await this.oAuthService.verify2FAUsernameRecover(confirmRecoveryUser2FAData);
            // 2. Transforma la respuesta del servicio en una acción de controlador
            if (isVerificationSuccessful) {
                // Si el servicio devuelve true, significa éxito
                (0, helper_1.sendSuccessResponse)(res, 200, {}, "Código de verificación correcto");
            }
            else {
                // Si el servicio devuelve false, significa un error de negocio.
                // Lanzamos una AppError para que el middleware de errores la capture.
                // Es crucial dar un mensaje significativo y un código de estado adecuado.
                throw new exceptions_1.UserCodeNotMatchError("Código de verificación inválido o expirado");
            }
        }
        catch (error) {
            // Si es false, enviamos mensaje de error
            // Dejamos que el middleware de errores maneje cualquier excepción
            next(error);
        }
    };
    /**
 * Culmina el proceso de recuperacion de usuario.
 *
 *
 */
    confirmRecoveryUser = async (req, res, next) => {
        try {
            const confirmRecoveryPasswordData = req.body;
            // 1. Llama al servicio de recoverypassword
            const result = await this.oAuthService.confirmUsernameReset(confirmRecoveryPasswordData);
            // Si es true, enviamos mensaje de confirmacion
            (0, helper_1.sendSuccessResponse)(res, 200, {}, result.message);
        }
        catch (error) {
            // Dejamos que el middleware de errores maneje cualquier excepción
            next(error);
        }
    };
    /**
     * Cierra la sesion del usuario
     *
     *
     */
    logoutUser = async (req, res, next) => {
        try {
            const logoutData = req.body;
            // 1. Llama al servicio de recoverypassword
            const result = await this.oAuthService.logoutSession(logoutData);
            // Si es true, enviamos mensaje de confirmacion
            (0, helper_1.sendSuccessResponse)(res, 200, {}, result.message);
        }
        catch (error) {
            // Dejamos que el middleware de errores maneje cualquier excepción
            next(error);
        }
    };
};
exports.AuthController = AuthController;
exports.AuthController = AuthController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(OAuth_service_1.OAuthService)),
    __metadata("design:paramtypes", [OAuth_service_1.OAuthService])
], AuthController);
//# sourceMappingURL=oauth.controller.js.map