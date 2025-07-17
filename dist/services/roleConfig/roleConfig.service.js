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
exports.RoleConfigService = void 0;
const tsyringe_1 = require("tsyringe");
const validators_1 = require("../../core/validators");
const transactionManager_1 = require("../../core/database/transactionManager");
const exceptions_1 = require("../../core/exceptions");
let RoleConfigService = class RoleConfigService {
    roleConfigRepository;
    roleConfigValidator;
    transactionManager;
    constructor(roleConfigRepository, roleConfigValidator, transactionManager) {
        this.roleConfigRepository = roleConfigRepository;
        this.roleConfigValidator = roleConfigValidator;
        this.transactionManager = transactionManager;
    }
    async findConfigRoleById(idConfigRole) {
        try {
            const roleConfig = await this.roleConfigRepository.findConfigRoleById(idConfigRole);
            validators_1.RoleConfigValidator.validateRoleConfigExists(roleConfig);
            return roleConfig;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findConfigRoleByNameRole(nameRole) {
        try {
            const roleConfig = await this.roleConfigRepository.findConfigRoleByNameRole(nameRole);
            validators_1.RoleConfigValidator.validateRoleConfigName(roleConfig);
            return roleConfig;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async searchConfigRoleByFilter(filter) {
        try {
            validators_1.RoleConfigValidator.validateFilterRole(filter);
            const rolConfigs = await this.roleConfigRepository.searchConfigRoleByFilter(filter);
            validators_1.RoleConfigValidator.validateRoleConfigsFound(rolConfigs);
            return rolConfigs;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async activateConfigRole(idConfigRole) {
        return this.transactionManager.executeTransaction(async (session) => {
            try {
                const roleConfig = await this.roleConfigRepository.findConfigRoleById(idConfigRole);
                validators_1.RoleConfigValidator.validateRoleConfigExists(roleConfig);
                validators_1.RoleConfigValidator.validateRoleConfigAlreadyActive(roleConfig.isActive);
                return await this.roleConfigRepository.activateConfigRole(idConfigRole, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async deleteConfigRole(idConfigRole) {
        return this.transactionManager.executeTransaction(async (session) => {
            try {
                const roleConfig = await this.roleConfigRepository.findConfigRoleById(idConfigRole);
                validators_1.RoleConfigValidator.validateRoleConfigExists(roleConfig);
                validators_1.RoleConfigValidator.validateRoleConfigAlreadyInactive(roleConfig.isActive);
                return await this.roleConfigRepository.deleteConfigRole(idConfigRole, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async createConfigRole(dataConfigRole) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                console.log(dataConfigRole);
                await this.roleConfigValidator.validateUniquenessRoleConfig(dataConfigRole.rolName);
                await this.roleConfigValidator.validateRoleExists(dataConfigRole.rolID);
                validators_1.RoleConfigValidator.validateMaxLoginAttemptsMajorEqualTwo(dataConfigRole.maxLoginAttempts);
                return await this.roleConfigRepository.createConfigRole(dataConfigRole, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async updateConfigRole(idConfigRole, dataConfigRoleUpdate) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const roleConfig = await this.roleConfigRepository.findConfigRoleById(idConfigRole);
                validators_1.RoleConfigValidator.validateRoleConfigExists(roleConfig);
                await this.roleConfigValidator.validateUniquenessRoleConfig(dataConfigRoleUpdate.rolName);
                validators_1.RoleConfigValidator.validateMaxLoginAttemptsMajorEqualTwo(dataConfigRoleUpdate.maxLoginAttempts);
                return await this.roleConfigRepository.updateConfigRole(idConfigRole, dataConfigRoleUpdate, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
};
exports.RoleConfigService = RoleConfigService;
exports.RoleConfigService = RoleConfigService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IRoleConfigRepository")),
    __param(1, (0, tsyringe_1.inject)("RoleConfigValidator")),
    __param(2, (0, tsyringe_1.inject)("TransactionManager")),
    __metadata("design:paramtypes", [Object, validators_1.RoleConfigValidator,
        transactionManager_1.TransactionManager])
], RoleConfigService);
//# sourceMappingURL=roleConfig.service.js.map