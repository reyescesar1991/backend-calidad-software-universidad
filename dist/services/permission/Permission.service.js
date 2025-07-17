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
exports.PermissionService = void 0;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../core/exceptions");
const validators_1 = require("../../core/validators");
const models_1 = require("../../db/models");
let PermissionService = class PermissionService {
    repository;
    permissionValidator;
    constructor(repository, permissionValidator) {
        this.repository = repository;
        this.permissionValidator = permissionValidator;
    }
    async createPermission(data) {
        await this.permissionValidator.validateUniqueField("permission", data.permission);
        try {
            return await this.repository.createPermission(data);
        }
        catch (error) {
            if (error.code === 11000) {
                throw new exceptions_1.PermissionDuplicateError("El permiso ya existe");
            }
            throw error;
        }
    }
    async getPermissionById(id) {
        const permission = await this.repository.findPermissionById(id);
        if (!permission)
            throw new exceptions_1.PermissionNotFoundError();
        return permission;
    }
    async updatePermission(id, data) {
        const permissionSecurity = await this.repository.findPermissionById(id);
        if (data.label !== undefined && data.label !== permissionSecurity.label) {
            await this.permissionValidator.validateUniqueField("label", data.label);
        }
        if (data.permission !== undefined && data.permission !== permissionSecurity.permission) {
            await this.permissionValidator.validateUniqueField("permission", data.permission);
        }
        const hasChanges = Object.keys(data).some(key => data[key] !== permissionSecurity[key]);
        if (!hasChanges) {
            return permissionSecurity;
        }
        const updatedPermission = await this.repository.updatePermission(id, data);
        if (!updatedPermission)
            throw new exceptions_1.PermissionUpdateError();
        return updatedPermission;
    }
    async deletePermission(id) {
        const permission = await this.repository.findPermissionById(id);
        if (!permission)
            throw new exceptions_1.PermissionNotFoundError();
        validators_1.PermissionValidator.validateIsActive(permission);
        return this.repository.deletePermission(id);
    }
    async togglePermissionCan(id) {
        const permission = await this.repository.findPermissionById(id);
        if (!permission)
            throw new exceptions_1.PermissionNotFoundError();
        return this.repository.togglePermissionCan(id);
    }
    async updateLabelPermission(id, newLabel) {
        validators_1.PermissionValidator.validateLabelFormat(newLabel);
        await this.permissionValidator.validateUniqueField("label", newLabel);
        const permission = await this.repository.findPermissionById(id);
        if (!permission)
            throw new exceptions_1.PermissionNotFoundError();
        return this.repository.updateLabelPermission(id, newLabel);
    }
    async permanentlyDeletePermission(id) {
        // 1. Obtener el permiso (y validar que existe)
        const permission = await this.getPermissionById(id);
        if (!permission)
            throw new exceptions_1.PermissionNotFoundError();
        // 2. Verificar si el permiso está asignado a algún rol
        const isUsed = await models_1.RoleModel.exists({
            permissions: permission._id // Busca el ObjectId en el array "permissions"
        });
        if (isUsed) {
            throw new exceptions_1.PermissionInUseError("El permiso está asignado a uno o más roles");
        }
        // 3. Si no está en uso, eliminar permanentemente
        return this.repository.permanentlyDeletePermission(id);
    }
    async listPermissions() {
        return this.repository.listPermissions();
    }
    async getPermissionsByStatus(isActive) {
        if (typeof isActive !== "boolean") {
            throw new exceptions_1.InvalidParamError("Formato de parámetro invalido");
        }
        const permissions = await this.repository.getPermissionsByStatus(isActive);
        if (permissions.length === 0) {
            throw new exceptions_1.PermissionNotFoundError(`No hay permisos ${isActive ? "activos" : "inactivos"}`);
        }
        return permissions;
    }
};
exports.PermissionService = PermissionService;
exports.PermissionService = PermissionService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IPermissionRepository")),
    __param(1, (0, tsyringe_1.inject)("PermissionValidator")),
    __metadata("design:paramtypes", [Object, validators_1.PermissionValidator])
], PermissionService);
//# sourceMappingURL=Permission.service.js.map