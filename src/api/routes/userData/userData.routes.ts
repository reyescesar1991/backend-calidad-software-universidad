import { container } from "tsyringe";
import { DataUserController } from "../../../controllers/dataUser/dataUser.controller";
import { Router } from 'express';
import { validateCustomUserIdData } from "../../middlewares/dataUser/validate-customUserId.middleware";

// Esto nos da una instancia del AuthController con todas sus dependencias ya inyectadas
const userDataController = container.resolve(DataUserController);

const router = Router();


router.get('/validate-user', validateCustomUserIdData, userDataController.validateUserExists);

export default router;