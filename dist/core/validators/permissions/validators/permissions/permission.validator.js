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
var PermissionValidator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionValidator = void 0;
const zod_1 = require("zod");
const exceptions_1 = require("../../../../exceptions");
const labelSchema_zod_1 = require("../../schemas/labelSchema.zod");
const tsyringe_1 = require("tsyringe");
let PermissionValidator = class PermissionValidator {
    static { PermissionValidator_1 = this; }
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    static UNIQUE_FIELDS = {
        label: exceptions_1.LabelDuplicateError,
        permission: exceptions_1.PermissionDuplicateError,
    };
    static validateIsActive(permission) {
        if (!permission.isActive) {
            throw new exceptions_1.PermissionAlreadyInactiveError();
        }
    }
    static validateExistsPermission(permission) {
        if (!permission)
            throw new exceptions_1.PermissionNotFoundError();
    }
    static validateLabelFormat(label) {
        try {
            console.log(label);
            labelSchema_zod_1.labelSchema.parse({ label: label });
        }
        catch (error) {
            console.log(error);
            if (error instanceof zod_1.z.ZodError) {
                console.log(error);
                throw new exceptions_1.LabelInvalidError("Formato de label inválido: ", error.errors);
            }
            throw error;
        }
    }
    async validateUniqueField(field, value) {
        const exists = await this.repository.findByField(field, value);
        ;
        if (exists) {
            const ErrorClass = PermissionValidator_1.UNIQUE_FIELDS[field];
            throw new ErrorClass(`El ${field} '${value}' ya existe, intente con otro valor`);
        }
    }
};
exports.PermissionValidator = PermissionValidator;
exports.PermissionValidator = PermissionValidator = PermissionValidator_1 = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IPermissionRepository")),
    __metadata("design:paramtypes", [Object])
], PermissionValidator);
//# sourceMappingURL=permission.validator.js.map