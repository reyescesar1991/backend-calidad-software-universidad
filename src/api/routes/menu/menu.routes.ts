import { Router } from 'express';
import { container } from "tsyringe";
import { MenuController } from "../../../controllers/menu/menu.controller";

// Esto nos da una instancia del AuthController con todas sus dependencias ya inyectadas
const menuController = container.resolve(MenuController);

const router = Router();

router.post('/getMenu', menuController.getMenuUser);

export default router;