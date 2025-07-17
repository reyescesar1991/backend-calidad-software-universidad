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
exports.SupplierValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../exceptions");
let SupplierValidator = class SupplierValidator {
    supplierRepository;
    constructor(supplierRepository) {
        this.supplierRepository = supplierRepository;
    }
    static validateSupplierExists(supplier) {
        if (!supplier)
            throw new exceptions_1.SupplierNotExistsError();
    }
    static validateSuppliersExists(suppliers) {
        if (suppliers.length < 0)
            throw new exceptions_1.SuppliersNotExistsError();
    }
    static validateSupplierAlreadyActive(supplier) {
        if (supplier.isActive)
            throw new exceptions_1.SupplierIsAlreadyActiveError();
    }
    static validateSupplierAlreadyInactive(supplier) {
        if (!supplier.isActive)
            throw new exceptions_1.SupplierIsAlreadyInactiveError();
    }
    async validateIDSupplierUniqueness(idCustomSupplier) {
        const supplier = await this.supplierRepository.findSupplierByCustomId(idCustomSupplier);
        if (supplier)
            throw new exceptions_1.SupplierAlreadyExistsError();
    }
    async validateUniqueFieldsData(dataUniqueSupplier) {
        const haveUniqueFields = await this.supplierRepository.existsByContactInfo(dataUniqueSupplier.email, dataUniqueSupplier.phoneNumber, dataUniqueSupplier.taxId, dataUniqueSupplier.name, dataUniqueSupplier.tradeName, dataUniqueSupplier.contactPerson, dataUniqueSupplier.businessRegistrationNumber);
        if (haveUniqueFields)
            throw new exceptions_1.ItHasUniqueDataAndRegisteredError();
    }
};
exports.SupplierValidator = SupplierValidator;
exports.SupplierValidator = SupplierValidator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ISupplierRepository")),
    __metadata("design:paramtypes", [Object])
], SupplierValidator);
//# sourceMappingURL=suppliers.validator.js.map