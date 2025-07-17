"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorValueValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../exceptions");
let TwoFactorValueValidator = class TwoFactorValueValidator {
    static validateTwoFactorDataBaseNotExists(twoFactorValueUser) {
        if (!twoFactorValueUser)
            throw new exceptions_1.UserTwoFactorValueNotFoundError();
    }
    static validateTwoFactorDataBaseExists(twoFactorValueUser) {
        if (twoFactorValueUser)
            throw new exceptions_1.UserTwoFactorValueFoundError();
    }
};
exports.TwoFactorValueValidator = TwoFactorValueValidator;
exports.TwoFactorValueValidator = TwoFactorValueValidator = __decorate([
    (0, tsyringe_1.injectable)()
], TwoFactorValueValidator);
//# sourceMappingURL=twoFactorValue.validator.js.map