"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityAuditValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../exceptions");
let SecurityAuditValidator = class SecurityAuditValidator {
    static validateStatusUser2FA(registryAudit) {
        if (registryAudit.twoFactorVerifiedUntil < new Date())
            throw new exceptions_1.UnauthorizedException2FAError();
    }
    static validateSecurityAuditRegistryExists(registryAudit) {
        if (!registryAudit)
            throw new exceptions_1.RegistryAuditNotFoundError();
    }
    static validateSecurityAuditAttempsUserSecondFactor(registryAudit) {
        if (registryAudit.secondFactorAttempts >= 3)
            throw new exceptions_1.RegistryAuditSecondFactorAttempsIsAlreadyMaxError();
    }
};
exports.SecurityAuditValidator = SecurityAuditValidator;
exports.SecurityAuditValidator = SecurityAuditValidator = __decorate([
    (0, tsyringe_1.injectable)()
], SecurityAuditValidator);
//# sourceMappingURL=securityAudit.validator.js.map