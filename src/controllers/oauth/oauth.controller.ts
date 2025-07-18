import { delay, inject, injectable } from "tsyringe";
import { OAuthService } from "../../services/oauthService/OAuth.service";
import {
    LoginDataDto,
    LogoutUserDto,
    RecoverPasswordUserDto,
    RecoverUsernameDataUserDto,
    SecondFactorRequestDto,
    TwoFactorCodeVerificationDto,
} from "../../validations";
import { LoginResponseDto } from "../../core/types";
import { Request, Response, NextFunction } from "express";
import { sendSuccessResponse } from "../../core/helper";
import { UserCodeNotMatchError } from "../../core/exceptions";
import { logger } from "../../core/logger";

@injectable()
export class AuthController {
    constructor(
        @inject(delay(() => OAuthService)) private readonly oAuthService: OAuthService
    ) { }

    /**
     * Inicia el proceso de login.
     * Si 2FA está inactivo, devuelve el token final.
     * Si 2FA está activo, inicia el flujo de verificación y devuelve un token temporal.
     */
    public login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        logger.info('AuthController: Inicio del proceso de login'); // Inicio del método
        try {
            const loginData: LoginDataDto = req.body;

            // 1. Llama al servicio de login
            const result: LoginResponseDto = await this.oAuthService.loginUser(
                loginData
            );

            // 2. El controlador interpreta la respuesta del servicio
            if (result.needsTwoFactor) {
                logger.info(`AuthController: Usuario '${loginData.username}' requiere 2FA. Iniciando 2FA.`); // Log 2FA
                // CASO 2FA: El usuario necesita un segundo factor.
                // 2a. El servicio ya generó un `preAuthToken`. Ahora le pedimos que inicie el envío del código.
                await this.oAuthService.initiateLogin2FA(result);

                // 2b. Se le responde al cliente que se necesita un paso más, enviando los datos necesarios.
                const responseBody = {
                    userId: result.userId,
                    preAuthToken: result.preAuthToken,
                };
                const responseMessage = "Codigo de verificacion enviado. Por favor introduzca el codigo y termine su proceso de login";

                logger.debug({
                    message: 'Preparando respuesta para flujo 2FA:',
                    body: responseBody,
                    headersSent: res.headersSent,
                });
                sendSuccessResponse(res, 200, responseBody, responseMessage);

            } else {
                logger.info(`AuthController: Usuario '${loginData.username}' logueado exitosamente (sin 2FA).`); // Log éxito sin 2FA
                // CASO SIN 2FA: El login fue exitoso y directo.
                // Se le envía el token de sesión final.
                const responseBody = { token: result.token };
                const responseMessage = "Login exitoso";
                logger.debug({
                    message: 'Preparando respuesta para flujo sin 2FA:',
                    body: responseBody,
                    headersSent: res.headersSent,
                });
                sendSuccessResponse(res, 200, responseBody, responseMessage);
            }
        } catch (error) {
            // Dejamos que el middleware de errores maneje cualquier excepción
            logger.error({ message: 'AuthController: Error durante el login.', error }); // Log de error
            next(error);
        }
    };

    /**
     * Verifica el código 2FA y, si es correcto, completa el login devolviendo el token de sesión final.
     */
    public verify2FALogin = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        // Log al inicio del método
        logger.info('AuthController: Inicio del proceso de verificación 2FA de login.');
        // Loguear datos de entrada (DEBUG - con cuidado de no loguear el código 2FA completo si es sensible)
        logger.debug({ message: 'AuthController: Datos de verificación 2FA recibidos.', userId: req.body.userId, preAuthTokenExists: !!req.body.preAuthToken, codeProvided: !!req.body.code });

        try {
            const verificationData: TwoFactorCodeVerificationDto = req.body;

            // 1. Llama al servicio para verificar el código
            logger.info('AuthController: Llamando al servicio oAuthService.verify2FALogin.');
            const result: LoginResponseDto = await this.oAuthService.verify2FALogin(
                verificationData
            );

            // 2. Si el código es correcto, el servicio ya nos devuelve el token final.
            // Log de éxito antes de enviar la respuesta
            logger.info(`AuthController: Verificación 2FA exitosa para userId: ${result.userId}. Login completado.`);
            logger.debug({ message: 'AuthController: Preparando respuesta de éxito de login 2FA.', tokenExists: !!result.token });
            sendSuccessResponse(res, 200, {
                token: result.token,
            }, "Login exitoso");
        } catch (error) {

            // Log de error en el catch
            logger.error({ message: 'AuthController: Error durante la verificación 2FA de login.', error });
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
    public initiateRecoveryPassword2FA = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const recoveryPassword2FAData: SecondFactorRequestDto = req.body;

            // 1. Llama al servicio de iniciar 2fa password
            const result = await this.oAuthService.initiatePasswordReset(
                recoveryPassword2FAData
            );

            // 2. Enviar la respuesta al usuario
            // res.status(200).json({
            //     message: result.message,
            // });
            sendSuccessResponse(res, 200, {}, result.message);
        } catch (error) {
            // Dejamos que el middleware de errores maneje cualquier excepción
            next(error);
        }
    };

    /**
     * Termine el proceso de segundo factor de recuperacion de contraseña.
     *
     *
     */
    public confirmRecoveryPassword2FA = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const confirmRecoveryPassword2FAData: TwoFactorCodeVerificationDto =
                req.body;

            // 1. Llama al servicio de confirmar 2fa password
            const isVerificationSuccessful = await this.oAuthService.verify2FAPasswordReset(
                confirmRecoveryPassword2FAData
            );

            // 2. Transforma la respuesta del servicio en una acción de controlador
            if (isVerificationSuccessful) {
                // Si el servicio devuelve true, significa éxito
                sendSuccessResponse(res, 200, {}, "Código de verificación correcto");
            } else {
                // Si el servicio devuelve false, significa un error de negocio.
                // Lanzamos una AppError para que el middleware de errores la capture.
                // Es crucial dar un mensaje significativo y un código de estado adecuado.
                throw new UserCodeNotMatchError("Código de verificación inválido o expirado");
            }

        } catch (error) {
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
    public confirmRecoveryPassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const confirmRecoveryPasswordData: RecoverPasswordUserDto =
                req.body;

            // 1. Llama al servicio de recoverypassword
            const result = await this.oAuthService.confirmPasswordReset(
                confirmRecoveryPasswordData
            );

            // Si es true, enviamos mensaje de confirmacion
            // res.status(200).json({
            //     code: 1000,
            //     message: result.message,
            // });
            sendSuccessResponse(res, 200, {}, result.message);

        } catch (error) {
            // Dejamos que el middleware de errores maneje cualquier excepción
            next(error);
        }
    };



    /**
     * Inicia el proceso de segundo factor para la recuperacion de usuario.
     *
     *
     */
    public initiateRecoveryUser2FA = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const recoveryUser2FAData: SecondFactorRequestDto = req.body;

            // 1. Llama al servicio de usernamerecover2fa
            const result = await this.oAuthService.initiateUsernameRecover(
                recoveryUser2FAData
            );

            // 2. Enviar la respuesta al usuario
            // res.status(200).json({
            //     message: result.message,
            // });
            sendSuccessResponse(res, 200, {}, result.message);
        } catch (error) {
            // Dejamos que el middleware de errores maneje cualquier excepción
            next(error);
        }
    };


    /**
 * Termine el proceso de segundo factor de recuperacion de usuario.
 *
 *
 */
    public confirmRecoveryUser2FA = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const confirmRecoveryUser2FAData: TwoFactorCodeVerificationDto =
                req.body;

            // 1. Llama al servicio de confirmar 2fa User
            const isVerificationSuccessful = await this.oAuthService.verify2FAUsernameRecover(
                confirmRecoveryUser2FAData
            );

            // 2. Transforma la respuesta del servicio en una acción de controlador
            if (isVerificationSuccessful) {
                // Si el servicio devuelve true, significa éxito
                sendSuccessResponse(res, 200, {}, "Código de verificación correcto");
            } else {
                // Si el servicio devuelve false, significa un error de negocio.
                // Lanzamos una AppError para que el middleware de errores la capture.
                // Es crucial dar un mensaje significativo y un código de estado adecuado.
                throw new UserCodeNotMatchError("Código de verificación inválido o expirado");
            }

        } catch (error) {
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
    public confirmRecoveryUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const confirmRecoveryPasswordData: RecoverUsernameDataUserDto =
                req.body;

            // 1. Llama al servicio de recoverypassword
            const result = await this.oAuthService.confirmUsernameReset(
                confirmRecoveryPasswordData
            );

            // Si es true, enviamos mensaje de confirmacion
            sendSuccessResponse(res, 200, {}, result.message);
        } catch (error) {
            // Dejamos que el middleware de errores maneje cualquier excepción
            next(error);
        }
    };

    /**
     * Cierra la sesion del usuario
     *  
     *
     */
    public logoutUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        // Log al inicio del método
        logger.info('AuthController: Inicio del proceso de cierre de sesion del usuario');
        // Loguear datos de entrada (DEBUG - con cuidado de no loguear el código 2FA completo si es sensible)
        logger.debug({ message: 'AuthController: Datos de cierre de sesion del usuario recibidos.', userId: req.body.userId });

        try {
            const logoutData: LogoutUserDto =
                req.body;

            // 1. Llama al servicio de recoverypassword
            logger.info('AuthController: Llamando al servicio oAuthService.logoutSession.');
            const result = await this.oAuthService.logoutSession(
                logoutData
            );

            // Si es true, enviamos mensaje de confirmacion
            logger.info(`AuthController: Cierre de sesion exitoso para userId: ${req.body.userId}. Login completado.`);
            logger.debug({ message: 'AuthController: Preparando respuesta de éxito de login 2FA.'});
            sendSuccessResponse(res, 200, {}, result.message);
        } catch (error) {

            // Log de error en el catch
            logger.error({ message: 'AuthController: Error durante el cierre de sesion del usuario.', error });
            // Dejamos que el middleware de errores maneje cualquier excepción
            next(error);
        }
    };
}
