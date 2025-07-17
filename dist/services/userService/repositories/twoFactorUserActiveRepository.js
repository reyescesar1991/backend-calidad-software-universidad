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
exports.TwoFactorUserActiveRepositoryImpl = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
let TwoFactorUserActiveRepositoryImpl = class TwoFactorUserActiveRepositoryImpl {
    UserTwoFactorModel;
    constructor(UserTwoFactorModel) {
        this.UserTwoFactorModel = UserTwoFactorModel;
    }
    async listTwoFactorUsers() {
        return await this.UserTwoFactorModel.find({}).exec();
    }
    async getTwoFactorUser(userIdParam) {
        return await this.UserTwoFactorModel.findOne({ userId: userIdParam }).exec();
    }
    async getTwoFactorUserActive(userIdParam) {
        return (await this.UserTwoFactorModel.findOne({ userId: userIdParam }).exec()).isActive;
    }
    async addTwoFactorUser(dataFactorUserParam, session) {
        const [dataFactorUser] = await this.UserTwoFactorModel.create([dataFactorUserParam], { session });
        return dataFactorUser;
    }
    async activateTwoFactorUser(userIdParam, session) {
        return await this.UserTwoFactorModel.findOneAndUpdate({ userId: userIdParam }, { $set: { isActive: true } }, { new: true, runValidators: true, session }).exec();
    }
    async inactivateTwoFactorUser(userIdParam, session) {
        return await this.UserTwoFactorModel.findOneAndUpdate({ userId: userIdParam }, { $set: { isActive: false } }, { new: true, runValidators: true, session }).exec();
    }
};
exports.TwoFactorUserActiveRepositoryImpl = TwoFactorUserActiveRepositoryImpl;
exports.TwoFactorUserActiveRepositoryImpl = TwoFactorUserActiveRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UserTwoFactorModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], TwoFactorUserActiveRepositoryImpl);
//# sourceMappingURL=twoFactorUserActiveRepository.js.map