"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../exceptions");
const validations_1 = require("../../../validations");
const const_1 = require("../../const");
let RoleValidator = class RoleValidator {
    roleRepository;
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    static validateRoleExists(role) {
        if (!role)
            throw new exceptions_1.RoleNotFoundError();
    }
    static validateFilterRole(filter) {
        const resultSchema = validations_1.RoleFilterSchema.safeParse(filter);
        if (!resultSchema.success) {
            const errors = resultSchema.error.errors.map(e => `${e.path[0]}: ${e.message}`);
            console.log(errors);
            throw new exceptions_1.FilterRoleError(`Filtro inválido:\n- ${errors.join('\n- ')}`);
        }
    }
    static validateFoundRoles(roles) {
        if (roles.length === 0)
            throw new exceptions_1.RolesNotFoundByFilterError();
    }
    static validateListRoles(roles) {
        if (roles.length === 0)
            throw new exceptions_1.RolesNotFoundDatabaseError();
    }
    static validateRoleAlreadyInactive(active) {
        if (!active)
            throw new exceptions_1.RoleAlreadyInactiveError();
    }
    static validateRoleAlreadyActive(active) {
        if (active)
            throw new exceptions_1.RoleAlreadyActiveError();
    }
    static validateStatusRol(active) {
        if (!active)
            throw new exceptions_1.RoleIsNotActiveError();
    }
    static validateIdRoleNotChange(idRol) {
        if (const_1.ROLS_DEFAULT.includes(idRol))
            throw new exceptions_1.RoleIdLockError();
    }
    static validateRoleCanBeDefault(roleId) {
        if (const_1.ROLS_NOT_VALID_DEFAULT.includes(roleId)) {
            throw new exceptions_1.RoleNotValidDefaultSystemError();
        }
    }
    static validateRolValidsPermission(idRole, permissionKey) {
        // 1. Acceder al array de permisos para el idRole dado.
        // Si el idRole no existe como clave en VALID_PERMISSIONS, esto devolverá 'undefined'.
        const permissionsForRole = const_1.VALID_PERMISSIONS[idRole];
        // 2. Verificar si el array de permisos existe (es decir, si el idRole es válido).
        // Si no existe (es undefined) o no es un array (aunque por la definición Record<string, string[]> siempre debería serlo si existe),
        // significa que el permiso no es válido para ese rol (porque el rol no existe o no tiene permisos definidos así).
        if (!permissionsForRole || !Array.isArray(permissionsForRole)) {
            throw new exceptions_1.RolNotHavePermissionsError();
        }
        if (!permissionsForRole.includes(permissionKey)) {
            throw new exceptions_1.RolPermissionNotAvailableError();
        }
        // 3. Verificar si el permissionKey está incluido en el array de permisos para ese rol.
        return permissionsForRole.includes(permissionKey);
    }
    static validateRolValidsPermissionSecurity(idRole, permissionSecurityKey) {
        const permissionsSecurityForRole = const_1.VALID_PERMISSIONS_SECURITY[idRole] || [];
        if (!permissionsSecurityForRole || !Array.isArray(permissionsSecurityForRole)) {
            throw new exceptions_1.RolNotHavePermissionsSecurityError();
        }
        if (!permissionsSecurityForRole.includes(permissionSecurityKey)) {
            throw new exceptions_1.RolPermissionSecurityNotAvailableError();
        }
        return permissionsSecurityForRole.includes(permissionSecurityKey);
    }
    static validateRolAlreadyPermissionActive(permissions, permissionAdd) {
        const existsPermission = permissions.some((permission) => {
            return permission.permission === permissionAdd.permission;
        });
        if (existsPermission)
            throw new exceptions_1.RolPermissionAlreadyAvailableError();
    }
    async validateUniquenessRole(idRole) {
        const exists = await this.roleRepository.findRoleByCustomId(idRole);
        if (exists)
            throw new exceptions_1.RoleAlreadyExistsError();
    }
    async validateUniquenessIdRole(idRole) {
        const exists = await this.roleRepository.findRoleByCustomId(idRole);
        if (exists)
            throw new exceptions_1.IdRoleAlreadyExistsError();
    }
    async validatePermissionBeforeDelete(idRole, idPermission) {
        const permissionsRole = await this.roleRepository.getPermissionsRole(idRole);
        if (permissionsRole.length === 0)
            throw new exceptions_1.RolesNotFoundDatabaseError("El usuario no tiene permisos disponibles");
        const exists = permissionsRole.some((permission) => {
            return permission.permission === idPermission;
        });
        if (!exists)
            throw new exceptions_1.PermissionNotFoundError("Permiso no encontrado en el usuario");
    }
    async validateRolAlreadyPermissionSecurityActive(permissionsSecurity, permissionSecurityAdd) {
        const existsPermission = permissionsSecurity.some((permission) => {
            return permission.permission === permissionSecurityAdd.permission;
        });
        if (existsPermission)
            throw new exceptions_1.RolPermissionSecurityAlreadyAvailableError();
    }
    async validatePermissionSecurityBeforeDelete(idRole, idPermissionSecurity) {
        const permissionsRole = await this.roleRepository.getPermissionsSecurityRole(idRole);
        if (permissionsRole.length === 0)
            throw new exceptions_1.RolNotHavePermissionSecurityError();
        const exists = permissionsRole.some((permission) => {
            return permission.id === idPermissionSecurity;
        });
        if (!exists)
            throw new exceptions_1.PermissionSecurityNotFoundError("Permiso no encontrado en el usuario");
    }
};
exports.RoleValidator = RoleValidator;
exports.RoleValidator = RoleValidator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IRoleRepository")),
    __metadata("design:paramtypes", [Object])
], RoleValidator);
//# sourceMappingURL=role.validator.js.map