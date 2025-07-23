import { delay, inject, injectable } from "tsyringe";
import { UserService } from "../../services/userService/user.service";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../core/logger";
import { ValidateUserExistsDto } from "../../validations";
import { sendSuccessResponse } from "../../core/helper";

@injectable()
export class DataUserController {

    constructor(
        @inject(delay(() => UserService)) private readonly userService: UserService
    ) { }

    /*
    * Verifica la existencia del usuario en el sistema para validarlo
    */
    public validateUserExists = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {

        logger.info('DataUserController: Inicio del proceso de validacion de existencia del usuario'); // Inicio del método

        try {

            const customUserId: ValidateUserExistsDto = req.body;

            // 1. Llama al servicio de buscar usuario con custom id
            logger.info('DataUserController: Llamando al servicio oAuthService.findUserByCustomId.');
            const result = await this.userService.findUserByCustomId(
                customUserId.idUser
            );

            // 2. Si el usuario existe enviamos una respuesta de exito
            // Log de éxito antes de enviar la respuesta
            logger.info(`DataUserController: Verificación de custom id user exitosa: ${result.idUser}.`);
            logger.debug({ message: 'DataUserController: Preparando respuesta de éxito: ', data: result.idUser });
            sendSuccessResponse(res, 200, {
                userExists : true,
                idUser : result.idUser
            }, "Validacion exitosa");

        } catch (error) {

            // Log de error en el catch
            logger.error({ message: 'DataUserController: Error durante la busqueda del usuario', error });
            // Si el código es incorrecto, el servicio lanzará una excepción que será manejada aquí.
            next(error);
        }
    }
}