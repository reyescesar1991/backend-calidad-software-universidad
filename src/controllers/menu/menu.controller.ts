import { delay, inject, injectable } from "tsyringe";
import { UserService } from "../../services/userService/user.service";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../core/logger";
import { sendSuccessResponse } from "../../core/helper";

@injectable()
export class MenuController {

    constructor(
        @inject(delay(() => UserService)) private readonly userService: UserService
    ) { }


    public getMenuUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        // Log al inicio del método
        logger.info('MenuController: Inicio del proceso de obtencion del menu del usuario');

        try {

            const menuRequest: string = req.body.idUser;

            // 1. Llama al servicio de buscar usuario con custom id
            logger.info('MenuController: Llamando al servicio UserService.getMenuUser.');
            const result = await this.userService.buildUserMenu(menuRequest);

            // 2. Si el usuario existe enviamos una respuesta de exito
            // Log de éxito antes de enviar la respuesta
            logger.info(`MenuController: Sedes encontradas.`);
            logger.debug({ message: 'MenuController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, {
                menu: result,
            }, "Menu del usuario obtenido exitosamente");


        } catch (error) {

            // Log de error en el catch
            logger.error({ message: 'MenuController: Error durante la busqueda de las sedes', error });
            // Dejamos que el middleware de errores maneje cualquier excepción
            next(error);
        }
    }
}