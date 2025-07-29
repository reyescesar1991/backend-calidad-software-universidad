import { ClientSession } from "mongoose";
import { ConfigRoleResponse, FilterOptions, RoleConfigFilterKeys } from "../../../core/types";
import { RoleConfigDocument } from "../../../db/models/roleModels/roleConfig.model";
import { ObjectIdParam, RoleConfigDto, UpdateRoleConfigDto } from "../../../validations";
import { RoleDocument } from "../../../db/models";


export interface IRoleConfigRepository{

    findConfigRoleById(idConfigRole : ObjectIdParam) :  Promise<RoleConfigDocument | null>;
    findConfigRoleByNameRole(nameRole : string) :  Promise<RoleConfigDocument | null>;
    searchConfigRoleByFilter(filter : FilterOptions<RoleConfigFilterKeys>) : Promise<RoleConfigDocument[] | null>;
    activateConfigRole(idConfigRole : ObjectIdParam, session?: ClientSession) : Promise<RoleConfigDocument | null>;
    deleteConfigRole(idConfigRole : ObjectIdParam, session?: ClientSession) : Promise<RoleConfigDocument | null>;
    createConfigRole(dataConfigRole : RoleConfigDto, session?: ClientSession) : Promise<RoleConfigDocument | null>;
    updateConfigRole(idConfigRole : ObjectIdParam, dataConfigRoleUpdate : UpdateRoleConfigDto, session?: ClientSession) : Promise<RoleConfigDocument | null>;
    findRoleConfigWithRole(
        roleConfigId: ObjectIdParam
      ): Promise<RoleDocument | null>;
    findRolesByConfigRoles(): Promise<ConfigRoleResponse[]>;
}