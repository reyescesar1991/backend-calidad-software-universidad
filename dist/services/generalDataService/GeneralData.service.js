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
exports.GeneralDataService = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../core/exceptions");
const validators_1 = require("../../core/validators");
const transaccional_wrapper_1 = require("../../core/utils/transaccional-wrapper");
const transactionManager_1 = require("../../core/database/transactionManager");
let GeneralDataService = class GeneralDataService {
    paymentTermsRepository;
    paymentTermsValidator;
    transactionManager;
    constructor(paymentTermsRepository, paymentTermsValidator, transactionManager) {
        this.paymentTermsRepository = paymentTermsRepository;
        this.paymentTermsValidator = paymentTermsValidator;
        this.transactionManager = transactionManager;
    }
    async findPaymentTermById(idPaymentTerm) {
        try {
            const paymentTerm = await this.paymentTermsRepository.findPaymentTermById(idPaymentTerm);
            validators_1.PaymentTermsValidator.validatePaymentTermExists(paymentTerm);
            return paymentTerm;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findPaymentTermByCustomId(customIdPaymentTerm) {
        try {
            const paymentTerm = await this.paymentTermsRepository.findPaymentTermByCustomId(customIdPaymentTerm);
            validators_1.PaymentTermsValidator.validatePaymentTermExists(paymentTerm);
            return paymentTerm;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async createPaymentTerm(dataCreatePaymentTerm, session) {
        try {
            await this.paymentTermsValidator.validateIdPaymentTermUniqueness(dataCreatePaymentTerm.id);
            validators_1.PaymentTermsValidator.validateDaysToPayNotLessOne(dataCreatePaymentTerm.daysToPay);
            validators_1.PaymentTermsValidator.validateDiscountNotLessZero(dataCreatePaymentTerm.discount);
            return await this.paymentTermsRepository.createPaymentTerm(dataCreatePaymentTerm, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async updatePaymentTerm(idPaymentTerm, dataUpdatePaymentTerm, session) {
        try {
            validators_1.PaymentTermsValidator.validateDaysToPayNotLessOne(dataUpdatePaymentTerm.daysToPay);
            validators_1.PaymentTermsValidator.validateDiscountNotLessZero(dataUpdatePaymentTerm.discount);
            return await this.paymentTermsRepository.updatePaymentTerm(idPaymentTerm, dataUpdatePaymentTerm, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async activatePaymentTerm(idPaymentTerm, session) {
        try {
            const paymentTerm = await this.paymentTermsRepository.findPaymentTermById(idPaymentTerm);
            validators_1.PaymentTermsValidator.validatePaymentTermExists(paymentTerm);
            validators_1.PaymentTermsValidator.validatePaymentTermIsActive(paymentTerm);
            return await this.paymentTermsRepository.activatePaymentTerm(idPaymentTerm, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async inactivatePaymentTerm(idPaymentTerm, session) {
        try {
            const paymentTerm = await this.paymentTermsRepository.findPaymentTermById(idPaymentTerm);
            validators_1.PaymentTermsValidator.validatePaymentTermExists(paymentTerm);
            validators_1.PaymentTermsValidator.validatePaymentTermIsInactive(paymentTerm);
            return await this.paymentTermsRepository.inactivatePaymentTerm(idPaymentTerm, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findAllPaymentTerms() {
        try {
            return await this.paymentTermsRepository.findAllPaymentTerms();
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
};
exports.GeneralDataService = GeneralDataService;
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GeneralDataService.prototype, "createPaymentTerm", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GeneralDataService.prototype, "updatePaymentTerm", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GeneralDataService.prototype, "activatePaymentTerm", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GeneralDataService.prototype, "inactivatePaymentTerm", null);
exports.GeneralDataService = GeneralDataService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IPaymentTermsRepository")),
    __param(1, (0, tsyringe_1.inject)("PaymentTermsValidator")),
    __param(2, (0, tsyringe_1.inject)("TransactionManager")),
    __metadata("design:paramtypes", [Object, validators_1.PaymentTermsValidator,
        transactionManager_1.TransactionManager])
], GeneralDataService);
//# sourceMappingURL=GeneralData.service.js.map