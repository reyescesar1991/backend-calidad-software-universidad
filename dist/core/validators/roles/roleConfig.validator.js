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
exports.RoleConfigValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../exceptions");
const validations_1 = require("../../../validations");
let RoleConfigValidator = class RoleConfigValidator {
    roleConfigRepository;
    roleRepository;
    constructor(roleConfigRepository, roleRepository) {
        this.roleConfigRepository = roleConfigRepository;
        this.roleRepository = roleRepository;
    }
    static validateRoleConfigExists(roleConfig) {
        if (!roleConfig)
            throw new exceptions_1.RoleConfigNotFoundError();
    }
    static validateRoleConfigName(roleConfig) {
        if (!roleConfig)
            throw new exceptions_1.RoleConfigNotFoundByNameError();
    }
    static validateFilterRole(filter) {
        const resultSchema = validations_1.RoleConfigFilterSchema.safeParse(filter);
        if (!resultSchema.success) {
            const errors = resultSchema.error.errors.map(e => `${e.path[0]}: ${e.message}`);
            console.log(errors);
            throw new exceptions_1.FilterRoleConfigError(`Filtro inválido:\n- ${errors.join('\n- ')}`);
        }
    }
    static validateRoleConfigsFound(RoleConfigs) {
        if (RoleConfigs.length < 1)
            throw new exceptions_1.RoleConfigsNotFoundByFilterError();
    }
    static validateRoleConfigAlreadyActive(isActive) {
        if (isActive)
            throw new exceptions_1.RoleConfigAlreadyActiveError();
    }
    static validateRoleConfigAlreadyInactive(isActive) {
        if (!isActive)
            throw new exceptions_1.RoleConfigAlreadyInactiveError();
    }
    static validateMaxLoginAttemptsMajorEqualTwo(maxLoginAttempts) {
        if (maxLoginAttempts <= 1)
            throw new exceptions_1.RolConfigMaxLoginAttemptsNotValidError();
    }
    async validateUniquenessRoleConfig(rolName) {
        const role = await this.roleConfigRepository.findConfigRoleByNameRole(rolName);
        if (role)
            throw new exceptions_1.RoleConfigAlreadyExistsError();
    }
    async validateRoleExists(rolId) {
        console.log(rolId);
        const role = await this.roleRepository.findRoleById(rolId);
        if (!role)
            throw new exceptions_1.RoleConfigRoleNotExistsError();
    }
};
exports.RoleConfigValidator = RoleConfigValidator;
exports.RoleConfigValidator = RoleConfigValidator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IRoleConfigRepository")),
    __param(1, (0, tsyringe_1.inject)("IRoleRepository")),
    __metadata("design:paramtypes", [Object, Object])
], RoleConfigValidator);
//# sourceMappingURL=roleConfig.validator.js.map