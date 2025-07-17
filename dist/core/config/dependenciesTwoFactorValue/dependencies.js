"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureDependenciesTwoFactorValueUser = void 0;
const tsyringe_1 = require("tsyringe");
const models_1 = require("../../../db/models");
const transactionManager_1 = require("../../database/transactionManager");
const oauthService_1 = require("../../../services/oauthService");
const twoFactorValueRepository_1 = require("../../../services/oauthService/repositories/twoFactorValueRepository");
const configureDependenciesTwoFactorValueUser = async () => {
    tsyringe_1.container.register("TransactionManager", transactionManager_1.TransactionManager);
    tsyringe_1.container.register("TwoFactorUserValueModel", { useValue: models_1.TwoFactorUserValueModel });
    tsyringe_1.container.register("ITwoFactorValueRepository", { useClass: twoFactorValueRepository_1.TwoFactorValueRepositoryImpl });
    tsyringe_1.container.register("TwoFactorUserService", { useClass: oauthService_1.TwoFactorUserService });
};
exports.configureDependenciesTwoFactorValueUser = configureDependenciesTwoFactorValueUser;
//# sourceMappingURL=dependencies.js.map