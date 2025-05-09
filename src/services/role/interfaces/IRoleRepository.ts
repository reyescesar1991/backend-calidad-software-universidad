import { ClientSession } from "mongoose";
import { FilterOptions, RoleFilterKeys } from "../../../core/types";
import { RoleDocument } from "../../../db/models";
import { ObjectIdParam, RoleDto, UpdateRoleDto } from "../../../validations";
import { PermissionDocument } from "../../../db/models/permissionsModels/permission.model";


export interface IRoleRepository{

    findRoleById(idRole : ObjectIdParam) : Promise<RoleDocument | null>;
    findRoleByCustomId(customIdRole : string) : Promise<RoleDocument | null>;
    searchRolesByFilters(filter : FilterOptions<RoleFilterKeys>) : Promise<RoleDocument[] | null>;
    listRoles() : Promise<RoleDocument[] | null>;
    createRole(dataRole : RoleDto, session ?: ClientSession) : Promise<RoleDocument | null>;
    updateRole(idRole: ObjectIdParam, dataRole : UpdateRoleDto, session ?: ClientSession) : Promise<RoleDocument | null>;
    deleteRole(idRole: ObjectIdParam, session ?: ClientSession) : Promise<RoleDocument | null>;
    activateRole(idRole : ObjectIdParam, session ?: ClientSession) : Promise<RoleDocument | null>;
    setDefaultRoleSystem(idRole: ObjectIdParam, session ?: ClientSession) : Promise<RoleDocument | null>;
    unsetAllDefaultRoles(session?: ClientSession): Promise<void>;
    getPermissionsRole(customIdRole : string) : Promise<PermissionDocument[] | null>;
}

export interface IRolePermissionRepository{

    addPermissionRole(idRoleParam : string, permission : PermissionDocument, session ?: ClientSession) : Promise<RoleDocument | null>;
    deletePermissionRole(idRoleParam : string, permission : PermissionDocument, session ?: ClientSession) : Promise<RoleDocument | null>;
}

export interface IRolePermissionSecurityRepository{

    addPermissionSecurityRole(idRole : ObjectIdParam, idPermissionSecurity : string) : Promise<RoleDocument | null>;
    deletePermissionSecurityRole(idRole : ObjectIdParam, idPermissionSecurity : string) : Promise<RoleDocument | null>;
}