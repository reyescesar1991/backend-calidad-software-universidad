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
exports.RouteValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../exceptions");
const validations_1 = require("../../../validations");
let RouteValidator = class RouteValidator {
    routeRepository;
    constructor(routeRepository) {
        this.routeRepository = routeRepository;
    }
    async validateUniquenessRoute(customIdRoute) {
        const existsRoute = await this.routeRepository.findRouteByCustomId(customIdRoute);
        if (existsRoute)
            throw new exceptions_1.RouteAlreadyExistsError();
    }
    static validateFoundRoute(route) {
        if (!route)
            throw new exceptions_1.RouteNotExistsError();
    }
    static validateStatusInactiveRoute(route) {
        if (!route.active)
            throw new exceptions_1.RouteAlreadyInactiveError();
    }
    static validateFilterOptionsRoute(filter) {
        const result = validations_1.RouteFilterSchemaZod.safeParse(filter);
        if (!result.success) {
            const errors = result.error.errors.map(e => `${e.path[0]}: ${e.message}`);
            console.log(errors);
            throw new exceptions_1.FilterOptionsRouteNotValid(`Filtro inválido:\n- ${errors.join('\n- ')}`);
        }
    }
    static validateExistingRoutes(routes) {
        if (routes.length === 0)
            throw new exceptions_1.NotExistsRoutesDatabaseError();
    }
    static validateActiveStatusRoute(route) {
        if (route.active)
            throw new exceptions_1.RouteAlreadyActiveError();
    }
    async validateUniquenessNameRoute(filter) {
        const existsName = await this.routeRepository.searchRoutesByFilters(filter);
        console.log(existsName);
        if (existsName.length > 0)
            throw new exceptions_1.RouteNameAlreadyExistsError();
    }
};
exports.RouteValidator = RouteValidator;
exports.RouteValidator = RouteValidator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IRouteRepository")),
    __metadata("design:paramtypes", [Object])
], RouteValidator);
//# sourceMappingURL=route.validator.js.map