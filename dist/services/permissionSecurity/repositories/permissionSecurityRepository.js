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
exports.PermissionSecurityRepository = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
const timeOutError_1 = require("../../../core/utils/timeOutError");
let PermissionSecurityRepository = class PermissionSecurityRepository {
    permissionSecurityModel;
    constructor(permissionSecurityModel) {
        this.permissionSecurityModel = permissionSecurityModel;
    }
    createPermissionSecurity(data) {
        return this.permissionSecurityModel.create(data);
    }
    findPermissionSecurityById(idPermission) {
        try {
            return this.permissionSecurityModel.findById(idPermission).exec();
        }
        catch (error) {
            (0, timeOutError_1.timeOutMongoError)(error);
        }
    }
    updatePermissionSecurity(idPermission, data) {
        return this.permissionSecurityModel.findByIdAndUpdate(idPermission, data, { new: true, runValidators: true }).exec();
    }
    deletePermissionSecurity(idPermission) {
        return this.permissionSecurityModel.findByIdAndUpdate(idPermission, { $set: { isActive: false } }, { new: true, runValidators: true }).exec();
    }
    togglePermissionSecurityActive(idPermission) {
        return this.permissionSecurityModel.findByIdAndUpdate(idPermission, [{ $set: { isActive: { $not: "$isActive" } } }], { new: true }).exec();
    }
    updateLabelPermissionSecurity(idPermission, newLabel) {
        return this.permissionSecurityModel.findByIdAndUpdate(idPermission, { $set: { label: newLabel } }, { new: true, runValidators: true }).exec();
    }
    permanentlyDeletePermissionSecurity(idPermission) {
        return this.permissionSecurityModel.findByIdAndDelete(idPermission).exec();
    }
    listPermissionsSecurity() {
        return this.permissionSecurityModel.find({}).exec();
    }
    getPermissionsSecurityByStatus(isActive) {
        return this.permissionSecurityModel.find({ isActive }).exec();
    }
    changeIsSystemDefinedPermissionSecurity(idPermission) {
        return this.permissionSecurityModel.findByIdAndUpdate(idPermission, [{ $set: { isSystemDefined: { $not: "$isSystemDefined" } } }], { new: true }).exec();
    }
    async findPermissionSecurityByCustomId(permissionKey) {
        return await this.permissionSecurityModel.findOne({ id: permissionKey }).exec();
    }
    ;
    async findByField(field, value) {
        return this.permissionSecurityModel.findOne({ [field]: value }).exec();
    }
};
exports.PermissionSecurityRepository = PermissionSecurityRepository;
exports.PermissionSecurityRepository = PermissionSecurityRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("PermissionSecurityModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PermissionSecurityRepository);
//# sourceMappingURL=permissionSecurityRepository.js.map