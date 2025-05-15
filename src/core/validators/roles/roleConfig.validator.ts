import { inject, injectable } from "tsyringe";
import { IRoleConfigRepository } from "../../../services/roleConfig";
import { RoleConfigDocument } from "../../../db/models/roleModels/roleConfig.model";
import { FilterRoleConfigError, RolConfigMaxLoginAttemptsNotValidError, RoleConfigAlreadyActiveError, RoleConfigAlreadyExistsError, RoleConfigAlreadyInactiveError, RoleConfigNotFoundByNameError, RoleConfigNotFoundError, RoleConfigRoleNotExistsError, RoleConfigsNotFoundByFilterError } from "../../exceptions";
import { FilterOptions, RoleConfigFilterKeys } from "../../types";
import { ObjectIdParam, RoleConfigFilterSchema } from "../../../validations";
import { IRoleRepository } from "../../../services/role/interfaces/IRoleRepository";

@injectable()
export class RoleConfigValidator {

    constructor(
        @inject("IRoleConfigRepository") private readonly roleConfigRepository: IRoleConfigRepository,
        @inject("IRoleRepository") private readonly roleRepository: IRoleRepository
    ) { }

    static validateRoleConfigExists(roleConfig: RoleConfigDocument): void {

        if (!roleConfig) throw new RoleConfigNotFoundError();
    }

    static validateRoleConfigName(roleConfig: RoleConfigDocument): void {

        if (!roleConfig) throw new RoleConfigNotFoundByNameError();
    }

    static validateFilterRole(filter: FilterOptions<RoleConfigFilterKeys>): void {

        const resultSchema = RoleConfigFilterSchema.safeParse(filter);

        if (!resultSchema.success) {

            const errors = resultSchema.error.errors.map(e => `${e.path[0]}: ${e.message}`);
            console.log(errors);
            throw new FilterRoleConfigError(`Filtro inválido:\n- ${errors.join('\n- ')}`);
        }
    }

    static validateRoleConfigsFound(RoleConfigs : RoleConfigDocument[]) : void{

        if(RoleConfigs.length < 1) throw new RoleConfigsNotFoundByFilterError();
    }

    static validateRoleConfigAlreadyActive(isActive : boolean) : void {

        if(isActive) throw new RoleConfigAlreadyActiveError();
    }

    static validateRoleConfigAlreadyInactive(isActive : boolean) : void {

        if(!isActive) throw new RoleConfigAlreadyInactiveError();
    }

    static validateMaxLoginAttemptsMajorEqualTwo(maxLoginAttempts : number) : void {
        
        if(maxLoginAttempts <= 1) throw new RolConfigMaxLoginAttemptsNotValidError();
    }

    async validateUniquenessRoleConfig(rolName : string) : Promise<void> {

        const role = await this.roleConfigRepository.findConfigRoleByNameRole(rolName);

        if(role) throw new RoleConfigAlreadyExistsError();
    }

    async validateRoleExists(rolId: ObjectIdParam) : Promise<void> {

        console.log(rolId);
        

        const role = await this.roleRepository.findRoleById(rolId);

        if(!role) throw new RoleConfigRoleNotExistsError();
    }
}