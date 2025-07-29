import { container } from "tsyringe";
import { Router } from 'express';
import { UserController } from "../../../controllers/user/user.controller";
import { validateCreateUserData } from "../../middlewares/users/validate-createUser.middleware";

// Esto nos da una instancia del AuthController con todas sus dependencias ya inyectadas
const userController = container.resolve(UserController);

const router = Router();

router.post('/create-user', validateCreateUserData, userController.createUser);

export default router;