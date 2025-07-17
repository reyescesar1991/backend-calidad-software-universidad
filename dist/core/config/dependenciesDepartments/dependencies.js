"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureDependenciesDepartments = void 0;
const tsyringe_1 = require("tsyringe");
const transactionManager_1 = require("../../database/transactionManager");
const models_1 = require("../../../db/models");
const locationService_1 = require("../../../services/locationService");
const department_validator_1 = require("../../validators/departments/department.validator");
const configureDependenciesDepartments = async () => {
    tsyringe_1.container.register("TransactionManager", transactionManager_1.TransactionManager);
    tsyringe_1.container.register("DepartmentModel", { useValue: models_1.DepartmentModel });
    tsyringe_1.container.register("IDepartmentRepository", { useClass: locationService_1.IDepartmentRepositoryImpl });
    tsyringe_1.container.register("DepartmentValidator", { useClass: department_validator_1.DepartmentValidator });
};
exports.configureDependenciesDepartments = configureDependenciesDepartments;
//# sourceMappingURL=dependencies.js.map