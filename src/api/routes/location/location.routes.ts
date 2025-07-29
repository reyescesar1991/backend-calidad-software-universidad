import { Router } from 'express';
import { container } from 'tsyringe';
import { LocationController } from '../../../controllers/Location/location.controller';

// Esto nos da una instancia del AuthController con todas sus dependencias ya inyectadas
const locationController = container.resolve(LocationController);

const router = Router();

router.get('/get-headquarters', locationController.getHeadquarters);


router.post('/get-departments-by-headquarter', locationController.getDepartmentByHeadquarter);

export default router;