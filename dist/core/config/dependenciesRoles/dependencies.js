"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureDependenciesRoles = void 0;
const tsyringe_1 = require("tsyringe");
const models_1 = require("../../../db/models");
const transactionManager_1 = require("../../database/transactionManager");
const roleRepository_1 = require("../../../services/role/repositories/roleRepository");
const rolePermissionRepository_1 = require("../../../services/role/repositories/rolePermissionRepository");
const rolePermissionSecurityRepository_1 = require("../../../services/role/repositories/rolePermissionSecurityRepository");
const validators_1 = require("../../validators");
const Role_service_1 = require("../../../services/role/Role.service");
const configureDependenciesRoles = async () => {
    tsyringe_1.container.register("TransactionManager", transactionManager_1.TransactionManager);
    tsyringe_1.container.register("RoleModel", { useValue: models_1.RoleModel });
    tsyringe_1.container.register("IRoleRepository", { useClass: roleRepository_1.RoleRepositoryImpl });
    tsyringe_1.container.register("IRolePermissionRepository", { useClass: rolePermissionRepository_1.RolePermissionRepositoryImpl });
    tsyringe_1.container.register("IRolePermissionSecurityRepository", { useClass: rolePermissionSecurityRepository_1.RolePermissionSecurityImpl });
    tsyringe_1.container.register("RoleService", { useClass: Role_service_1.RoleService });
    //validator roles
    tsyringe_1.container.register("RoleValidator", { useClass: validators_1.RoleValidator });
};
exports.configureDependenciesRoles = configureDependenciesRoles;
//# sourceMappingURL=dependencies.js.map