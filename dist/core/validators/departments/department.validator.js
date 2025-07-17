"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../exceptions");
const validations_1 = require("../../../validations");
let DepartmentValidator = class DepartmentValidator {
    departmentRepository;
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    static validateDepartmentExists(department) {
        if (!department)
            throw new exceptions_1.DepartmentNotFoundError();
    }
    static validateDepartmentsExistsByHeadquarter(departments) {
        if (departments.length < 1)
            throw new exceptions_1.DepartmentsNotFoundByHeadquarterError();
    }
    static validateDepartmentsExistsByFilter(departments) {
        if (departments.length < 1)
            throw new exceptions_1.DepartmentsNotFoundByFilterError();
    }
    static validateDepartmentsExistsByList(departments) {
        if (departments.length < 1)
            throw new exceptions_1.DepartmentsNotFoundByDataBaseError();
    }
    static validateDepartmentsAlreadyActivate(department) {
        if (department.isActive)
            throw new exceptions_1.DepartmentIsAlreadyActiveError();
    }
    static validateDepartmentsAlreadyInactivate(department) {
        if (!department.isActive)
            throw new exceptions_1.DepartmentIsAlreadyInactiveError();
    }
    static validateFilterOptionsHeadquarter(filter) {
        const resultSchema = validations_1.DepartmentFilterSchema.safeParse(filter);
        if (!resultSchema.success) {
            const errors = resultSchema.error.errors.map(e => `${e.path[0]}: ${e.message}`);
            console.log(errors);
            throw new exceptions_1.FilterDepartmentError(`Filtro inválido:\n- ${errors.join('\n- ')}`);
        }
    }
    async validateExistsDepartment(idDepartment) {
        const department = await this.departmentRepository.findDepartmentById(idDepartment);
        if (!department)
            throw new exceptions_1.DepartmentNotFoundError();
    }
    async validateUniquenessDepartment(idDepartment) {
        const department = await this.departmentRepository.findDepartmentByCustomId(idDepartment);
        if (department)
            throw new exceptions_1.DepartmentAlreadyExistsError();
    }
    async validateUniqueKeysDepartment(filter) {
        const department = await this.departmentRepository.searchDepartmentByFilterWithOr(filter);
        console.log(department);
        if (department.length > 1)
            throw new exceptions_1.DepartmentUniqueKeysError();
    }
};
exports.DepartmentValidator = DepartmentValidator;
exports.DepartmentValidator = DepartmentValidator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IDepartmentRepository")),
    __metadata("design:paramtypes", [Object])
], DepartmentValidator);
//# sourceMappingURL=department.validator.js.map