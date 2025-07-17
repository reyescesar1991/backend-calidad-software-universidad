"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePermissionsDependencies = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const models_1 = require("../../../db/models");
const permission_1 = require("../../../services/permission");
const permissionRepository_1 = require("../../../services/permission/repositories/permissionRepository");
const validators_1 = require("../../validators");
const configurePermissionsDependencies = async () => {
    tsyringe_1.container.register("PermissionModel", { useValue: models_1.PermissionModel });
    // Registra el repositorio bajo la clave "IPermissionRepository"
    tsyringe_1.container.register("IPermissionRepository", {
        useClass: permissionRepository_1.PermissionRepository
    });
    tsyringe_1.container.register("PermissionService", { useClass: permission_1.PermissionService });
    tsyringe_1.container.register("PermissionValidator", { useClass: validators_1.PermissionValidator });
};
exports.configurePermissionsDependencies = configurePermissionsDependencies;
//# sourceMappingURL=dependencies.js.map