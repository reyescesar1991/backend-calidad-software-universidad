"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePaymentTermsDependencies = void 0;
const tsyringe_1 = require("tsyringe");
const transactionManager_1 = require("../../database/transactionManager");
const models_1 = require("../../../db/models");
const generalDataService_1 = require("../../../services/generalDataService");
const validators_1 = require("../../validators");
const configurePaymentTermsDependencies = async () => {
    tsyringe_1.container.register("TransactionManager", transactionManager_1.TransactionManager);
    tsyringe_1.container.register("PaymentTermModel", { useValue: models_1.PaymentTermModel });
    tsyringe_1.container.register("IPaymentTermsRepository", { useClass: generalDataService_1.PaymentTermsRepositoryImpl });
    tsyringe_1.container.register("PaymentTermsValidator", { useClass: validators_1.PaymentTermsValidator });
};
exports.configurePaymentTermsDependencies = configurePaymentTermsDependencies;
//# sourceMappingURL=dependencies.js.map