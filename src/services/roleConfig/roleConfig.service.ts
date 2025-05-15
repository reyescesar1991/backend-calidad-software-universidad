import { inject, injectable } from "tsyringe";
import { IRoleConfigRepository } from "./interfaces/IRoleConfigRepository";
import { RoleConfigValidator } from "../../core/validators";
import { TransactionManager } from "../../core/database/transactionManager";
import { ObjectIdParam, RoleConfigDto, UpdateRoleConfigDto } from "../../validations";
import { handleError } from "../../core/exceptions";
import { RoleConfigDocument } from "../../db/models/roleModels/roleConfig.model";
import { FilterOptions, RoleConfigFilterKeys } from "../../core/types";

@injectable()
export class RoleConfigService {

    constructor(
        @inject("IRoleConfigRepository") private readonly roleConfigRepository : IRoleConfigRepository,
        @inject("RoleConfigValidator") private readonly roleConfigValidator : RoleConfigValidator,
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
    ){}


    async findConfigRoleById(idConfigRole : ObjectIdParam) :  Promise<RoleConfigDocument | null>{

        try {

            const roleConfig = await this.roleConfigRepository.findConfigRoleById(idConfigRole);

            RoleConfigValidator.validateRoleConfigExists(roleConfig);

            return roleConfig;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findConfigRoleByNameRole(nameRole : string) :  Promise<RoleConfigDocument | null>{

        try {
            
            const roleConfig = await this.roleConfigRepository.findConfigRoleByNameRole(nameRole);

            RoleConfigValidator.validateRoleConfigName(roleConfig);

            return roleConfig;

        } catch (error) {
            
            handleError(error);
        }
    }

    async searchConfigRoleByFilter(filter : FilterOptions<RoleConfigFilterKeys>) : Promise<RoleConfigDocument[] | null>{

        try {

            RoleConfigValidator.validateFilterRole(filter);

            const rolConfigs = await this.roleConfigRepository.searchConfigRoleByFilter(filter);

            RoleConfigValidator.validateRoleConfigsFound(rolConfigs);

            return rolConfigs;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async activateConfigRole(idConfigRole : ObjectIdParam) : Promise<RoleConfigDocument | null>{

        return this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const roleConfig = await this.roleConfigRepository.findConfigRoleById(idConfigRole);

                    RoleConfigValidator.validateRoleConfigExists(roleConfig);

                    RoleConfigValidator.validateRoleConfigAlreadyActive(roleConfig.isActive);

                    return await this.roleConfigRepository.activateConfigRole(idConfigRole, session);
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }

    async deleteConfigRole(idConfigRole : ObjectIdParam) : Promise<RoleConfigDocument | null>{

        return this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const roleConfig = await this.roleConfigRepository.findConfigRoleById(idConfigRole);

                    RoleConfigValidator.validateRoleConfigExists(roleConfig);

                    RoleConfigValidator.validateRoleConfigAlreadyInactive(roleConfig.isActive);

                    return await this.roleConfigRepository.deleteConfigRole(idConfigRole, session);
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }

    async createConfigRole(dataConfigRole : RoleConfigDto) : Promise<RoleConfigDocument | null>{


        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    console.log(dataConfigRole);
                    
                    await this.roleConfigValidator.validateUniquenessRoleConfig(dataConfigRole.rolName);

                    await this.roleConfigValidator.validateRoleExists(dataConfigRole.rolID);

                    RoleConfigValidator.validateMaxLoginAttemptsMajorEqualTwo(dataConfigRole.maxLoginAttempts);

                    return await this.roleConfigRepository.createConfigRole(dataConfigRole, session);
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }

    async updateConfigRole(idConfigRole : ObjectIdParam, dataConfigRoleUpdate : UpdateRoleConfigDto) : Promise<RoleConfigDocument | null>{

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const roleConfig = await this.roleConfigRepository.findConfigRoleById(idConfigRole);

                    RoleConfigValidator.validateRoleConfigExists(roleConfig);

                    await this.roleConfigValidator.validateUniquenessRoleConfig(dataConfigRoleUpdate.rolName);

                    RoleConfigValidator.validateMaxLoginAttemptsMajorEqualTwo(dataConfigRoleUpdate.maxLoginAttempts);

                    return await this.roleConfigRepository.updateConfigRole(idConfigRole, dataConfigRoleUpdate, session);
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
        
    }
}