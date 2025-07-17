"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSuppliersDependencies = void 0;
const tsyringe_1 = require("tsyringe");
const transactionManager_1 = require("../../database/transactionManager");
const models_1 = require("../../../db/models");
const supplierService_1 = require("../../../services/supplierService");
const validators_1 = require("../../validators");
const configureSuppliersDependencies = async () => {
    tsyringe_1.container.register("TransactionManager", transactionManager_1.TransactionManager);
    tsyringe_1.container.register("SupplierModel", { useValue: models_1.SupplierModel });
    tsyringe_1.container.register("ISupplierRepository", { useClass: supplierService_1.SupplierRepositoryImpl });
    tsyringe_1.container.register("SupplierValidator", { useClass: validators_1.SupplierValidator });
};
exports.configureSuppliersDependencies = configureSuppliersDependencies;
//# sourceMappingURL=dependencies.js.map