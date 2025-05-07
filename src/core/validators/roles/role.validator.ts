import { inject, injectable } from "tsyringe";
import { IRoleRepository } from "../../../services/role/interfaces/IRoleRepository";
import { RoleDocument } from "../../../db/models";
import { FilterRoleError, RoleAlreadyExistsError, RoleNotFoundError, RolesNotFoundByFilterError, RolesNotFoundDatabaseError } from "../../exceptions";
import { FilterOptions, RoleFilterKeys } from "../../types";
import { ObjectIdParam, RoleFilterSchema } from "../../../validations";

@injectable()
export class RoleValidator{


    constructor(@inject("IRoleRepository") private readonly roleRepository : IRoleRepository){}

    static validateRoleExists(role : RoleDocument) : void {

        if(!role) throw new RoleNotFoundError();
    }

    static validateFilterRole(filter : FilterOptions<RoleFilterKeys>) : void {

        const resultSchema = RoleFilterSchema.safeParse(filter);

        if(!resultSchema.success){

            const errors = resultSchema.error.errors.map(e => `${e.path[0]}: ${e.message}`);
            console.log(errors);
            throw new FilterRoleError(`Filtro inválido:\n- ${errors.join('\n- ')}`);
        }
    }

    static validateFoundRoles(roles : RoleDocument[]) : void {

        if(roles.length === 0) throw new RolesNotFoundByFilterError();
    }

    static validateListRoles(roles : RoleDocument[]) : void {

        if(roles.length === 0) throw new RolesNotFoundDatabaseError();
    }

    async validateUniquenessRole(idRole : string) : Promise<void>{


        const exists = await this.roleRepository.findRoleByCustomId(idRole);

        if(exists) throw new RoleAlreadyExistsError();

    }

}