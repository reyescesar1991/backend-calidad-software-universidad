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
exports.SubrouteValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../../../exceptions");
let SubrouteValidator = class SubrouteValidator {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    static validateSubrouteInactiveStatus(subroute) {
        if (!subroute.active)
            throw new exceptions_1.SubrouteAlreadyInactiveError();
    }
    static validateSubrouteActiveStatus(subroute) {
        if (subroute.active)
            throw new exceptions_1.SubrouteAlreadyActiveError();
    }
    static validateSubrouteDelete(subroute) {
        if (!subroute)
            throw new exceptions_1.DeleteSubrouteError();
    }
    async validateSubrouteUniqueness(idSubroute) {
        const exists = await this.repository.findSubrouteByCustomId(idSubroute);
        if (exists)
            throw new exceptions_1.SubrouteDuplicateError("El ID de subruta ya existe, intente nuevamente con otro ID valido");
    }
    async validateSubroute(idSubroute) {
        const subroute = await this.repository.findSubrouteById(idSubroute);
        if (!subroute)
            throw new exceptions_1.SubrouteNotFoundError("Subruta no existe, intente con un ID valido");
        return subroute;
    }
};
exports.SubrouteValidator = SubrouteValidator;
exports.SubrouteValidator = SubrouteValidator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ISubrouteRepository")),
    __metadata("design:paramtypes", [Object])
], SubrouteValidator);
//# sourceMappingURL=subroute.validator.js.map