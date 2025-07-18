import "reflect-metadata";

import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthController } from '../../../controllers/oauth/oauth.controller';
import { validateLoginData } from "../../middlewares/auth/validate-login.middleware";
import { validateVerify2faLoginData } from "../../middlewares/auth/validate-verify2faLogin.middleware";

// Resolvemos el controlador desde el contenedor de Tsyringe
// Esto nos da una instancia del AuthController con todas sus dependencias ya inyectadas
const authController = container.resolve(AuthController);

const router = Router();

// Definimos las rutas y las asociamos a los métodos del controlador
router.post('/login', validateLoginData, authController.login);
router.post('/verify-2fa', validateVerify2faLoginData, authController.verify2FALogin);
router.post('/logout', authController.logoutUser);

// Rutas para recuperación de contraseña
router.post('/recover-password/initiate', authController.initiateRecoveryPassword2FA);
router.post('/recover-password/verify', authController.confirmRecoveryPassword2FA);
router.post('/recover-password/confirm', authController.confirmRecoveryPassword);

// Rutas para recuperación de usuario
router.post('/recover-username/initiate', authController.initiateRecoveryUser2FA);
router.post('/recover-username/verify', authController.confirmRecoveryUser2FA);
router.post('/recover-username/confirm', authController.confirmRecoveryUser);

export default router;
