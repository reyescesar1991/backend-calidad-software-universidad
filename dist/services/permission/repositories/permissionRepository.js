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
exports.PermissionRepository = void 0;
const mongoose_1 = require("mongoose");
const tsyringe_1 = require("tsyringe");
const timeOutError_1 = require("../../../core/utils/timeOutError");
let PermissionRepository = class PermissionRepository {
    permissionModel;
    constructor(permissionModel) {
        this.permissionModel = permissionModel;
    }
    async createPermission(data) {
        return this.permissionModel.create(data);
    }
    async findPermissionById(id) {
        try {
            return this.permissionModel.findById(id).exec();
        }
        catch (error) {
            (0, timeOutError_1.timeOutMongoError)(error);
        }
        return this.permissionModel.findById(id).exec();
    }
    async findPermissionByKey(permissionKey) {
        return await this.permissionModel.findOne({ permission: permissionKey }).exec();
    }
    async updatePermission(id, data) {
        return this.permissionModel.findByIdAndUpdate(id, data, { new: true, runValidators: true })
            .exec();
    }
    async deletePermission(id) {
        return this.permissionModel.findByIdAndUpdate(id, { $set: { isActive: false } }, { new: true, runValidators: true }).exec();
    }
    // En PermissionRepository.ts
    async togglePermissionCan(id) {
        return this.permissionModel.findByIdAndUpdate(id, [{ $set: { can: { $not: "$can" } } }], { new: true }).exec();
    }
    async updateLabelPermission(id, newLabel) {
        return this.permissionModel.findByIdAndUpdate(id, { $set: { label: newLabel } }, { new: true, runValidators: true }).exec();
    }
    async permanentlyDeletePermission(id) {
        return this.permissionModel.findByIdAndDelete(id).exec();
    }
    async listPermissions() {
        return this.permissionModel.find({}).exec();
    }
    async getPermissionsByStatus(isActive) {
        return this.permissionModel.find({ isActive }).exec();
    }
    async findByField(field, value) {
        return this.permissionModel.findOne({ [field]: value }).exec();
    }
};
exports.PermissionRepository = PermissionRepository;
exports.PermissionRepository = PermissionRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("PermissionModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PermissionRepository);
//# sourceMappingURL=permissionRepository.js.map