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
exports.RolePermissionRepositoryImpl = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
let RolePermissionRepositoryImpl = class RolePermissionRepositoryImpl {
    RoleModel;
    constructor(RoleModel) {
        this.RoleModel = RoleModel;
    }
    async addPermissionRole(idRoleParam, permission, session) {
        return await this.RoleModel.findOneAndUpdate({ idRole: idRoleParam }, { $push: { permissions: permission._id } }, { new: true, useFindAndModify: true, session }).exec();
    }
    async deletePermissionRole(idRoleParam, permission, session) {
        return await this.RoleModel.findOneAndUpdate({ idRole: idRoleParam }, { $pull: { permissions: permission._id } }, { new: true, useFindAndModify: true, session }).exec();
    }
};
exports.RolePermissionRepositoryImpl = RolePermissionRepositoryImpl;
exports.RolePermissionRepositoryImpl = RolePermissionRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("RoleModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], RolePermissionRepositoryImpl);
//# sourceMappingURL=rolePermissionRepository.js.map