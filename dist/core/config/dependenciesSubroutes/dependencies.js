"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSubroutesDependencies = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const models_1 = require("../../../db/models");
const subrouteRepository_1 = require("../../../services/menu/repositories/subrouteRepository");
const Menu_service_1 = require("../../../services/menu/Menu.service");
const validators_1 = require("../../validators");
const transactionManager_1 = require("../../database/transactionManager");
const configureSubroutesDependencies = async () => {
    tsyringe_1.container.register("TransactionManager", transactionManager_1.TransactionManager);
    tsyringe_1.container.register("SubrouteModel", { useValue: models_1.SubrouteModel });
    tsyringe_1.container.register("ISubrouteRepository", { useClass: subrouteRepository_1.SubrouteRepository });
    tsyringe_1.container.register("MenuService", { useClass: Menu_service_1.MenuService });
    tsyringe_1.container.register("SubrouteValidator", {
        useClass: validators_1.SubrouteValidator
    });
};
exports.configureSubroutesDependencies = configureSubroutesDependencies;
//# sourceMappingURL=dependencies.js.map