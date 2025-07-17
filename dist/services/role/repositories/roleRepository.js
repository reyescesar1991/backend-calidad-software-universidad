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
exports.RoleRepositoryImpl = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
let RoleRepositoryImpl = class RoleRepositoryImpl {
    RoleModel;
    constructor(RoleModel) {
        this.RoleModel = RoleModel;
    }
    async findRoleById(idRole) {
        return await this.RoleModel.findById(idRole).exec();
    }
    async getPermissionsRole(customIdRole) {
        const permissions = await this.RoleModel.findOne({ idRole: customIdRole })
            .populate("permissions").exec();
        return permissions.permissions;
    }
    async getPermissionsSecurityRole(customIdRole) {
        const permissionsSecurity = await this.RoleModel.findOne({ idRole: customIdRole })
            .populate("permissionsSecurity").exec();
        return permissionsSecurity.permissionsSecurity;
    }
    async findRoleByCustomId(customIdRole) {
        return await this.RoleModel.findOne({ idRole: customIdRole }).exec();
    }
    async searchRolesByFilters(filter) {
        return await this.RoleModel.find(filter).exec();
    }
    async listRoles() {
        return await this.RoleModel.find({});
    }
    async createRole(dataRole, session) {
        const [newRole] = await this.RoleModel.create([dataRole], { session });
        return newRole;
    }
    async updateRole(idRole, dataRole, session) {
        return await this.RoleModel.findByIdAndUpdate(idRole, dataRole, { new: true, runValidators: true, session }).exec();
    }
    async deleteRole(idRole, session) {
        return await this.RoleModel.findByIdAndUpdate(idRole, { $set: { isActive: false } }, { new: true, runValidators: true, session }).exec();
    }
    async activateRole(idRole, session) {
        return await this.RoleModel.findByIdAndUpdate(idRole, { $set: { isActive: true } }, { new: true, runValidators: true, session }).exec();
    }
    async setDefaultRoleSystem(idRole, session) {
        return await this.RoleModel.findByIdAndUpdate(idRole, [{ $set: { isDefault: { $not: '$isDefault' } } }], { new: true, runValidators: true, session }).exec();
    }
    async unsetAllDefaultRoles(session) {
        await this.RoleModel.updateMany({ isDefault: true }, { $set: { isDefault: false } }, { session });
    }
};
exports.RoleRepositoryImpl = RoleRepositoryImpl;
exports.RoleRepositoryImpl = RoleRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("RoleModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], RoleRepositoryImpl);
//# sourceMappingURL=roleRepository.js.map