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
exports.RoleService = void 0;
const tsyringe_1 = require("tsyringe");
const validators_1 = require("../../core/validators");
const exceptions_1 = require("../../core/exceptions");
const transactionManager_1 = require("../../core/database/transactionManager");
let RoleService = class RoleService {
    roleRepository;
    roleValidator;
    transactionManager;
    permissionRepository;
    permissionSecurityRepository;
    rolePermissionRepository;
    permissionValidator;
    rolePermissionSecurityRepository;
    constructor(roleRepository, roleValidator, transactionManager, permissionRepository, permissionSecurityRepository, rolePermissionRepository, permissionValidator, rolePermissionSecurityRepository) {
        this.roleRepository = roleRepository;
        this.roleValidator = roleValidator;
        this.transactionManager = transactionManager;
        this.permissionRepository = permissionRepository;
        this.permissionSecurityRepository = permissionSecurityRepository;
        this.rolePermissionRepository = rolePermissionRepository;
        this.permissionValidator = permissionValidator;
        this.rolePermissionSecurityRepository = rolePermissionSecurityRepository;
    }
    async findRoleById(idRole) {
        try {
            const role = await this.roleRepository.findRoleById(idRole);
            validators_1.RoleValidator.validateRoleExists(role);
            return role;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findRoleByCustomId(customIdRole) {
        try {
            const role = await this.roleRepository.findRoleByCustomId(customIdRole);
            validators_1.RoleValidator.validateRoleExists(role);
            return role;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async searchRolesByFilters(filter) {
        try {
            validators_1.RoleValidator.validateFilterRole(filter);
            const roles = await this.roleRepository.searchRolesByFilters(filter);
            validators_1.RoleValidator.validateFoundRoles(roles);
            return roles;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async listRoles() {
        try {
            const roles = await this.roleRepository.listRoles();
            validators_1.RoleValidator.validateListRoles(roles);
            return roles;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async createRole(dataRole) {
        return this.transactionManager.executeTransaction(async (session) => {
            try {
                await this.roleValidator.validateUniquenessRole(dataRole.idRole);
                if (dataRole.isDefault && dataRole.idRole != '01')
                    throw new exceptions_1.RoleNotValidDefaultSystemError();
                if (dataRole.managePermissions && dataRole.idRole != '04')
                    throw new exceptions_1.RoleNotAdminManagePermissionError();
                const role = await this.roleRepository.createRole(dataRole, session);
                return role;
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async updateRole(idRole, dataRole) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const role = await this.roleRepository.findRoleById(idRole);
                validators_1.RoleValidator.validateRoleExists(role);
                validators_1.RoleValidator.validateIdRoleNotChange(role.idRole);
                if (dataRole.idRole)
                    await this.roleValidator.validateUniquenessIdRole(dataRole.idRole);
                return await this.roleRepository.updateRole(idRole, dataRole, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async deleteRole(idRole) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const role = await this.roleRepository.findRoleById(idRole);
                validators_1.RoleValidator.validateRoleExists(role);
                validators_1.RoleValidator.validateRoleAlreadyInactive(role.isActive);
                return await this.roleRepository.deleteRole(idRole, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async activateRole(idRole) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const role = await this.roleRepository.findRoleById(idRole);
                validators_1.RoleValidator.validateRoleExists(role);
                validators_1.RoleValidator.validateRoleAlreadyActive(role.isActive);
                return await this.roleRepository.activateRole(idRole, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async setDefaultRoleSystem(idRole) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const role = await this.roleRepository.findRoleById(idRole);
                validators_1.RoleValidator.validateRoleExists(role);
                await this.roleRepository.unsetAllDefaultRoles(session);
                validators_1.RoleValidator.validateRoleCanBeDefault(role.idRole);
                return await this.roleRepository.setDefaultRoleSystem(idRole, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async addPermissionRole(idRoleParam, idPermission) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const role = await this.roleRepository.findRoleByCustomId(idRoleParam);
                validators_1.RoleValidator.validateStatusRol(role.isActive);
                validators_1.RoleValidator.validateRoleExists(role);
                const permission = await this.permissionRepository.findPermissionByKey(idPermission);
                validators_1.PermissionValidator.validateExistsPermission(permission);
                validators_1.RoleValidator.validateRolValidsPermission(idRoleParam, permission.permission);
                const permissionsUser = await this.roleRepository.getPermissionsRole(role.idRole);
                validators_1.RoleValidator.validateRolAlreadyPermissionActive(permissionsUser, permission);
                return await this.rolePermissionRepository.addPermissionRole(idRoleParam, permission, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async deletePermissionRole(idRoleParam, idPermission) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const role = await this.roleRepository.findRoleByCustomId(idRoleParam);
                //Validamos que el rol exista
                validators_1.RoleValidator.validateRoleExists(role);
                //Validamos que el rol este activo
                validators_1.RoleValidator.validateStatusRol(role.isActive);
                const permission = await this.permissionRepository.findPermissionByKey(idPermission);
                //Validamos que exista el permiso
                validators_1.PermissionValidator.validateExistsPermission(permission);
                //Validamos que el permiso este presente en el rol
                await this.roleValidator.validatePermissionBeforeDelete(idRoleParam, idPermission);
                //Eliminamos el permiso del rol
                return await this.rolePermissionRepository.deletePermissionRole(idRoleParam, permission, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async addPermissionSecurityRole(idRoleParam, idPermissionSecurity) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const role = await this.roleRepository.findRoleByCustomId(idRoleParam);
                //Validamos que el rol exista
                validators_1.RoleValidator.validateRoleExists(role);
                //Validamos que el rol este activo
                validators_1.RoleValidator.validateStatusRol(role.isActive);
                //Obtenemos el permiso de seguridad
                const permissionSecurity = await this.permissionSecurityRepository.findPermissionSecurityByCustomId(idPermissionSecurity);
                //Verificamos que exista el permiso
                validators_1.PermissionSecurityValidator.validateFoundPermissionSecurity(permissionSecurity);
                //Verificamos que el usuario pueda adquirir ese permiso de seguridad
                validators_1.RoleValidator.validateRolValidsPermissionSecurity(idRoleParam, permissionSecurity.id);
                //obtenemos todos los permisos del usuario actual
                const permissionsSecurityUser = await this.roleRepository.getPermissionsSecurityRole(role.idRole);
                //Validamos que el permiso este presente en el rol para no replicar
                await this.roleValidator.validateRolAlreadyPermissionSecurityActive(permissionsSecurityUser, permissionSecurity);
                return this.rolePermissionSecurityRepository.addPermissionSecurityRole(idRoleParam, permissionSecurity, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async deletePermissionSecurityRole(idRoleParam, idPermissionSecurity) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const role = await this.roleRepository.findRoleByCustomId(idRoleParam);
                //Validamos que el rol exista
                validators_1.RoleValidator.validateRoleExists(role);
                //Validamos que el rol este activo
                validators_1.RoleValidator.validateStatusRol(role.isActive);
                //Obtenemos el permiso de seguridad
                const permissionSecurity = await this.permissionSecurityRepository.findPermissionSecurityByCustomId(idPermissionSecurity);
                //Verificamos que exista el permiso
                validators_1.PermissionSecurityValidator.validateFoundPermissionSecurity(permissionSecurity);
                //Validamos que el permiso este presente en el rol para no replicar
                await this.roleValidator.validatePermissionSecurityBeforeDelete(idRoleParam, idPermissionSecurity);
                return await this.rolePermissionSecurityRepository.deletePermissionSecurityRole(idRoleParam, permissionSecurity, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IRoleRepository")),
    __param(1, (0, tsyringe_1.inject)("RoleValidator")),
    __param(2, (0, tsyringe_1.inject)("TransactionManager")),
    __param(3, (0, tsyringe_1.inject)("IPermissionRepository")),
    __param(4, (0, tsyringe_1.inject)("IPermissionSecurityRepository")),
    __param(5, (0, tsyringe_1.inject)("IRolePermissionRepository")),
    __param(6, (0, tsyringe_1.inject)("PermissionValidator")),
    __param(7, (0, tsyringe_1.inject)("IRolePermissionSecurityRepository")),
    __metadata("design:paramtypes", [Object, validators_1.RoleValidator,
        transactionManager_1.TransactionManager, Object, Object, Object, validators_1.PermissionValidator, Object])
], RoleService);
//# sourceMappingURL=Role.service.js.map