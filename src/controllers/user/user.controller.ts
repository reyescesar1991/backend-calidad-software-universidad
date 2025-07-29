import { delay, inject, injectable } from "tsyringe";
import { UserService } from "../../services/userService/user.service";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../core/logger";
import { ObjectIdParam, objectIdSchema, UserDto } from "../../validations";
import { log } from "console";
import { sendSuccessResponse } from "../../core/helper";

@injectable()
export class UserController {

    constructor(
        @inject(delay(() => UserService)) private readonly userService: UserService
    ) { }

    /*
    * Crea un usuario en el sistema
    */
    public createUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        logger.info('UserController: Inicio del proceso de creacion de usuario'); // Inicio del método

        try {

            const createUser: UserDto = req.body;
            const configRoleUser: ObjectIdParam = req.body.roleConfig;

            logger.info('UserController: Datos enviados por el usuario', createUser);
            logger.info('UserController: Datos enviados por el usuario', configRoleUser);

            // 1. Llama al servicio de crear usuario
            logger.info('UserController: Llamando al servicio UserService.createUser.');
            const result = await this.userService.createUser(createUser, configRoleUser);

            logger.info(`UserController: Usuario creado de forma exitosa.`);
            logger.debug({ message: 'UserController: Preparando respuesta de éxito: ', data: result });
            sendSuccessResponse(res, 200, {}, "Usuario creado exitosamente");


        } catch (error) {

            // Log de error en el catch
            logger.error({ message: 'UserController: Error la creacion del usuario', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }
}