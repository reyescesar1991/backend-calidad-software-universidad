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
exports.ModuleValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../exceptions");
const validations_1 = require("../../../validations");
let ModuleValidator = class ModuleValidator {
    moduleRepository;
    constructor(moduleRepository) {
        this.moduleRepository = moduleRepository;
    }
    static validateFoundModule(module) {
        if (!module)
            throw new exceptions_1.ModuleNotFoundError();
    }
    static validateModuleFilter(filter) {
        const resultSchema = validations_1.ModuleFilterSchemaZod.safeParse(filter);
        if (!resultSchema.success) {
            const errors = resultSchema.error.errors.map(e => `${e.path[0]}: ${e.message}`);
            console.log(errors);
            throw new exceptions_1.FilterModuleError(`Filtro inválido:\n- ${errors.join('\n- ')}`);
        }
    }
    static validateFoundModules(modules) {
        if (modules.length === 0)
            throw new exceptions_1.ModulesNotFoundByFilterError();
    }
    static validateStatusModuleActive(module) {
        if (module.active)
            throw new exceptions_1.ModuleAlreadyActiveError();
    }
    static validateStatusModuleInactive(module) {
        if (!module.active)
            throw new exceptions_1.ModuleAlreadyInactiveError();
    }
    async validateUniquenessesModule(customId) {
        const exists = await this.moduleRepository.findModuleByCustomId(customId);
        if (exists)
            throw new exceptions_1.ModuleAlreadyExistsError();
    }
};
exports.ModuleValidator = ModuleValidator;
exports.ModuleValidator = ModuleValidator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IModuleRepository")),
    __metadata("design:paramtypes", [Object])
], ModuleValidator);
//# sourceMappingURL=module.validator.js.map