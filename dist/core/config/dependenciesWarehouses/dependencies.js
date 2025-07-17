"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureWarehouseDependencies = void 0;
const tsyringe_1 = require("tsyringe");
const transactionManager_1 = require("../../database/transactionManager");
const models_1 = require("../../../db/models");
const locationService_1 = require("../../../services/locationService");
const validators_1 = require("../../validators");
const configureWarehouseDependencies = async () => {
    tsyringe_1.container.register("TransactionManager", transactionManager_1.TransactionManager);
    tsyringe_1.container.register("WarehouseModel", { useValue: models_1.WarehouseModel });
    tsyringe_1.container.register("IWarehouseRepository", { useClass: locationService_1.WarehouseRepositoryImpl });
    tsyringe_1.container.register("WarehouseValidator", { useClass: validators_1.WarehouseValidator });
};
exports.configureWarehouseDependencies = configureWarehouseDependencies;
//# sourceMappingURL=dependencies.js.map