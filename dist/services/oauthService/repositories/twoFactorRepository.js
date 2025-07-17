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
exports.TwoFactorDataRepositoryImpl = void 0;
const mongoose_1 = require("mongoose");
const tsyringe_1 = require("tsyringe");
let TwoFactorDataRepositoryImpl = class TwoFactorDataRepositoryImpl {
    TwoFactorModel;
    constructor(TwoFactorModel) {
        this.TwoFactorModel = TwoFactorModel;
    }
    async getFactorsAvailable() {
        return await this.TwoFactorModel.find({}).exec();
    }
    async findFactorById(factorId) {
        return await this.TwoFactorModel.findById(factorId).exec();
    }
    async findFactorByMethod(methodFactor) {
        return await this.TwoFactorModel.findOne({ method: methodFactor }).exec();
    }
    async addFactor(dataFactor, session) {
        const [factor] = await this.TwoFactorModel.create([dataFactor], { session });
        return factor;
    }
    async updateFactor(factorId, dataFactor, session) {
        return await this.TwoFactorModel.findByIdAndUpdate(factorId, dataFactor, { new: true, runValidators: true, session }).exec();
    }
    async enableFactor(factorId, session) {
        return await this.TwoFactorModel.findByIdAndUpdate(factorId, { $set: { isEnabled: true } }, { new: true, runValidators: true, session }).exec();
    }
    async disableFactor(factorId, session) {
        return await this.TwoFactorModel.findByIdAndUpdate(factorId, { $set: { isEnabled: false } }, { new: true, runValidators: true, session }).exec();
    }
    async addUserQuantity(factorId, session) {
        return await this.TwoFactorModel.findByIdAndUpdate(factorId, { $inc: { quantityUsers: 1 } }, { new: true, runValidators: true, session }).exec();
    }
};
exports.TwoFactorDataRepositoryImpl = TwoFactorDataRepositoryImpl;
exports.TwoFactorDataRepositoryImpl = TwoFactorDataRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("TwoFactorAuthModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], TwoFactorDataRepositoryImpl);
//# sourceMappingURL=twoFactorRepository.js.map