"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureDependenciesTwoFactorUser = void 0;
const tsyringe_1 = require("tsyringe");
const models_1 = require("../../../db/models");
const transactionManager_1 = require("../../database/transactionManager");
const oauthService_1 = require("../../../services/oauthService");
const validators_1 = require("../../validators");
const configureDependenciesTwoFactorUser = async () => {
    tsyringe_1.container.register("TransactionManager", transactionManager_1.TransactionManager);
    tsyringe_1.container.register("TwoFactorAuthModel", { useValue: models_1.TwoFactorAuthModel });
    tsyringe_1.container.register("ITwoFactorDataRepository", { useClass: oauthService_1.TwoFactorDataRepositoryImpl });
    tsyringe_1.container.register("TwoFactorDataValidator", { useClass: validators_1.TwoFactorDataValidator });
    tsyringe_1.container.register("TwoFactorService", { useClass: oauthService_1.TwoFactorService });
};
exports.configureDependenciesTwoFactorUser = configureDependenciesTwoFactorUser;
//# sourceMappingURL=dependencies.js.map