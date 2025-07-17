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
exports.RoleConfigRepositoryImpl = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
let RoleConfigRepositoryImpl = class RoleConfigRepositoryImpl {
    RoleConfigModel;
    constructor(RoleConfigModel) {
        this.RoleConfigModel = RoleConfigModel;
    }
    async findConfigRoleById(idConfigRole) {
        return await this.RoleConfigModel.findById(idConfigRole).exec();
    }
    async findConfigRoleByNameRole(nameRole) {
        return await this.RoleConfigModel.findOne({ rolName: nameRole });
    }
    async searchConfigRoleByFilter(filter) {
        return await this.RoleConfigModel.find(filter).exec();
    }
    async activateConfigRole(idConfigRole, session) {
        return await this.RoleConfigModel.findByIdAndUpdate(idConfigRole, { $set: { isActive: true } }, { new: true, runValidators: true, session }).exec();
    }
    async deleteConfigRole(idConfigRole, session) {
        return await this.RoleConfigModel.findByIdAndUpdate(idConfigRole, { $set: { isActive: false } }, { new: true, runValidators: true, session }).exec();
    }
    async createConfigRole(dataConfigRole, session) {
        const [newConfigRole] = await this.RoleConfigModel.create([dataConfigRole], { session });
        return newConfigRole;
    }
    async updateConfigRole(idConfigRole, dataConfigRoleUpdate, session) {
        return await this.RoleConfigModel.findByIdAndUpdate(idConfigRole, dataConfigRoleUpdate, { new: true, runValidators: true, session }).exec();
    }
    async findRoleConfigWithRole(roleConfigId) {
        const roleConfig = await this.RoleConfigModel.findById(roleConfigId).populate('rolID').exec();
        return roleConfig.rolID;
    }
};
exports.RoleConfigRepositoryImpl = RoleConfigRepositoryImpl;
exports.RoleConfigRepositoryImpl = RoleConfigRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("RoleConfigModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], RoleConfigRepositoryImpl);
//# sourceMappingURL=roleConfigRepository.js.map