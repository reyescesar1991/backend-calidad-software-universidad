import { inject, injectable } from "tsyringe";
import { IRoleRepository } from "./interfaces/IRoleRepository";
import { RoleValidator } from "../../core/validators";
import { ObjectIdParam, RoleDto } from "../../validations";
import { RoleDocument } from "../../db/models";
import { handleError } from "../../core/exceptions";
import { FilterOptions, RoleFilterKeys } from "../../core/types";
import { TransactionManager } from "../../core/database/transactionManager";

@injectable()
export class RoleService {


    constructor(
        @inject("IRoleRepository") private readonly roleRepository : IRoleRepository,
        @inject("RoleValidator") private readonly roleValidator : RoleValidator,
        @inject("TransactionManager") private readonly transactionManager : TransactionManager,
    ){}

    async findRoleById(idRole: ObjectIdParam): Promise<RoleDocument | null> {
        
        try {

            const role = await this.roleRepository.findRoleById(idRole);

            RoleValidator.validateRoleExists(role);

            return role;
            
        } catch (error) {
            handleError(error);
        }
    }

    async findRoleByCustomId(customIdRole : string) : Promise<RoleDocument | null>{

        try {
            
            const role = await this.roleRepository.findRoleByCustomId(customIdRole);

            RoleValidator.validateRoleExists(role);

            return role;


        } catch (error) {
            
            handleError(error);
        }
    }

    async searchRolesByFilters(filter : FilterOptions<RoleFilterKeys>) : Promise<RoleDocument[] | null>{


        try {

            RoleValidator.validateFilterRole(filter);

            const roles = await this.roleRepository.searchRolesByFilters(filter);

            RoleValidator.validateFoundRoles(roles);

            return roles;
            
        } catch (error) {

            handleError(error);

        }
    }

    async listRoles() : Promise<RoleDocument[] | null>{

        try {

            const roles = await this.roleRepository.listRoles();

            RoleValidator.validateListRoles(roles);

            return roles;
            
        } catch (error) {

            handleError(error);

        }
    }

    async createRole(dataRole : RoleDto) : Promise<RoleDocument | null>{

        return this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    await this.roleValidator.validateUniquenessRole(dataRole.idRole);

                    const role = await this.roleRepository.createRole(dataRole, session);

                    if(dataRole.isDefault && dataRole.idRole != '01') throw new RoleNotValidDefaultSystemError();

                    if(dataRole.managePermissions && dataRole.idRole != '04') throw new RoleNotAdminManagePermissionError();

                    return role;
                    
                    
                } catch (error) {

                    handleError(error);   

                }
            }
        )
    }


    
}