"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureDependenciesModule = void 0;
const tsyringe_1 = require("tsyringe");
const connectDb_1 = require("../../utils/connectDb");
const transactionManager_1 = require("../../database/transactionManager");
const models_1 = require("../../../db/models");
const moduleRepository_1 = require("../../../services/menu/repositories/moduleRepository");
const Menu_service_1 = require("../../../services/menu/Menu.service");
const validators_1 = require("../../validators");
const configureDependenciesModule = async () => {
    await (0, connectDb_1.initializeTestEnvironment)();
    tsyringe_1.container.register("TransactionManager", transactionManager_1.TransactionManager);
    tsyringe_1.container.register("ModuleModel", { useValue: models_1.ModuleModel });
    tsyringe_1.container.register("IModuleRepository", { useClass: moduleRepository_1.ModuleRepositoryImpl });
    tsyringe_1.container.register("MenuService", { useClass: Menu_service_1.MenuService });
    tsyringe_1.container.register("ModuleValidator", { useClass: validators_1.ModuleValidator });
};
exports.configureDependenciesModule = configureDependenciesModule;
//# sourceMappingURL=dependencies.js.map