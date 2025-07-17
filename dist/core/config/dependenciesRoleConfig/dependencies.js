"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureDependenciesRoleConfig = void 0;
const tsyringe_1 = require("tsyringe");
const transactionManager_1 = require("../../database/transactionManager");
const models_1 = require("../../../db/models");
const roleConfig_1 = require("../../../services/roleConfig");
const validators_1 = require("../../validators");
const roleConfig_service_1 = require("../../../services/roleConfig/roleConfig.service");
const configureDependenciesRoleConfig = async () => {
    tsyringe_1.container.register("TransactionManager", transactionManager_1.TransactionManager);
    tsyringe_1.container.register("RoleConfigModel", { useValue: models_1.RoleConfigModel });
    tsyringe_1.container.register("IRoleConfigRepository", { useClass: roleConfig_1.RoleConfigRepositoryImpl });
    tsyringe_1.container.register("RoleConfigValidator", { useClass: validators_1.RoleConfigValidator });
    tsyringe_1.container.register("RoleConfigService", { useClass: roleConfig_service_1.RoleConfigService });
};
exports.configureDependenciesRoleConfig = configureDependenciesRoleConfig;
//# sourceMappingURL=dependencies.js.map