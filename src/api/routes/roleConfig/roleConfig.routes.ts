import { container } from "tsyringe";
import { Router } from 'express';
import { RoleConfigController } from "../../../controllers/roleConfig/roleConfig.controller";

// Esto nos da una instancia del AuthController con todas sus dependencias ya inyectadas
const roleConfigController = container.resolve(RoleConfigController);

const router = Router();

router.get('/get-roles-by-config-role', roleConfigController.getRolesByConfigRole);

export default router;