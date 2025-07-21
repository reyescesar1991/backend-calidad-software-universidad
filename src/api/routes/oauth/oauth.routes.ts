import "reflect-metadata";

import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthController } from '../../../controllers/oauth/oauth.controller';
import { validateLoginData } from "../../middlewares/auth/validate-login.middleware";
import { validateVerify2faLoginData } from "../../middlewares/auth/validate-verify2faLogin.middleware";
import { validateLogoutData } from "../../middlewares/auth/validate-logout.middleware";
import { validateInitiateRecoveryPassword2FA } from "../../middlewares/auth/validate-initiate2fa.middleware";
import { validateVerifyRecoveryPassword2FA } from "../../middlewares/auth/validate-verify2faRecoveryPassword.middleware";
import { validateRecoveryPassword } from "../../middlewares/auth/validate-recoveryPassword.middleware";
import { validateInitiateRecoveryUser2FA } from "../../middlewares/auth/validate-initiate2faRecoveryUser.middleware";
import { validateVerifyRecoveryUser2FA } from "../../middlewares/auth/validate-verify2faRecoveryUser.middleware";
import { validateRecoveryUser } from "../../middlewares/auth/validate-recoveryUser.middleware";

// Resolvemos el controlador desde el contenedor de Tsyringe
// Esto nos da una instancia del AuthController con todas sus dependencias ya inyectadas
const authController = container.resolve(AuthController);

const router = Router();

// Definimos las rutas y las asociamos a los métodos del controlador
router.post('/login', validateLoginData, authController.login);
router.post('/verify-2fa', validateVerify2faLoginData, authController.verify2FALogin);
router.post('/logout', validateLogoutData, authController.logoutUser);

// Rutas para recuperación de contraseña
router.post('/recover-password/initiate', validateInitiateRecoveryPassword2FA, authController.initiateRecoveryPassword2FA);
router.post('/recover-password/verify', validateVerifyRecoveryPassword2FA, authController.confirmRecoveryPassword2FA);
router.post('/recover-password/confirm', validateRecoveryPassword,  authController.confirmRecoveryPassword);

// Rutas para recuperación de usuario
router.post('/recover-username/initiate', validateInitiateRecoveryUser2FA, authController.initiateRecoveryUser2FA);
router.post('/recover-username/verify', validateVerifyRecoveryUser2FA, authController.confirmRecoveryUser2FA);
router.post('/recover-username/confirm', validateRecoveryUser, authController.confirmRecoveryUser);

export default router;
