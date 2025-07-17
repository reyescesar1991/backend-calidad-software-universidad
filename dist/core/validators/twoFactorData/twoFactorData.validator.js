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
exports.TwoFactorDataValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../exceptions");
let TwoFactorDataValidator = class TwoFactorDataValidator {
    twoFactorDataRepository;
    constructor(twoFactorDataRepository) {
        this.twoFactorDataRepository = twoFactorDataRepository;
    }
    static validateTwoFactorDataBase(twoFactorDataBase) {
        if (twoFactorDataBase.length < 1)
            throw new exceptions_1.TwoFactorDataNotFoundInDatabaseError();
    }
    static validateFactorExists(factor) {
        if (!factor)
            throw new exceptions_1.TwoFactorDataNotExistsError();
    }
    static validateNewFactorQuantity(factorQuantity) {
        if (factorQuantity > 0)
            throw new exceptions_1.TwoFactorDataQuantityNewFactorError();
    }
    static validateFactorExistsByMethod(factor) {
        if (!factor)
            throw new exceptions_1.TwoFactorDataNotFoundByMethodError();
    }
    static validateFactorAlreadyEnable(factor) {
        if (factor.isEnabled)
            throw new exceptions_1.TwoFactorDataAlreadyEnableError();
    }
    static validateFactorAlreadyDisable(factor) {
        if (!factor.isEnabled)
            throw new exceptions_1.TwoFactorDataAlreadyDisableError();
    }
    async validateFactorUniquenessByMethod(method) {
        const factorExists = await this.twoFactorDataRepository.findFactorByMethod(method);
        if (factorExists)
            throw new exceptions_1.TwoFactorDataAlreadyExistsByMethodError();
    }
};
exports.TwoFactorDataValidator = TwoFactorDataValidator;
exports.TwoFactorDataValidator = TwoFactorDataValidator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ITwoFactorDataRepository")),
    __metadata("design:paramtypes", [Object])
], TwoFactorDataValidator);
//# sourceMappingURL=twoFactorData.validator.js.map