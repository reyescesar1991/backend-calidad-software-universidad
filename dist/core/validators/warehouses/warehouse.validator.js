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
exports.WarehouseValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../exceptions");
let WarehouseValidator = class WarehouseValidator {
    warehouseRepository;
    constructor(warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }
    static validateWarehouseExists(warehouse) {
        if (!warehouse)
            throw new exceptions_1.WarehouseNotFoundError();
    }
    async validateIdWarehouseUniqueness(idWarehouse) {
        const warehouse = await this.warehouseRepository.findWarehouseByCustomId(idWarehouse);
        if (warehouse)
            throw new exceptions_1.WarehouseCustomIdAlreadyExistsError();
    }
    static validateCurrentCapacityWithCapacity(capacity, currentCapacity) {
        if (currentCapacity > capacity)
            throw new exceptions_1.CurrentCapacityExceedsCapacityWarehouseError();
    }
    static validateWarehouseIsAlreadyInactive(warehouse) {
        if (!warehouse.isActive)
            throw new exceptions_1.WarehouseIsAlreadyInactiveError();
    }
    static validateCustomIdWarehouseItsFromTheWarehouse(customIdWarehouse, customIdWarehouseParam) {
        if (customIdWarehouse !== customIdWarehouseParam)
            throw new exceptions_1.WarehouseCustomIdNotMatchError();
    }
    static validateWarehouseIsAlreadyActive(warehouse) {
        if (warehouse.isActive)
            throw new exceptions_1.WarehouseIsAlreadyActiveError();
    }
    static validateCurrentCapacityNotLessZero(currentCapacity, decreaseCapacity) {
        const estimateQuantity = currentCapacity - decreaseCapacity;
        if (estimateQuantity < 0)
            throw new exceptions_1.CurrentCapacityDecreaseLessZeroCapacityWarehouseError();
    }
};
exports.WarehouseValidator = WarehouseValidator;
exports.WarehouseValidator = WarehouseValidator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IWarehouseRepository")),
    __metadata("design:paramtypes", [Object])
], WarehouseValidator);
//# sourceMappingURL=warehouse.validator.js.map