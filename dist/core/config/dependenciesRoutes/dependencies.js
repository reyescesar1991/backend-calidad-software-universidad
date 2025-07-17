"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureDependencies = void 0;
const tsyringe_1 = require("tsyringe");
const transactionManager_1 = require("../../database/transactionManager");
const models_1 = require("../../../db/models");
const routeRepository_1 = require("../../../services/menu/repositories/routeRepository");
const menu_1 = require("../../../services/menu");
const Menu_service_1 = require("../../../services/menu/Menu.service");
const validators_1 = require("../../validators");
const moduleRepository_1 = require("../../../services/menu/repositories/moduleRepository");
const configureDependencies = async () => {
    tsyringe_1.container.register("TransactionManager", transactionManager_1.TransactionManager);
    tsyringe_1.container.register("SubrouteModel", { useValue: models_1.SubrouteModel });
    tsyringe_1.container.register("ISubrouteRepository", { useClass: menu_1.SubrouteRepository });
    tsyringe_1.container.register("MenuService", { useClass: Menu_service_1.MenuService });
    tsyringe_1.container.register("SubrouteValidator", {
        useClass: validators_1.SubrouteValidator
    });
    tsyringe_1.container.register("TransactionManager", transactionManager_1.TransactionManager);
    tsyringe_1.container.register("RouteModel", { useValue: models_1.RouteModel });
    tsyringe_1.container.register("ModuleModel", { useValue: models_1.ModuleModel });
    tsyringe_1.container.register("IRouteRepository", { useClass: routeRepository_1.RouteRepository });
    tsyringe_1.container.register("IModuleRepository", { useClass: moduleRepository_1.ModuleRepositoryImpl });
    tsyringe_1.container.register("MenuService", { useClass: Menu_service_1.MenuService });
    tsyringe_1.container.register("RouteValidator", { useClass: validators_1.RouteValidator });
    tsyringe_1.container.register("ModuleValidator", { useClass: validators_1.ModuleValidator });
    console.log("🔧 Dependencias configuradas con conexión activa");
};
exports.configureDependencies = configureDependencies;
//# sourceMappingURL=dependencies.js.map