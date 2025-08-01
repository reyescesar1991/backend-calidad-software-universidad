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
exports.SessionManagementValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../exceptions");
let SessionManagementValidator = class SessionManagementValidator {
    sessionManagementRepository;
    constructor(sessionManagementRepository) {
        this.sessionManagementRepository = sessionManagementRepository;
    }
    static validateUserAlreadyHaveASessionActive(sessionUser) {
        if (sessionUser)
            throw new exceptions_1.UserAlreadyHaveASessionError();
    }
    static validateUserIsNotAlreadyHaveASessionActive(sessionUser) {
        if (!sessionUser)
            throw new exceptions_1.UserAlreadyNotHaveASessionError();
    }
    async validateUserTokenIsValid(customUserId, tokenParam) {
        const sessionLogged = await this.sessionManagementRepository.getSessionUserValidate(customUserId);
        if (sessionLogged.token !== tokenParam)
            throw new exceptions_1.UserSessionTokenIsNotValid();
    }
    async validateUserIsLogged(customUserId) {
        const sessionLogged = await this.sessionManagementRepository.getSessionUserValidate(customUserId);
        if (!sessionLogged)
            throw new exceptions_1.UserIsNotLoggedError();
    }
};
exports.SessionManagementValidator = SessionManagementValidator;
exports.SessionManagementValidator = SessionManagementValidator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ISessionManagementRepository")),
    __metadata("design:paramtypes", [Object])
], SessionManagementValidator);
//# sourceMappingURL=sessionManagement.validator.js.map