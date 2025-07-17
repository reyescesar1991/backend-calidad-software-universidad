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
exports.PaymentTermsValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../exceptions");
let PaymentTermsValidator = class PaymentTermsValidator {
    paymentTermsRepository;
    constructor(paymentTermsRepository) {
        this.paymentTermsRepository = paymentTermsRepository;
    }
    static validatePaymentTermExists(paymentTerm) {
        if (!paymentTerm)
            throw new exceptions_1.PaymentTermNotFoudError();
    }
    async validateIdPaymentTermUniqueness(idPaymentTerm) {
        const paymentTerm = await this.paymentTermsRepository.findPaymentTermByCustomId(idPaymentTerm);
        if (paymentTerm)
            throw new exceptions_1.PaymentTermsIDAlreadyExistsError();
    }
    static validateDaysToPayNotLessOne(daysToPay) {
        if (daysToPay < 1)
            throw new exceptions_1.DaysToPayCannotBeLessThanOneError();
    }
    static validateDiscountNotLessZero(discount) {
        if (discount < 0)
            throw new exceptions_1.DiscountCannotBeLessThanZeroError();
    }
    static validatePaymentTermIsActive(paymentTerm) {
        if (paymentTerm.isActive)
            throw new exceptions_1.PaymentTermIsAlreadyActiveError();
    }
    static validatePaymentTermIsInactive(paymentTerm) {
        if (!paymentTerm.isActive)
            throw new exceptions_1.PaymentTermIsAlreadyInactiveError();
    }
};
exports.PaymentTermsValidator = PaymentTermsValidator;
exports.PaymentTermsValidator = PaymentTermsValidator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IPaymentTermsRepository")),
    __metadata("design:paramtypes", [Object])
], PaymentTermsValidator);
//# sourceMappingURL=paymentTerms.validator.js.map