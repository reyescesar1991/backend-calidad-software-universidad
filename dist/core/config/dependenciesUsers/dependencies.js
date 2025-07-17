"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureUserDependencies = void 0;
const tsyringe_1 = require("tsyringe");
const transactionManager_1 = require("../../database/transactionManager");
const models_1 = require("../../../db/models");
const userService_1 = require("../../../services/userService");
const validators_1 = require("../../validators");
const user_service_1 = require("../../../services/userService/user.service");
const configureUserDependencies = async () => {
    tsyringe_1.container.register("TransactionManager", transactionManager_1.TransactionManager);
    tsyringe_1.container.register("UserModel", { useValue: models_1.UserModel });
    tsyringe_1.container.register("UserPermissionModel", { useValue: models_1.UserPermissionModel });
    tsyringe_1.container.register("UserPermissionSecurityModel", { useValue: models_1.UserPermissionSecurityModel });
    tsyringe_1.container.register("UserTwoFactorModel", { useValue: models_1.UserTwoFactorActiveModel });
    tsyringe_1.container.register("IUserRepository", { useClass: userService_1.UserRepositoryImpl });
    tsyringe_1.container.register("IUserPermissionRepository", { useClass: userService_1.UserPermissionRepositoryImpl });
    tsyringe_1.container.register("IUserPermissionSecurityRepository", { useClass: userService_1.UserPermissionSecurityRepositoryImpl });
    tsyringe_1.container.register("ITwoFactorUserRepository", { useClass: userService_1.TwoFactorUserActiveRepositoryImpl });
    tsyringe_1.container.register("UserService", { useClass: user_service_1.UserService });
    tsyringe_1.container.register("UserValidator", { useClass: validators_1.UserValidator });
};
exports.configureUserDependencies = configureUserDependencies;
//# sourceMappingURL=dependencies.js.map