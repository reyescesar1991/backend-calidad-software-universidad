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
exports.SupplierService = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../core/exceptions");
const validators_1 = require("../../core/validators");
const transaccional_wrapper_1 = require("../../core/utils/transaccional-wrapper");
const generalDataService_1 = require("../generalDataService");
const transactionManager_1 = require("../../core/database/transactionManager");
let SupplierService = class SupplierService {
    supplierRepository;
    supplierValidator;
    generalDataService;
    transactionManager;
    constructor(supplierRepository, supplierValidator, generalDataService, transactionManager) {
        this.supplierRepository = supplierRepository;
        this.supplierValidator = supplierValidator;
        this.generalDataService = generalDataService;
        this.transactionManager = transactionManager;
    }
    async findSupplierById(idSupplier) {
        try {
            const supplier = await this.supplierRepository.findSupplierById(idSupplier);
            validators_1.SupplierValidator.validateSupplierExists(supplier);
            return supplier;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findSupplierByCustomId(customIdSupplier) {
        try {
            const supplier = await this.supplierRepository.findSupplierByCustomId(customIdSupplier);
            validators_1.SupplierValidator.validateSupplierExists(supplier);
            return supplier;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async createSupplier(dataCreateSupplier, session) {
        try {
            await this.supplierValidator.validateIDSupplierUniqueness(dataCreateSupplier.id);
            await this.supplierValidator.validateUniqueFieldsData({
                email: dataCreateSupplier.email,
                phoneNumber: dataCreateSupplier.phoneNumber,
                taxId: dataCreateSupplier.taxId,
                name: dataCreateSupplier.name,
                tradeName: dataCreateSupplier.tradeName,
                contactPerson: dataCreateSupplier.contactPerson,
                businessRegistrationNumber: dataCreateSupplier.businessRegistrationNumber,
            });
            const paymentTerm = await this.generalDataService.findPaymentTermById(dataCreateSupplier.paymentTerm);
            validators_1.PaymentTermsValidator.validatePaymentTermExists(paymentTerm);
            const supplier = await this.supplierRepository.createSupplier(dataCreateSupplier, session);
            return supplier;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async updateSupplier(idSupplier, dataUpdateSupplier, session) {
        try {
            await this.supplierValidator.validateUniqueFieldsData({
                email: dataUpdateSupplier.email,
                phoneNumber: dataUpdateSupplier.phoneNumber,
                name: dataUpdateSupplier.name,
                tradeName: dataUpdateSupplier.tradeName,
                contactPerson: dataUpdateSupplier.contactPerson,
            });
            const paymentTerm = await this.generalDataService.findPaymentTermById(dataUpdateSupplier.paymentTerm);
            validators_1.PaymentTermsValidator.validatePaymentTermExists(paymentTerm);
            const supplier = await this.supplierRepository.updateSupplier(idSupplier, dataUpdateSupplier, session);
            return supplier;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async activateSupplier(idSupplier, session) {
        try {
            const supplier = await this.supplierRepository.findSupplierById(idSupplier);
            validators_1.SupplierValidator.validateSupplierExists(supplier);
            validators_1.SupplierValidator.validateSupplierAlreadyActive(supplier);
            return await this.supplierRepository.activateSupplier(idSupplier, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async inactivateSupplier(idSupplier, session) {
        try {
            const supplier = await this.supplierRepository.findSupplierById(idSupplier);
            validators_1.SupplierValidator.validateSupplierExists(supplier);
            validators_1.SupplierValidator.validateSupplierAlreadyInactive(supplier);
            return await this.supplierRepository.inactivateSupplier(idSupplier, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findSuppliersByName(name, isActive) {
        try {
            const suppliers = await this.supplierRepository.findSuppliersByName(name, isActive);
            validators_1.SupplierValidator.validateSuppliersExists(suppliers);
            return suppliers;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findSuppliersByLocation(city, state, country, isActive) {
        try {
            const suppliers = await this.supplierRepository.findSuppliersByLocation(city, state, country, isActive);
            validators_1.SupplierValidator.validateSuppliersExists(suppliers);
            return suppliers;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findAllSuppliers(isActive) {
        try {
            const suppliers = await this.supplierRepository.findAllSuppliers(isActive);
            validators_1.SupplierValidator.validateSuppliersExists(suppliers);
            return suppliers;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findSuppliersByPaymentTerm(paymentTermId, isActive) {
        try {
            const suppliers = await this.supplierRepository.findSuppliersByPaymentTerm(paymentTermId, isActive);
            validators_1.SupplierValidator.validateSuppliersExists(suppliers);
            return suppliers;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
};
exports.SupplierService = SupplierService;
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SupplierService.prototype, "createSupplier", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SupplierService.prototype, "updateSupplier", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SupplierService.prototype, "activateSupplier", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SupplierService.prototype, "inactivateSupplier", null);
exports.SupplierService = SupplierService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ISupplierRepository")),
    __param(1, (0, tsyringe_1.inject)("SupplierValidator")),
    __param(2, (0, tsyringe_1.inject)(generalDataService_1.GeneralDataService)),
    __param(3, (0, tsyringe_1.inject)("TransactionManager")),
    __metadata("design:paramtypes", [Object, validators_1.SupplierValidator,
        generalDataService_1.GeneralDataService,
        transactionManager_1.TransactionManager])
], SupplierService);
//# sourceMappingURL=Supplier.service.js.map