"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureDependenciesHeadquarters = void 0;
const tsyringe_1 = require("tsyringe");
const transactionManager_1 = require("../../database/transactionManager");
const models_1 = require("../../../db/models");
const headquarterRepository_1 = require("../../../services/locationService/repositories/headquarterRepository");
const validators_1 = require("../../validators");
const Location_service_1 = require("../../../services/locationService/Location.service");
const configureDependenciesHeadquarters = async () => {
    tsyringe_1.container.register("TransactionManager", transactionManager_1.TransactionManager);
    tsyringe_1.container.register("HeadquartersModel", { useValue: models_1.HeadquartersModel });
    tsyringe_1.container.register("IHeadquarterRepository", { useClass: headquarterRepository_1.IHeadquarterRepositoryImpl });
    // container.register<IRolePermissionRepository>("IRolePermissionRepository", {useClass : RolePermissionRepositoryImpl});
    // container.register<IRolePermissionSecurityRepository>("IRolePermissionSecurityRepository", {useClass : RolePermissionSecurityImpl});
    tsyringe_1.container.register("LocationService", { useClass: Location_service_1.LocationService });
    //validators
    tsyringe_1.container.register("HeadquarterValidator", { useClass: validators_1.HeadquarterValidator });
};
exports.configureDependenciesHeadquarters = configureDependenciesHeadquarters;
//# sourceMappingURL=dependencies.js.map