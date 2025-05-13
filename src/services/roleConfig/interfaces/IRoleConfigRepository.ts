import { RoleConfigDocument } from "../../../db/models/roleModels/roleConfig.model";
import { ObjectIdParam, RoleConfigDto, UpdateRoleConfigDto } from "../../../validations";


export interface IRoleConfigRepository{

    findConfigRoleById(idConfigRole : ObjectIdParam) :  Promise<RoleConfigDocument | null>;
    findConfigRoleByNameRole(nameRole : string) :  Promise<RoleConfigDocument | null>;
    activateConfigRole(idConfigRole : ObjectIdParam) : Promise<RoleConfigDocument | null>;
    deleteConfigRole(idConfigRole : ObjectIdParam) : Promise<RoleConfigDocument | null>;
    createConfigRole(dataConfigRole : RoleConfigDto) : Promise<RoleConfigDocument | null>;
    updateConfigRole(idConfigRole : ObjectIdParam, dataConfigRoleUpdate : UpdateRoleConfigDto) : Promise<RoleConfigDocument | null>;
    
}