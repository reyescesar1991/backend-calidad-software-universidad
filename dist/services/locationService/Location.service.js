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
exports.LocationService = void 0;
const tsyringe_1 = require("tsyringe");
const validators_1 = require("../../core/validators");
const exceptions_1 = require("../../core/exceptions");
const transactionManager_1 = require("../../core/database/transactionManager");
const transaccional_wrapper_1 = require("../../core/utils/transaccional-wrapper");
let LocationService = class LocationService {
    headquarterRepository;
    headquarterValidator;
    transactionManager;
    departmentRepository;
    departmentValidator;
    warehouseRepository;
    warehouseValidator;
    constructor(headquarterRepository, headquarterValidator, transactionManager, departmentRepository, departmentValidator, warehouseRepository, warehouseValidator) {
        this.headquarterRepository = headquarterRepository;
        this.headquarterValidator = headquarterValidator;
        this.transactionManager = transactionManager;
        this.departmentRepository = departmentRepository;
        this.departmentValidator = departmentValidator;
        this.warehouseRepository = warehouseRepository;
        this.warehouseValidator = warehouseValidator;
    }
    async findHeadquarterById(idHeadquarter) {
        try {
            const headquarter = await this.headquarterValidator.validateHeadquarterExists(idHeadquarter);
            return headquarter;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findHeadquarterByCustomId(customIdHeadquarter) {
        try {
            const headquarter = await this.headquarterValidator.validateHeadquarterExistsWithCustomId(customIdHeadquarter);
            return headquarter;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async searchHeadquarterByFilter(filter) {
        try {
            validators_1.HeadquarterValidator.validateFilterOptionsHeadquarter(filter);
            const headquarters = await this.headquarterValidator.validateHeadquartersByFilter(filter);
            return headquarters;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async listHeadquarter() {
        try {
            const headquarter = await this.headquarterValidator.validateHeadquartersList();
            return headquarter;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async activateHeadquarter(idHeadquarter) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                await this.headquarterValidator.validateHeadquarterExists(idHeadquarter);
                await this.headquarterValidator.validateHeadquarterIsAlreadyActive(idHeadquarter);
                return await this.headquarterRepository.activateHeadquarter(idHeadquarter, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async desactivateHeadquarter(idHeadquarter) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                await this.headquarterValidator.validateHeadquarterExists(idHeadquarter);
                await this.headquarterValidator.validateHeadquarterIsAlreadyDesactive(idHeadquarter);
                return await this.headquarterRepository.desactivateHeadquarter(idHeadquarter, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async createHeadquarter(dataHeadquarter) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                await this.headquarterValidator.validateHeadquarterUniqueness(dataHeadquarter.idHeadquarter);
                await this.headquarterValidator.validateHeadquarterUniqueKeys({
                    label: dataHeadquarter.label,
                    phoneNumber: dataHeadquarter.phoneNumber,
                    email: dataHeadquarter.email,
                });
                return await this.headquarterRepository.createHeadquarter(dataHeadquarter, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async updateHeadquarter(idHeadquarter, dataUpdateHeadquarter) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                await this.headquarterValidator.validateHeadquarterExists(idHeadquarter);
                await this.headquarterValidator.validateHeadquarterUniqueKeys({
                    label: dataUpdateHeadquarter.label,
                    phoneNumber: dataUpdateHeadquarter.phoneNumber,
                    email: dataUpdateHeadquarter.email,
                    name: dataUpdateHeadquarter.name,
                });
                const headquarter = await this.headquarterRepository.updateHeadquarter(idHeadquarter, dataUpdateHeadquarter, session);
                return headquarter;
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    //Departments
    async findDepartmentById(idDepartment) {
        try {
            const department = await this.departmentRepository.findDepartmentById(idDepartment);
            validators_1.DepartmentValidator.validateDepartmentExists(department);
            return department;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findDepartmentByCustomId(customIdDepartment) {
        try {
            const department = await this.departmentRepository.findDepartmentByCustomId(customIdDepartment);
            validators_1.DepartmentValidator.validateDepartmentExists(department);
            return department;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findDepartmentsByHeadquarter(idHeadquarter) {
        try {
            await this.headquarterValidator.validateHeadquarterExists(idHeadquarter);
            const departments = await this.departmentRepository.findDepartmentsByHeadquarter(idHeadquarter);
            validators_1.DepartmentValidator.validateDepartmentsExistsByHeadquarter(departments);
            return departments;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async searchDepartmentByFilter(filter) {
        try {
            validators_1.DepartmentValidator.validateFilterOptionsHeadquarter(filter);
            const departments = await this.departmentRepository.searchDepartmentByFilter(filter);
            validators_1.DepartmentValidator.validateDepartmentsExistsByFilter(departments);
            return departments;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async listDepartment() {
        try {
            const departments = await this.departmentRepository.listDepartment();
            validators_1.DepartmentValidator.validateDepartmentsExistsByList(departments);
            return departments;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async activateDepartment(idDepartment) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                await this.departmentValidator.validateExistsDepartment(idDepartment);
                const department = await this.departmentRepository.findDepartmentById(idDepartment);
                validators_1.DepartmentValidator.validateDepartmentsAlreadyActivate(department);
                return await this.departmentRepository.activateDepartment(idDepartment, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async desactivateDepartment(idDepartment) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                await this.departmentValidator.validateExistsDepartment(idDepartment);
                const department = await this.departmentRepository.findDepartmentById(idDepartment);
                validators_1.DepartmentValidator.validateDepartmentsAlreadyInactivate(department);
                return await this.departmentRepository.desactivateDepartment(idDepartment, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async createDepartment(dataDepartment) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                await this.departmentValidator.validateUniquenessDepartment(dataDepartment.idDepartment);
                await this.departmentValidator.validateUniqueKeysDepartment({
                    idDepartment: dataDepartment.idDepartment
                });
                //Validamos que la sucursal exista
                await this.headquarterValidator.validateHeadquarterExists(dataDepartment.headquartersId);
                return await this.departmentRepository.createDepartment(dataDepartment, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async updateDepartment(idDepartment, dataUpdateDepartment) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                await this.departmentValidator.validateExistsDepartment(idDepartment);
                return await this.departmentRepository.updateDepartment(idDepartment, dataUpdateDepartment, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async findWarehouseById(idWarehouse) {
        try {
            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);
            validators_1.WarehouseValidator.validateWarehouseExists(warehouse);
            return warehouse;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findWarehouseByCustomId(idWarehouse) {
        try {
            const warehouse = await this.warehouseRepository.findWarehouseByCustomId(idWarehouse);
            validators_1.WarehouseValidator.validateWarehouseExists(warehouse);
            return warehouse;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async createWarehouse(dataWarehouse, session) {
        try {
            await this.warehouseValidator.validateIdWarehouseUniqueness(dataWarehouse.idWarehouse);
            await this.findHeadquarterById(dataWarehouse.idHeadquarter);
            const warehouse = await this.warehouseRepository.createWarehouse(dataWarehouse, session);
            return warehouse;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async updateWarehouse(idWarehouse, dataUpdateWarehouse, session) {
        try {
            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);
            validators_1.WarehouseValidator.validateWarehouseExists(warehouse);
            const updatedWarehouse = await this.warehouseRepository.updateWarehouse(warehouse._id, dataUpdateWarehouse, session);
            return updatedWarehouse;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async inactivateWarehouse(idWarehouse, session) {
        try {
            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);
            validators_1.WarehouseValidator.validateWarehouseExists(warehouse);
            validators_1.WarehouseValidator.validateWarehouseIsAlreadyInactive(warehouse);
            return await this.warehouseRepository.inactivateWarehouse(idWarehouse, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async activateWarehouse(idWarehouse, session) {
        try {
            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);
            validators_1.WarehouseValidator.validateWarehouseExists(warehouse);
            validators_1.WarehouseValidator.validateWarehouseIsAlreadyActive(warehouse);
            return await this.warehouseRepository.activateWarehouse(idWarehouse, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findAllWarehouses() {
        try {
            return await this.warehouseRepository.findAllWarehouses();
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async getCapacityWarehouse(idWarehouse) {
        try {
            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);
            validators_1.WarehouseValidator.validateWarehouseExists(warehouse);
            return await this.warehouseRepository.getCapacityWarehouse(idWarehouse);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async updateCapacityWarehousePerPallet(idWarehouse, newCurrentCapacityPallet, session) {
        try {
            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);
            validators_1.WarehouseValidator.validateWarehouseExists(warehouse);
            validators_1.WarehouseValidator.validateWarehouseIsAlreadyInactive(warehouse);
            return await this.warehouseRepository.updateCapacityWarehousePerPallet(idWarehouse, newCurrentCapacityPallet, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async getCurrentCapacityWarehouse(idWarehouse) {
        try {
            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);
            validators_1.WarehouseValidator.validateWarehouseExists(warehouse);
            return await this.warehouseRepository.getCurrentCapacityWarehouse(idWarehouse);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async addCurrentCapacityWarehousePerBox(idWarehouse, addBoxes, session) {
        try {
            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);
            validators_1.WarehouseValidator.validateWarehouseExists(warehouse);
            validators_1.WarehouseValidator.validateWarehouseIsAlreadyInactive(warehouse);
            validators_1.WarehouseValidator.validateCurrentCapacityWithCapacity(warehouse.capacity, (warehouse.currentCapacity + addBoxes));
            if (addBoxes > 0) {
                return await this.warehouseRepository.addCurrentCapacityWarehousePerBox(idWarehouse, addBoxes, session);
            }
            else {
                throw new exceptions_1.AddBoxesFormatError();
            }
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async decreaseCurrentCapacityWarehousePerBox(idWarehouse, decreaseBoxes, session) {
        try {
            const warehouse = await this.warehouseRepository.findWarehouseById(idWarehouse);
            validators_1.WarehouseValidator.validateWarehouseExists(warehouse);
            validators_1.WarehouseValidator.validateWarehouseIsAlreadyInactive(warehouse);
            validators_1.WarehouseValidator.validateCurrentCapacityNotLessZero(warehouse.currentCapacity, decreaseBoxes);
            if (decreaseBoxes > 0) {
                return await this.warehouseRepository.decreaseCurrentCapacityWarehousePerBox(idWarehouse, decreaseBoxes, session);
            }
            else {
                throw new exceptions_1.DecreaseBoxesFormatError();
            }
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
};
exports.LocationService = LocationService;
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LocationService.prototype, "createWarehouse", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LocationService.prototype, "updateWarehouse", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LocationService.prototype, "inactivateWarehouse", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LocationService.prototype, "activateWarehouse", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], LocationService.prototype, "updateCapacityWarehousePerPallet", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], LocationService.prototype, "addCurrentCapacityWarehousePerBox", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], LocationService.prototype, "decreaseCurrentCapacityWarehousePerBox", null);
exports.LocationService = LocationService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IHeadquarterRepository")),
    __param(1, (0, tsyringe_1.inject)("HeadquarterValidator")),
    __param(2, (0, tsyringe_1.inject)("TransactionManager")),
    __param(3, (0, tsyringe_1.inject)("IDepartmentRepository")),
    __param(4, (0, tsyringe_1.inject)("DepartmentValidator")),
    __param(5, (0, tsyringe_1.inject)("IWarehouseRepository")),
    __param(6, (0, tsyringe_1.inject)("WarehouseValidator")),
    __metadata("design:paramtypes", [Object, validators_1.HeadquarterValidator,
        transactionManager_1.TransactionManager, Object, validators_1.DepartmentValidator, Object, validators_1.WarehouseValidator])
], LocationService);
//# sourceMappingURL=Location.service.js.map