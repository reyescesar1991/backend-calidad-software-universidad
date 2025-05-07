import { FilterOptions, RoleFilterKeys } from "../../../core/types";
import { RoleDocument } from "../../../db/models";
import { ObjectIdParam, RoleDto, UpdateRoleDto } from "../../../validations";


export interface IRoleRepository{

    findRoleById(idRole : ObjectIdParam) : Promise<RoleDocument | null>;
    findRoleByCustomId(customIdRole : string) : Promise<RoleDocument | null>;
    searchRolesByFilters(filter : FilterOptions<RoleFilterKeys>) : Promise<RoleDocument[] | null>;
    listRoles() : Promise<RoleDocument[] | null>;
    createRole(dataRole : RoleDto) : Promise<RoleDocument | null>;
    updateRole(idRole: ObjectIdParam, dataRole : UpdateRoleDto) : Promise<RoleDocument | null>;
    deleteRole(idRole: ObjectIdParam) : Promise<RoleDocument | null>;
    activateRole(idRole : ObjectIdParam) : Promise<RoleDocument | null>;
    setDefaultRoleSystem(idRole: ObjectIdParam) : Promise<RoleDocument | null>;
}

export interface IRolePermissionRepository{

    addPermissionRole(idRole : ObjectIdParam, idPermission : string) : Promise<RoleDocument | null>;
    deletePermissionRole(idRole : ObjectIdParam, idPermission : string) : Promise<RoleDocument | null>;
}

export interface IRolePermissionSecurityRepository{

    addPermissionSecurityRole(idRole : ObjectIdParam, idPermissionSecurity : string) : Promise<RoleDocument | null>;
    deletePermissionSecurityRole(idRole : ObjectIdParam, idPermissionSecurity : string) : Promise<RoleDocument | null>;
}