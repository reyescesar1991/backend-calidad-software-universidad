import { delay, inject, injectable } from "tsyringe";
import { UserService } from "../../services/userService/user.service";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../core/logger";
import { UserDto } from "../../validations";

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

        } catch (error) {

            // Log de error en el catch
            logger.error({ message: 'UserController: Error la creacion del usuario', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }
}