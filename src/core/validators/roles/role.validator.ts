import { inject, injectable } from "tsyringe";
import { IRoleRepository } from "../../../services/role/interfaces/IRoleRepository";
import { RoleDocument } from "../../../db/models";
import { FilterRoleError, IdRoleAlreadyExistsError, RoleAlreadyActiveError, RoleAlreadyExistsError, RoleAlreadyInactiveError, RoleIdLockError, RoleIsNotActiveError, RoleNotFoundError, RoleNotValidDefaultSystemError, RolesNotFoundByFilterError, RolesNotFoundDatabaseError, RolNotHavePermissionsError, RolPermissionAlreadyAvailableError, RolPermissionNotAvailableError } from "../../exceptions";
import { FilterOptions, RoleFilterKeys } from "../../types";
import { ObjectIdParam, RoleFilterSchema } from "../../../validations";
import { ROLS_DEFAULT, ROLS_NOT_VALID_DEFAULT, VALID_PERMISSIONS } from "../../const";
import { ObjectId, Types } from "mongoose";
import { PermissionDocument } from "../../../db/models/permissionsModels/permission.model";

@injectable()
export class RoleValidator {


    constructor(@inject("IRoleRepository") private readonly roleRepository: IRoleRepository) { }

    static validateRoleExists(role: RoleDocument): void {

        if (!role) throw new RoleNotFoundError();
    }

    static validateFilterRole(filter: FilterOptions<RoleFilterKeys>): void {

        const resultSchema = RoleFilterSchema.safeParse(filter);

        if (!resultSchema.success) {

            const errors = resultSchema.error.errors.map(e => `${e.path[0]}: ${e.message}`);
            console.log(errors);
            throw new FilterRoleError(`Filtro inválido:\n- ${errors.join('\n- ')}`);
        }
    }

    static validateFoundRoles(roles: RoleDocument[]): void {

        if (roles.length === 0) throw new RolesNotFoundByFilterError();
    }

    static validateListRoles(roles: RoleDocument[]): void {

        if (roles.length === 0) throw new RolesNotFoundDatabaseError();
    }

    static validateRoleAlreadyInactive(active: boolean): void {

        if (!active) throw new RoleAlreadyInactiveError();
    }

    static validateRoleAlreadyActive(active: boolean): void {

        if (active) throw new RoleAlreadyActiveError();
    }

    static validateStatusRol(active : boolean) : void {

        if(!active) throw new RoleIsNotActiveError();
    }

    static validateIdRoleNotChange(idRol: string): void {

        if (ROLS_DEFAULT.includes(idRol)) throw new RoleIdLockError();
    }

    static validateRoleCanBeDefault(roleId: string): void {
        if (ROLS_NOT_VALID_DEFAULT.includes(roleId)) {
            throw new RoleNotValidDefaultSystemError();
        }
    }

    static validateRolValidsPermission(idRole: string, permissionKey: string) {

        // 1. Acceder al array de permisos para el idRole dado.
        // Si el idRole no existe como clave en VALID_PERMISSIONS, esto devolverá 'undefined'.
        const permissionsForRole = VALID_PERMISSIONS[idRole];

        // 2. Verificar si el array de permisos existe (es decir, si el idRole es válido).
        // Si no existe (es undefined) o no es un array (aunque por la definición Record<string, string[]> siempre debería serlo si existe),
        // significa que el permiso no es válido para ese rol (porque el rol no existe o no tiene permisos definidos así).
        if (!permissionsForRole || !Array.isArray(permissionsForRole)) {

            throw new RolNotHavePermissionsError();
        }

        if (!permissionsForRole.includes(permissionKey)) {

            throw new RolPermissionNotAvailableError();
        }

        // 3. Verificar si el permissionKey está incluido en el array de permisos para ese rol.
        return permissionsForRole.includes(permissionKey);
    }

    static validateRolAlreadyPermissionActive(permissions : PermissionDocument[], permissionAdd : PermissionDocument) : void {

        const existsPermission = permissions.some((permission) => {
            
            return permission.permission === permissionAdd.permission;
        })

        if(existsPermission) throw new RolPermissionAlreadyAvailableError();
    }


    async validateUniquenessRole(idRole: string): Promise<void> {


        const exists = await this.roleRepository.findRoleByCustomId(idRole);

        if (exists) throw new RoleAlreadyExistsError();

    }

    async validateUniquenessIdRole(idRole: string): Promise<void> {


        const exists = await this.roleRepository.findRoleByCustomId(idRole);

        if (exists) throw new IdRoleAlreadyExistsError();

    }


}