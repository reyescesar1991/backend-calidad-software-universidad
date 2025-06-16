import { inject, injectable } from "tsyringe";
import { TransactionManager } from "../../../core/database/transactionManager";
import { ITwoFactorUserRepository } from "../../userService";
import { ITwoFactorValueRepository } from "../interfaces/ITwoFactorValueRepository";
import { ObjectIdParam } from "../../../validations";
import { TwoFactorValueUserDocument } from "../../../db/models";
import { handleError } from "../../../core/exceptions";
import { UserValidator } from "../../../core/validators";
import { MailService } from "../../mailService/mail.service";

@injectable()
export class TwoFactorUserService{

    constructor(
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("ITwoFactorUserRepository") private readonly twoFactorUserActiveRepository: ITwoFactorUserRepository,
        @inject("ITwoFactorValueRepository") private readonly twoFactorValueRepository: ITwoFactorValueRepository,
        @inject(MailService) private mailService: MailService,
        @inject("UserValidator") private readonly userValidator: UserValidator,
    ){}

    async generateAndSendCode(userId : ObjectIdParam, email : string): Promise<TwoFactorValueUserDocument | null>{

        return await this.transactionManager.executeTransaction(

            async () => {

                try {

                    //1. Verificar que el usuario tenga un registro en tabla intermedia de factor-user y que este activo
                    const userFactorActive = await this.twoFactorUserActiveRepository.getTwoFactorUser(userId);

                    UserValidator.validateTwoFactorUserIsAlreadyActive(userFactorActive.isActive);

                    //2. Validamos que el email este previamente registrado
                    await this.userValidator.validateEmailUser(userId, email);

                    //3. Generar código de 6 dígitos
                    const code = Math.floor(100000 + Math.random() * 900000).toString();

                    //4. Generar la fecha de expiracion
                    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

                    //5. Envio por correo el código
                    await this.mailService.sendTwoFactorCode(email, code);

                    //6. Creo el registro en la tabla temporal de valores
                    return await this.twoFactorValueRepository.generateAndSendCode({

                        userId : userFactorActive.userId,
                        value : code,
                        method : userFactorActive.twoFactorId,
                        expiresAt : expiresAt,
                    })

                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }
}