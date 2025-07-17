"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSecurityPermissionsDependencies = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const models_1 = require("../../../db/models");
const permissionSecurity_1 = require("../../../services/permissionSecurity");
const validators_1 = require("../../validators");
const configureSecurityPermissionsDependencies = async () => {
    tsyringe_1.container.register("PermissionSecurityModel", { useValue: models_1.PermissionSecurityModel });
    tsyringe_1.container.register("IPermissionSecurityRepository", {
        useClass: permissionSecurity_1.PermissionSecurityRepository
    });
    tsyringe_1.container.register("PermissionSecurityService", { useClass: permissionSecurity_1.PermissionSecurityService });
    tsyringe_1.container.register("PermissionSecurityValidator", { useClass: validators_1.PermissionSecurityValidator });
};
exports.configureSecurityPermissionsDependencies = configureSecurityPermissionsDependencies;
//# sourceMappingURL=dependencies.js.map