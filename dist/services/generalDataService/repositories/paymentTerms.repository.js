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
exports.PaymentTermsRepositoryImpl = void 0;
const mongoose_1 = require("mongoose");
const tsyringe_1 = require("tsyringe");
let PaymentTermsRepositoryImpl = class PaymentTermsRepositoryImpl {
    PaymentTermModel;
    constructor(PaymentTermModel) {
        this.PaymentTermModel = PaymentTermModel;
    }
    async findAllPaymentTerms() {
        return await this.PaymentTermModel.find({}).exec();
    }
    async findPaymentTermById(idPaymentTerm) {
        return await this.PaymentTermModel.findById(idPaymentTerm).exec();
    }
    async findPaymentTermByCustomId(customIdPaymentTerm) {
        return await this.PaymentTermModel.findOne({ id: customIdPaymentTerm }).exec();
    }
    async createPaymentTerm(dataCreatePaymentTerm, session) {
        const [paymentTerm] = await this.PaymentTermModel.create([dataCreatePaymentTerm], { session });
        return paymentTerm;
    }
    async updatePaymentTerm(idPaymentTerm, dataUpdatePaymentTerm, session) {
        return await this.PaymentTermModel.findByIdAndUpdate(idPaymentTerm, dataUpdatePaymentTerm, { new: true, runValidators: true, session }).exec();
    }
    async activatePaymentTerm(idPaymentTerm, session) {
        return await this.PaymentTermModel.findByIdAndUpdate(idPaymentTerm, { $set: { isActive: true } }, { new: true, runValidators: true, session }).exec();
    }
    async inactivatePaymentTerm(idPaymentTerm, session) {
        return await this.PaymentTermModel.findByIdAndUpdate(idPaymentTerm, { $set: { isActive: false } }, { new: true, runValidators: true, session }).exec();
    }
};
exports.PaymentTermsRepositoryImpl = PaymentTermsRepositoryImpl;
exports.PaymentTermsRepositoryImpl = PaymentTermsRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("PaymentTermModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PaymentTermsRepositoryImpl);
//# sourceMappingURL=paymentTerms.repository.js.map