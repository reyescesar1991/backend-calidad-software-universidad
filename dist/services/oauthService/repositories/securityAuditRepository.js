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
exports.SecurityAuditRepositoryImpl = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
let SecurityAuditRepositoryImpl = class SecurityAuditRepositoryImpl {
    SecurityAuditModel;
    constructor(SecurityAuditModel) {
        this.SecurityAuditModel = SecurityAuditModel;
    }
    async createRegistrySecurityAudit(dataAudit, session) {
        const [data] = await this.SecurityAuditModel.create([dataAudit], { session });
        return data;
    }
    async updateRegistrySecurityAudit(userId, dataUpdateAudit, session) {
        return await this.SecurityAuditModel.findOneAndUpdate({ userId: userId }, dataUpdateAudit, { new: true, runValidators: true, session }).exec();
    }
    async getRegistrySecurityAuditByUser(idUser) {
        return await this.SecurityAuditModel.findOne({ userId: idUser }).exec();
    }
    async addAttempLogin(userId, session) {
        return await this.SecurityAuditModel.findOneAndUpdate({ userId: userId }, { $inc: { loginAttempts: 1 } }, { new: true, runValidators: true, session }).exec();
    }
    async resetAttempLogin(userId, session) {
        return await this.SecurityAuditModel.findOneAndUpdate({ userId: userId }, { $set: { loginAttempts: 0 } }, { new: true, runValidators: true, session }).exec();
    }
    async addAttempSecondFactor(userId, session) {
        const user = await this.SecurityAuditModel.findOneAndUpdate({ userId: userId }, { $inc: { secondFactorAttempts: 1 } }, { new: true, runValidators: true, session }).exec();
        console.log("usuario recuperado para sumar", user);
        return user;
    }
    async resetAttempSecondFactor(userId, session) {
        return await this.SecurityAuditModel.findOneAndUpdate({ userId: userId }, { $set: { secondFactorAttempts: 0 } }, { new: true, runValidators: true, session }).exec();
    }
    async getUserAttempsLogin(userId) {
        const result = await this.SecurityAuditModel.findById({ idUser: userId }, { loginAttempts: 1, _id: 0 } // Proyección: solo el campo status
        ).lean() //Mejora el rendimiento al evitar la hidratación completa del documento
            .exec();
        return result?.loginAttempts || null;
    }
    async getUserAttempsSecondFactor(userId) {
        const result = await this.SecurityAuditModel.findById({ idUser: userId }, { secondFactorAttempts: 1, _id: 0 } // Proyección: solo el campo status
        ).lean() //Mejora el rendimiento al evitar la hidratación completa del documento
            .exec();
        return result?.secondFactorAttempts || null;
    }
};
exports.SecurityAuditRepositoryImpl = SecurityAuditRepositoryImpl;
exports.SecurityAuditRepositoryImpl = SecurityAuditRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("SecurityAuditModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], SecurityAuditRepositoryImpl);
//# sourceMappingURL=securityAuditRepository.js.map