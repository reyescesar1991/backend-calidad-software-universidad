import { inject, injectable } from "tsyringe";
import { ISecurityAuditRepository } from "../interfaces/ISecurityAuditRepository";
import { ObjectIdParam, SecurityAuditDto, UpdateSecurityAuditDto } from "../../../validations";
import { SecurityAuditDocument } from "../../../db/models";
import { TransactionManager } from "../../../core/database/transactionManager";
import { handleError } from "../../../core/exceptions";
import { UserValidator } from "../../../core/validators";
import { UserService } from "../../userService/user.service";
import { ClientSession } from "mongoose";
import { Transactional } from "../../../core/utils/transaccional-wrapper";

@injectable()
export class SecurityAuditService {

    constructor(
        @inject("ISecurityAuditRepository") private readonly securityAuditRepository: ISecurityAuditRepository,
        @inject("UserService") private readonly userService: UserService,
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
    ) { }

    @Transactional()
    async createRegistrySecurityAudit(dataAudit: SecurityAuditDto, sessionParam?: ClientSession): Promise<SecurityAuditDocument | null> {


        try {

            //1. Verificamos unicamente que el usuario exista y tenga un estatus de activo en el sistema
            const user = await this.userService.findUserById(dataAudit.userId);
            UserValidator.validateStatusUserIsActive(user.status);

            //2. Creamos el registro inicial
            return await this.securityAuditRepository.createRegistrySecurityAudit(dataAudit, sessionParam);


        } catch (error) {

            handleError(error);
        }
    }

    @Transactional()
    async updateRegistrySecurityAudit(userId: ObjectIdParam, dataUpdateAudit: UpdateSecurityAuditDto, sessionParam?: ClientSession): Promise<SecurityAuditDocument | null> {


        try {

            //1. Verificamos unicamente que el usuario exista y tenga un estatus de activo en el sistema
            const user = await this.userService.findUserById(userId);
            UserValidator.validateStatusUserIsActive(user.status);

            //2. Actualizamos la data
            return await this.securityAuditRepository.updateRegistrySecurityAudit(userId, dataUpdateAudit, sessionParam);

        } catch (error) {

            handleError(error);
        }
    }


    async getRegistrySecurityAuditByUser(userId: ObjectIdParam): Promise<SecurityAuditDocument | null> {

        try {

            //1. Verificamos unicamente que el usuario exista y tenga un estatus de activo en el sistema
            const user = await this.userService.findUserById(userId);
            UserValidator.validateStatusUserIsActive(user.status);

            //2. devolvemos la data
            return await this.securityAuditRepository.getRegistrySecurityAuditByUser(userId);


        } catch (error) {

            handleError(error);
        }

    }

    @Transactional()
    async addAttempLogin(userId: ObjectIdParam, sessionParam?: ClientSession): Promise<SecurityAuditDocument | null> {


        try {

            //1. Verificamos unicamente que el usuario exista y tenga un estatus de activo en el sistema
            const user = await this.userService.findUserById(userId);
            UserValidator.validateStatusUserIsActive(user.status);

            //2. Agregamos uno al intento de login
            return await this.securityAuditRepository.addAttempLogin(userId, sessionParam);

        } catch (error) {

            handleError(error);
        }

    }


    @Transactional()
    async resetAttempLogin(userId: ObjectIdParam, sessionParam?: ClientSession): Promise<SecurityAuditDocument | null> {


        try {

            //1. Verificamos unicamente que el usuario exista y tenga un estatus de activo en el sistema
            const user = await this.userService.findUserById(userId);
            UserValidator.validateStatusUserIsActive(user.status);

            //2. reseteamos el contador
            return await this.securityAuditRepository.resetAttempLogin(userId, sessionParam);

        } catch (error) {

            handleError(error);
        }
    }

    @Transactional()
    async addAttempSecondFactor(userId: ObjectIdParam, sessionParam?: ClientSession): Promise<SecurityAuditDocument | null> {


        try {

            //1. Verificamos unicamente que el usuario exista y tenga un estatus de activo en el sistema
            const user = await this.userService.findUserById(userId);
            UserValidator.validateStatusUserIsActive(user.status);

            //2. Sumamos uno al intento de segundo factor
            return await this.securityAuditRepository.addAttempSecondFactor(userId, sessionParam);

        } catch (error) {

            handleError(error);
        }

    }

    @Transactional()
    async resetAttempSecondFactor(userId: ObjectIdParam, sessionParam?: ClientSession): Promise<SecurityAuditDocument | null> {


        try {

            //1. Verificamos unicamente que el usuario exista y tenga un estatus de activo en el sistema
            const user = await this.userService.findUserById(userId);
            UserValidator.validateStatusUserIsActive(user.status);

            //2. reseteamos el contador de intentos de segundo factor
            return await this.securityAuditRepository.resetAttempSecondFactor(userId, sessionParam);

        } catch (error) {

            handleError(error);
        }
    }


}   