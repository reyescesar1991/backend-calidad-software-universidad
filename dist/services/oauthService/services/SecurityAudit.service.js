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
exports.SecurityAuditService = void 0;
const tsyringe_1 = require("tsyringe");
const transactionManager_1 = require("../../../core/database/transactionManager");
const exceptions_1 = require("../../../core/exceptions");
const validators_1 = require("../../../core/validators");
const user_service_1 = require("../../userService/user.service");
const transaccional_wrapper_1 = require("../../../core/utils/transaccional-wrapper");
let SecurityAuditService = class SecurityAuditService {
    securityAuditRepository;
    userService;
    transactionManager;
    constructor(securityAuditRepository, userService, transactionManager) {
        this.securityAuditRepository = securityAuditRepository;
        this.userService = userService;
        this.transactionManager = transactionManager;
    }
    async createRegistrySecurityAudit(dataAudit, sessionParam) {
        try {
            //1. Verificamos unicamente que el usuario exista y tenga un estatus de activo en el sistema
            const user = await this.userService.findUserById(dataAudit.userId);
            validators_1.UserValidator.validateStatusUserIsActive(user.status);
            //2. Creamos el registro inicial
            return await this.securityAuditRepository.createRegistrySecurityAudit(dataAudit, sessionParam);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async updateRegistrySecurityAudit(userId, dataUpdateAudit, sessionParam) {
        try {
            //1. Verificamos unicamente que el usuario exista y tenga un estatus de activo en el sistema
            const user = await this.userService.findUserById(userId);
            validators_1.UserValidator.validateStatusUserIsActive(user.status);
            //2. Actualizamos la data
            return await this.securityAuditRepository.updateRegistrySecurityAudit(userId, dataUpdateAudit, sessionParam);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async getRegistrySecurityAuditByUser(userId) {
        try {
            //1. Verificamos unicamente que el usuario exista y tenga un estatus de activo en el sistema
            const user = await this.userService.findUserById(userId);
            validators_1.UserValidator.validateStatusUserIsActive(user.status);
            //2. devolvemos la data
            return await this.securityAuditRepository.getRegistrySecurityAuditByUser(userId);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async addAttempLogin(userId, sessionParam) {
        try {
            //1. Verificamos unicamente que el usuario exista y tenga un estatus de activo en el sistema
            const user = await this.userService.findUserById(userId);
            validators_1.UserValidator.validateStatusUserIsActive(user.status);
            //2. Agregamos uno al intento de login
            return await this.securityAuditRepository.addAttempLogin(userId, sessionParam);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async resetAttempLogin(userId, sessionParam) {
        try {
            //1. Verificamos unicamente que el usuario exista y tenga un estatus de activo en el sistema
            const user = await this.userService.findUserById(userId);
            validators_1.UserValidator.validateStatusUserIsActive(user.status);
            //2. reseteamos el contador
            return await this.securityAuditRepository.resetAttempLogin(userId, sessionParam);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async addAttempSecondFactor(userId, sessionParam) {
        try {
            //1. Verificamos unicamente que el usuario exista y tenga un estatus de activo en el sistema
            const user = await this.userService.findUserById(userId);
            validators_1.UserValidator.validateStatusUserIsActive(user.status);
            //2. Sumamos uno al intento de segundo factor
            return await this.securityAuditRepository.addAttempSecondFactor(userId, sessionParam);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async resetAttempSecondFactor(userId, sessionParam) {
        try {
            //1. Verificamos unicamente que el usuario exista y tenga un estatus de activo en el sistema
            const user = await this.userService.findUserById(userId);
            validators_1.UserValidator.validateStatusUserIsActive(user.status);
            //2. reseteamos el contador de intentos de segundo factor
            return await this.securityAuditRepository.resetAttempSecondFactor(userId, sessionParam);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
};
exports.SecurityAuditService = SecurityAuditService;
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SecurityAuditService.prototype, "createRegistrySecurityAudit", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SecurityAuditService.prototype, "updateRegistrySecurityAudit", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SecurityAuditService.prototype, "addAttempLogin", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SecurityAuditService.prototype, "resetAttempLogin", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SecurityAuditService.prototype, "addAttempSecondFactor", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SecurityAuditService.prototype, "resetAttempSecondFactor", null);
exports.SecurityAuditService = SecurityAuditService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ISecurityAuditRepository")),
    __param(1, (0, tsyringe_1.inject)("UserService")),
    __param(2, (0, tsyringe_1.inject)("TransactionManager")),
    __metadata("design:paramtypes", [Object, user_service_1.UserService,
        transactionManager_1.TransactionManager])
], SecurityAuditService);
//# sourceMappingURL=SecurityAudit.service.js.map