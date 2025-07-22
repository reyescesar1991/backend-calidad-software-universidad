import { inject, injectable } from "tsyringe";
import { TransactionManager } from "../../../core/database/transactionManager";
import { ITwoFactorUserRepository } from "../../userService";
import { ITwoFactorValueRepository } from "../interfaces/ITwoFactorValueRepository";
import { ObjectIdParam, UpdateSecurityAuditDto } from "../../../validations";
import { SecurityAuditDocument, TwoFactorValueUserDocument } from "../../../db/models";
import { handleError } from "../../../core/exceptions";
import { SecurityAuditValidator, TwoFactorValueValidator, UserValidator } from "../../../core/validators";
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

            //2. Verificamos que el usuario tenga un registro en la tabla valor de factor de autenticacion, si es asi lanzamos un error
            const userFactorValue = await this.twoFactorValueRepository.findTwoFactorValueUserByCustomUserId(userId);

            //Para mejorar la experiencia de usuario, elimino el codigo anterior pero le sumo uno al intento
            if(userFactorValue){

                await this.securityAuditService.addAttempSecondFactor(userId, sessionParam);
                await this.deleteTwoFactorValueUser(userId, sessionParam);
            }
            // TwoFactorValueValidator.validateTwoFactorDataBaseExists(userFactorValue);

            //3. Validamos que el email este previamente registrado
            await this.userValidator.validateEmailUser(userId, email);

            //4. Generar código de 6 dígitos
            const code = Math.floor(100000 + Math.random() * 900000).toString();

            //5. Generar la fecha de expiracion
            const expiresAt = new Date(Date.now() + 60 * 1000);

            const registryAudit = await this.securityAuditService.getRegistrySecurityAuditByUser(userId);

            console.log(registryAudit);


            //6. Si no existe un registro en el audit, lo creamos para ese usuario
            if (!registryAudit) {

                //6.1 Si no existe, lo creamos
                await this.securityAuditService.createRegistrySecurityAudit(
                    {
                        userId: userId,
                    }, sessionParam
                )
            }
            else {

                //6.2 Si ya existe, verificamos que el maximo de intentos ya no haya superado los 3, si es asi el usuario se tendra que bloquear
                await this.validateNumberAttempsFactor(registryAudit, userId, sessionParam);
            }

            //7. Envio por correo el código
            await this.mailService.sendTwoFactorCode(email, code);

            // //8. Sumamos uno al segundo factor
            // await this.securityAuditService.addAttempSecondFactor(userId, sessionParam);

            //8. Creo el registro en la tabla temporal de valores
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
    async validateFactorUser(userId: ObjectIdParam, code: string, sessionParam?: ClientSession): Promise<boolean | null> {

        console.log("cODE: ", code);

        try {

            // PASO 1: OBTENER LOS DATOS CRÍTICOS UNA SOLA VEZ AL INICIO
            const user = await this.userService.findUserById(userId);
            const dataUserAudit = await this.securityAuditService.getRegistrySecurityAuditByUser(userId);
            const userFactorActive = await this.twoFactorUserActiveRepository.getTwoFactorUser(userId);

            // =================================================================
            // PASO 2: VALIDACIÓN DE BLOQUEO "FAIL FAST" (LA LÓGICA CLAVE)
            // Si ya ha superado el límite de intentos, no procesamos nada más.
            // =================================================================
            UserValidator.validateTwoFactorUserIsAlreadyInactive(userFactorActive.isActive);
            SecurityAuditValidator.validateSecurityAuditRegistryExists(dataUserAudit);
            SecurityAuditValidator.validateSecurityAuditAttempsUserSecondFactor(dataUserAudit);

            // Ahora que sabemos que el usuario NO está bloqueado, validamos su estado actual.
            // Esto previene otros estados como "PENDIENTE", "ELIMINADO", etc. 
            UserValidator.validateStatusUserIsActive(user.status);


            // PASO 3: OBTENER Y VALIDAR EL CÓDIGO 2FA
            const userFactorValue = await this.twoFactorValueRepository.findTwoFactorValueUserByCustomUserId(userId);
            TwoFactorValueValidator.validateTwoFactorDataBaseNotExists(userFactorValue);

            // PASO 4: COMPARAR EL CÓDIGO Y ACTUAR
            if (code !== userFactorValue.value) {

                // El código es incorrecto
                // 4.1 Incrementamos el contador
                const updatedAudit  = await this.securityAuditService.addAttempSecondFactor(userId, sessionParam);

                // 4.2 DESPUÉS de incrementar, verificamos si este fue el intento que lo bloquea
                await this.validateNumberAttempsFactor(updatedAudit, userId, sessionParam);

                // 4.3 Actualizamos la fecha del último intento fallido
                const lastAttempLogin: UpdateSecurityAuditDto = { 
                    lastFailedLogin: new Date(Date.now() + 10 * 60 * 1000)
                };
                await this.securityAuditService.updateRegistrySecurityAudit(userId, lastAttempLogin, sessionParam);

                return false;
            }
            
            else {

                // El código es correcto
                // 4.4 Reseteamos el contador
                await this.securityAuditService.resetAttempSecondFactor(userId, sessionParam);

                //4.5 Colocamos un minuto de duracion para la autenticacion
                const twoFactorVerifiedUntil : UpdateSecurityAuditDto = {

                    twoFactorVerifiedUntil : new Date(Date.now() + 60 * 1000),
                };
                await this.securityAuditService.updateRegistrySecurityAudit(userId, twoFactorVerifiedUntil, sessionParam);

                // 4.6 Eliminamos el código de un solo uso
                await this.twoFactorValueRepository.deleteTwoFactorValueUser(userId, sessionParam);
                return true;
            }


        } catch (error) {

            handleError(error);
        }

    }

    @Transactional()
    async deleteTwoFactorValueUser(userId : ObjectIdParam, session: ClientSession) : Promise<TwoFactorValueUserDocument | null>{

        try {
            const userFactorValue = await this.twoFactorValueRepository.findTwoFactorValueUserByCustomUserId(userId);

            TwoFactorValueValidator.validateTwoFactorDataBaseExists(userFactorValue);

            return await this.twoFactorValueRepository.deleteTwoFactorValueUser(userId, session);

        } catch (error) {
            
            handleError(error);
        }
    }


    //Funcion que me permite verificar que si el intentos ha sido mas de dos, bloquear al usuario
    private async validateNumberAttempsFactor(dataUserAudit: SecurityAuditDocument, idUser: ObjectIdParam, session: ClientSession): Promise<void> {

        if (dataUserAudit.secondFactorAttempts >= 3) {

            console.log(dataUserAudit.secondFactorAttempts);
            await this.userService.changeStatusUser(StatusUserEnum.BLOCKED, idUser, session);
        }

    }
}