"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSessionManagementDependencies = void 0;
const tsyringe_1 = require("tsyringe");
const transactionManager_1 = require("../../database/transactionManager");
const sessionManagement_model_1 = require("../../../db/models/oauthModels/sessionManagement.model");
const oauthService_1 = require("../../../services/oauthService");
const validators_1 = require("../../validators");
const configureSessionManagementDependencies = async () => {
    tsyringe_1.container.register("TransactionManager", transactionManager_1.TransactionManager);
    tsyringe_1.container.register("SessionManagementModel", { useValue: sessionManagement_model_1.SessionManagementModel });
    tsyringe_1.container.register("SessionManagementValidator", { useClass: validators_1.SessionManagementValidator });
    tsyringe_1.container.register("ISessionManagementRepository", { useClass: oauthService_1.SessionManagementRepositoryImpl });
    tsyringe_1.container.register("SessionManagamentService", { useClass: oauthService_1.SessionManagamentService });
};
exports.configureSessionManagementDependencies = configureSessionManagementDependencies;
//# sourceMappingURL=dependencies.js.map