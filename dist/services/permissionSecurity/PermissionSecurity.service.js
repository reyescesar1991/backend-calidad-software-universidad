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
exports.PermissionSecurityService = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const models_1 = require("../../db/models");
const validators_1 = require("../../core/validators");
const exceptions_1 = require("../../core/exceptions");
let PermissionSecurityService = class PermissionSecurityService {
    repository;
    permissionValidator;
    constructor(repository, permissionValidator) {
        this.repository = repository;
        this.permissionValidator = permissionValidator;
    }
    ;
    async createPermissionSecurity(data) {
        await this.permissionValidator.validateUniqueField("permission", data.permission);
        await this.permissionValidator.validateUniqueField("label", data.label);
        await this.permissionValidator.validateUniqueField("id", data.id);
        try {
            return await this.repository.createPermissionSecurity(data);
        }
        catch (error) {
            if (error.code === 11000) {
                throw new exceptions_1.PermissionSecurityDuplicateError();
            }
            throw error;
        }
    }
    async findPermissionSecurityById(idPermission) {
        const permissionSecurity = await this.repository.findPermissionSecurityById(idPermission);
        if (!permissionSecurity)
            throw new exceptions_1.PermissionSecurityNotFoundError();
        return permissionSecurity;
    }
    async updatePermissionSecurity(idPermission, data) {
        const permission = await this.repository.findPermissionSecurityById(idPermission);
        validators_1.PermissionSecurityValidator.validateFoundPermissionSecurity(permission);
        if (data.label !== undefined && data.label !== permission.label) {
            await this.permissionValidator.validateUniqueField("label", data.label);
        }
        if (data.id !== undefined && data.id !== permission.id) {
            await this.permissionValidator.validateUniqueField("id", data.id);
        }
        const hasChanges = Object.keys(data).some(key => data[key] !== permission[key]);
        if (!hasChanges) {
            return permission;
        }
        const permissionSecurity = await this.repository.updatePermissionSecurity(idPermission, data);
        if (!permissionSecurity)
            throw new exceptions_1.PermissionSecurityUpdateError();
        return permissionSecurity;
    }
    async deletePermissionSecurity(idPermission) {
        const permission = await this.repository.findPermissionSecurityById(idPermission);
        validators_1.PermissionSecurityValidator.validateFoundPermissionSecurity(permission);
        validators_1.PermissionSecurityValidator.validateIsActive(permission);
        return this.repository.deletePermissionSecurity(idPermission);
    }
    async togglePermissionSecurityActive(idPermission) {
        const permission = await this.repository.findPermissionSecurityById(idPermission);
        validators_1.PermissionSecurityValidator.validateFoundPermissionSecurity(permission);
        return this.repository.togglePermissionSecurityActive(idPermission);
    }
    async updateLabelPermissionSecurity(idPermission, newLabel) {
        const permission = await this.repository.findPermissionSecurityById(idPermission);
        validators_1.PermissionSecurityValidator.validateFoundPermissionSecurity(permission);
        validators_1.PermissionSecurityValidator.validateLabelFormat(newLabel);
        await this.permissionValidator.validateUniqueField("label", newLabel);
        return this.repository.updateLabelPermissionSecurity(idPermission, newLabel);
    }
    async listPermissionsSecurity() {
        return this.repository.listPermissionsSecurity();
    }
    async getPermissionsSecurityByStatus(isActive) {
        if (typeof isActive !== "boolean") {
            throw new exceptions_1.InvalidParamError("Formato de parámetro invalido");
        }
        const permissionsSecurity = await this.repository.getPermissionsSecurityByStatus(isActive);
        if (permissionsSecurity.length === 0) {
            throw new exceptions_1.PermissionNotFoundError(`No hay permisos ${isActive ? "activos" : "inactivos"}`);
        }
        return permissionsSecurity;
    }
    async changeIsSystemDefinedPermissionSecurity(idPermission) {
        const permissionSecurity = await this.repository.findPermissionSecurityById(idPermission);
        validators_1.PermissionSecurityValidator.validateFoundPermissionSecurity(permissionSecurity);
        return this.repository.changeIsSystemDefinedPermissionSecurity(idPermission);
    }
    async permanentlyDeletePermissionSecurity(idPermission) {
        const permissionSecurity = await this.repository.findPermissionSecurityById(idPermission);
        validators_1.PermissionSecurityValidator.validateFoundPermissionSecurity(permissionSecurity);
        const isUsed = await models_1.RoleModel.exists({
            permissionsSecurity: permissionSecurity._id // Busca el ObjectId en el array "permissions"
        });
        if (isUsed) {
            throw new exceptions_1.PermissionSecurityInUseError("El permiso de seguridad está asignado a uno o más roles");
        }
        return this.repository.permanentlyDeletePermissionSecurity(idPermission);
    }
};
exports.PermissionSecurityService = PermissionSecurityService;
exports.PermissionSecurityService = PermissionSecurityService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IPermissionSecurityRepository")),
    __param(1, (0, tsyringe_1.inject)("PermissionSecurityValidator")),
    __metadata("design:paramtypes", [Object, validators_1.PermissionSecurityValidator])
], PermissionSecurityService);
//# sourceMappingURL=PermissionSecurity.service.js.map