import { delay, inject, injectable } from "tsyringe";
import { LocationService } from "../../services/locationService/Location.service";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../core/logger";
import { sendSuccessResponse } from "../../core/helper";
import { ObjectIdParam, objectIdSchema } from "../../validations";

@injectable()
export class LocationController {

    constructor(
        @inject(delay(() => LocationService)) private readonly locationService: LocationService
    ) { }

    public getHeadquarters = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        // Log al inicio del método
        logger.info('LocationController: Inicio del proceso de obtencion de sedes');

        try {

            // 1. Llama al servicio de buscar usuario con custom id
            logger.info('LocationController: Llamando al servicio LocationService.findAllHeadquarters.');
            const result = await this.locationService.findAllHeadquarters();

            // 2. Si el usuario existe enviamos una respuesta de exito
            // Log de éxito antes de enviar la respuesta
            logger.info(`LocationController: Sedes encontradas.`);
            logger.debug({ message: 'LocationController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, {
                headquarters: result,
            }, "Sedes obtenidas exitosamente");

        } catch (error) {

            // Log de error en el catch
            logger.error({ message: 'LocationController: Error durante la busqueda de las sedes', error });
            // Dejamos que el middleware de errores maneje cualquier excepción
            next(error);
        }
    }

    public getDepartmentByHeadquarter = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        // Log al inicio del método
        logger.info('LocationController: Inicio del proceso de obtencion de departamentos por sede');

        try {

            // Loguear datos de entrada
            logger.debug({ message: 'LocationController: Datos enviados por el usuario', idHeadquarter: req.body });

            const idHeadquarter: ObjectIdParam = objectIdSchema.parse(req.body.idHeadquarter);

            // 1. Llama al servicio de buscar departamentos con headquarter id
            logger.info('LocationController: Llamando al servicio LocationService.findDepartmentsByHeadquarter.');
            const result = await this.locationService.findDepartmentsByHeadquarter(idHeadquarter);

            logger.info(`LocationController: Departamentos encontrados.`);
            logger.debug({ message: 'LocationController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, {
                departments: result,
            }, "Departamentos obtenidos para la sede exitosamente");


        } catch (error) {

            // Log de error en el catch
            logger.error({ message: 'LocationController: Error durante la busqueda de las sedes', error });
            // Dejamos que el middleware de errores maneje cualquier excepción
            next(error);
        }
    }
}