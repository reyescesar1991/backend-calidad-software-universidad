import { inject, injectable } from "tsyringe";
import { TransactionManager } from "../../../core/database/transactionManager";
import { ITwoFactorUserRepository } from "../../userService";
import { ITwoFactorValueRepository } from "../interfaces/ITwoFactorValueRepository";
import { ObjectIdParam } from "../../../validations";
import { SecurityAuditDocument, TwoFactorValueUserDocument } from "../../../db/models";
import { handleError } from "../../../core/exceptions";
import { TwoFactorValueValidator, UserValidator } from "../../../core/validators";
import { MailService } from "../../mailService/mail.service";
import { UserService } from "../../userService/user.service";
import { SecurityAuditService } from "./SecurityAudit.service";
import { StatusUserEnum } from "../../../core/enums";
import { Transactional } from "../../../core/utils/transaccional-wrapper";
import { ClientSession } from "mongoose";

@injectable()
export class TwoFactorUserService {

    constructor(
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("ITwoFactorUserRepository") private readonly twoFactorUserActiveRepository: ITwoFactorUserRepository,
        @inject("ITwoFactorValueRepository") private readonly twoFactorValueRepository: ITwoFactorValueRepository,
        @inject(MailService) private mailService: MailService,
        @inject("UserValidator") private readonly userValidator: UserValidator,
        @inject("UserService") private readonly userService: UserService,
        @inject("SecurityAuditService") private readonly securityAuditService: SecurityAuditService,

    ) { }

    @Transactional()
    async generateAndSendCode(userId: ObjectIdParam, email: string, sessionParam?: ClientSession): Promise<TwoFactorValueUserDocument | null> {

        try {

            //1. Verificar que el usuario tenga un registro en tabla intermedia de factor-user y que este activo, ademas que no este bloqueado
            const userFactorActive = await this.twoFactorUserActiveRepository.getTwoFactorUser(userId);
            UserValidator.validateTwoFactorUserIsAlreadyInactive(userFactorActive.isActive);

            const statusUser = await this.userService.findUserById(userId);
            UserValidator.validateStatusUserIsActive(statusUser.status);

            //2. Validamos que el email este previamente registrado
            await this.userValidator.validateEmailUser(userId, email);

            //3. Generar código de 6 dígitos
            const code = Math.floor(100000 + Math.random() * 900000).toString();

            //4. Generar la fecha de expiracion
            const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

            //5. Envio por correo el código
            await this.mailService.sendTwoFactorCode(email, code);

            await this.securityAuditService.createRegistrySecurityAudit(
                {
                    userId: userId,
                }, sessionParam
            )

            //6. Sumamos uno al segundo factor
            await this.securityAuditService.addAttempSecondFactor(userId, sessionParam);

            //7. Creo el registro en la tabla temporal de valores
            return await this.twoFactorValueRepository.generateAndSendCode({

                userId: userFactorActive.userId,
                value: code,
                method: userFactorActive.twoFactorId,
                expiresAt: expiresAt,
            }, sessionParam);


        } catch (error) {

            handleError(error);
        }
    }

    @Transactional()
    async validateFactorUser(userId: ObjectIdParam, code: string): Promise<boolean | null> {


        try {

            //1. Verificar que el usuario tenga un registro en tabla intermedia de factor-user y que este activo
            const userFactorActive = await this.twoFactorUserActiveRepository.getTwoFactorUser(userId);
            UserValidator.validateTwoFactorUserIsAlreadyInactive(userFactorActive.isActive);

            //2. Verificamos que el usuario tenga un registro en la tabla valor de factor de autenticacion
            const userFactorValue = await this.twoFactorValueRepository.findTwoFactorValueUserByCustomUserId(userId);
            TwoFactorValueValidator.validateTwoFactorDataBase(userFactorValue);

            //3. Verificar el codigo dado por el usuario con el guardado en base de datos
            if (code !== userFactorValue.value) {

                //3.1 Agregamos uno al segundo factor
                await this.securityAuditService.addAttempSecondFactor(userId);

                //3.2 Obtenemos la data de auditoria del usuario
                const dataUserAudit = await this.securityAuditService.getRegistrySecurityAuditByUser(userId);

                //3.3 Validamos si ya alcanzo el limite de intentos
                await this.validateNumberAttempsFactor(dataUserAudit, userId);

                return false;
            }
            //4. En que caso de que sea igual al codigo enviado y almacenado en bd, seria exitoso
            else {

                //4.1 Reseteamos el contador de segundo factor ya que fue exitoso
                await this.securityAuditService.resetAttempSecondFactor(userId);
                return true;
            }


        } catch (error) {

            handleError(error);
        }


    }

    //Funcion que me permite verificar que si el intentos ha sido mas de dos, bloquear al usuario
    async validateNumberAttempsFactor(dataUserAudit: SecurityAuditDocument, idUser: ObjectIdParam) {

        if (dataUserAudit.secondFactorAttempts >= 3) {

            await this.userService.changeStatusUser(StatusUserEnum.BLOCKED, idUser);
        }
    }
}