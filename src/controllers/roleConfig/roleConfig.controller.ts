import { delay, inject, injectable } from "tsyringe";
import { RoleConfigService } from "../../services/roleConfig/roleConfig.service";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../core/logger";
import { sendSuccessResponse } from "../../core/helper";

@injectable()
export class RoleConfigController {

    constructor(
        @inject(delay(() => RoleConfigService)) private readonly roleConfigService: RoleConfigService
    ) { }

    /*
    *   Devuelve los roles a traves de la configuracion de rol
    */
    public getRolesByConfigRole = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        logger.info('RoleConfigController: Inicio del proceso de obtener los roles a traves de las configuraciones de rol'); // Inicio del método

        try {

            // 1. Llama al servicio de buscar usuario con custom id
            logger.info('RoleConfigController: Llamando al servicio RoleConfigService.findRolesByConfigRoles.');
            const result = await this.roleConfigService.findRolesByConfigRoles();

            // 2. Si el usuario existe enviamos una respuesta de exito
            // Log de éxito antes de enviar la respuesta
            logger.info(`RoleConfigController: Roles encontrados.`);
            logger.debug({ message: 'RoleConfigController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, {
                roles : result,
            }, "Roles obtenidos exitosamente");


        } catch (error) {

            // Log de error en el catch
            logger.error({ message: 'RoleConfigController: Error durante la busqueda de la configuracion del rol', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }
}