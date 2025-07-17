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
exports.HeadquarterValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../exceptions");
const headquarterFilterValidator_1 = require("../../../validations/sharedValidators/headquarterFilterValidator");
let HeadquarterValidator = class HeadquarterValidator {
    headquarterRepository;
    /*
        Usa un enfoque de ahorro de consultas, pero no siempre es valido, se pierde URP pero se gana eficiencia
    */
    constructor(headquarterRepository) {
        this.headquarterRepository = headquarterRepository;
    }
    static validateFilterOptionsHeadquarter(filter) {
        const resultSchema = headquarterFilterValidator_1.HeadquarterFilterSchema.safeParse(filter);
        if (!resultSchema.success) {
            const errors = resultSchema.error.errors.map(e => `${e.path[0]}: ${e.message}`);
            console.log(errors);
            throw new exceptions_1.FilterHeadquarterError(`Filtro inválido:\n- ${errors.join('\n- ')}`);
        }
    }
    async validateHeadquarterExists(idHeadquarter) {
        const headquarter = await this.headquarterRepository.findHeadquarterById(idHeadquarter);
        if (!headquarter)
            throw new exceptions_1.HeadquarterNotExistsError();
        return headquarter;
    }
    async validateHeadquarterUniqueness(idHeadquarter) {
        const headquarter = await this.headquarterRepository.findHeadquarterByCustomId(idHeadquarter);
        if (headquarter)
            throw new exceptions_1.HeadquarterAlreadyExistsError();
    }
    async validateHeadquarterExistsWithCustomId(idHeadquarter) {
        const headquarter = await this.headquarterRepository.findHeadquarterByCustomId(idHeadquarter);
        if (!headquarter)
            throw new exceptions_1.HeadquarterNotExistsError();
        return headquarter;
    }
    async validateHeadquarterIsAlreadyActive(idHeadquarter) {
        const headquarter = await this.headquarterRepository.findHeadquarterById(idHeadquarter);
        if (!headquarter.isActive)
            return headquarter.isActive;
        throw new exceptions_1.HeadquarterIsAlreadyActiveError();
    }
    async validateHeadquarterIsAlreadyDesactive(idHeadquarter) {
        const headquarter = await this.headquarterRepository.findHeadquarterById(idHeadquarter);
        if (headquarter.isActive)
            return headquarter.isActive;
        throw new exceptions_1.HeadquarterIsAlreadyDesactiveError();
    }
    async validateHeadquartersByFilter(filter) {
        const headquarters = await this.headquarterRepository.searchHeadquarterByFilter(filter);
        if (headquarters.length < 1)
            throw new exceptions_1.HeadquartersByFilterNotFoudError();
        return headquarters;
    }
    async validateHeadquarterUniqueKeys(filter) {
        const headquarter = await this.headquarterRepository.searchHeadquarterByFilterWithOr(filter);
        console.log(headquarter);
        if (headquarter.length >= 1)
            throw new exceptions_1.HeadquarterKeysAlreadyExistError();
    }
    async validateHeadquartersList() {
        const headquarters = await this.headquarterRepository.listHeadquarter();
        if (headquarters.length < 1)
            throw new exceptions_1.HeadquartersListNotFoudError();
        return headquarters;
    }
};
exports.HeadquarterValidator = HeadquarterValidator;
exports.HeadquarterValidator = HeadquarterValidator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IHeadquarterRepository")),
    __metadata("design:paramtypes", [Object])
], HeadquarterValidator);
//# sourceMappingURL=headquarter.validator.js.map