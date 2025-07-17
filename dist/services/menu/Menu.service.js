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
exports.MenuService = void 0;
const tsyringe_1 = require("tsyringe");
const validations_1 = require("../../validations");
const models_1 = require("../../db/models");
const validators_1 = require("../../core/validators");
const exceptions_1 = require("../../core/exceptions");
const transactionManager_1 = require("../../core/database/transactionManager");
let MenuService = class MenuService {
    subrouteRepository;
    subrouteValidator;
    routeValidator;
    routeRepository;
    moduleValidator;
    moduleRepository;
    transactionManager;
    constructor(subrouteRepository, subrouteValidator, routeValidator, routeRepository, moduleValidator, moduleRepository, transactionManager) {
        this.subrouteRepository = subrouteRepository;
        this.subrouteValidator = subrouteValidator;
        this.routeValidator = routeValidator;
        this.routeRepository = routeRepository;
        this.moduleValidator = moduleValidator;
        this.moduleRepository = moduleRepository;
        this.transactionManager = transactionManager;
    }
    async createSubroute(data) {
        return this.transactionManager.executeTransaction(async (session) => {
            let createdSubroute;
            try {
                await this.subrouteValidator.validateSubrouteUniqueness(data.id);
                // logger.info('Inicio creacion de subrouta', {
                //     mainRoute: data.mainRoute,
                //     subrouteId: data.id
                // });
                const mainRoute = await this.routeRepository.findRouteByCustomId(data.mainRoute);
                validators_1.RouteValidator.validateFoundRoute(mainRoute);
                createdSubroute = await this.subrouteRepository.createSubroute(data);
                const updateResult = await this.routeRepository.updateRouteAddSubroute(data, createdSubroute, session);
                if (!updateResult) {
                    await this.subrouteRepository.deletePermanentlySubroute(createdSubroute._id);
                    throw new exceptions_1.SubrouteRouteMatchError("La ruta padre no existe");
                }
                // logger.info('Ruta actualizada con nueva subruta', {
                //     updateRoute: updateResult
                // });
                // logger.info("Subruta creada correctamente", {
                //     subroute: createdSubroute,
                // })
                return createdSubroute;
            }
            catch (error) {
                const errorDetails = {
                    name: error.name || "UnknownError",
                    message: error.message || "No message provided",
                    code: error.code || "No code",
                    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
                };
                // logger.error('Error crítico en creación de la subruta', {
                //     subrouteId: data.id,
                //     error: errorDetails
                // });
                if (error.code === 11000) {
                    throw new exceptions_1.SubrouteDuplicateError("El ID de subruta ya existe, intente nuevamente con otro ID");
                }
                if (createdSubroute) {
                    await this.subrouteRepository.deletePermanentlySubroute(createdSubroute._id);
                }
                throw error;
            }
        });
    }
    async findSubrouteById(idSubroute) {
        try {
            const subroute = await this.subrouteValidator.validateSubroute(idSubroute);
            return subroute;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async updateSubroute(idSubroute, data) {
        return this.transactionManager.executeTransaction(async (session) => {
            await this.subrouteValidator.validateSubroute(idSubroute);
            try {
                // return subrouteUpdated;
                if (data.mainRoute) {
                    console.log("Existe el campo main route para actualizar");
                    const updateRoute = await this.routeRepository.findRouteByCustomId(data.mainRoute);
                    console.log("Ruta destino para actualizar", updateRoute);
                    const actualSubroute = await this.subrouteRepository.findSubrouteById(idSubroute);
                    console.log("Subruta actual", actualSubroute);
                    const actualRoute = await this.routeRepository.findRouteByCustomId(actualSubroute.mainRoute);
                    console.log("Ruta actual : ", actualRoute);
                    await this.routeRepository.updateRouteAddSubroute(data, actualSubroute, session);
                    await this.routeRepository.updateRouteDeleteSubroute(actualRoute, actualSubroute);
                }
                const subrouteUpdated = await this.subrouteRepository.updateSubroute(idSubroute, data);
                return subrouteUpdated;
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async deleteSubroute(idSubroute) {
        const subroute = await this.subrouteValidator.validateSubroute(idSubroute);
        validators_1.SubrouteValidator.validateSubrouteInactiveStatus(subroute);
        return await this.subrouteRepository.deleteSubroute(idSubroute);
    }
    async activeSubroute(idSubroute) {
        const subroute = await this.subrouteValidator.validateSubroute(idSubroute);
        validators_1.SubrouteValidator.validateSubrouteActiveStatus(subroute);
        return await this.subrouteRepository.activeSubroute(idSubroute);
    }
    async getSubroutesByPermission(permissionKey) {
        const subroute = await this.subrouteRepository.getSubroutesByPermission(permissionKey);
        if (!subroute)
            throw new exceptions_1.SubrouteNotFoundByPermissionError();
        return subroute;
    }
    async searchSubroutesByFilters(filter) {
        const result = validations_1.SubrouteFilterSchema.safeParse(filter);
        if (!result.success) {
            const errors = result.error.errors.map(e => `${e.path[0]}: ${e.message}`);
            console.log(errors);
            throw new exceptions_1.FilterSubrouteError(`Filtro inválido:\n- ${errors.join('\n- ')}`);
        }
        return this.subrouteRepository.searchSubroutesByFilters(filter);
    }
    async listSubroutes() {
        return await this.subrouteRepository.listSubroutes();
    }
    async searchSubroutesByMainRoute(mainRoute) {
        const MainRouteSchema = validations_1.SubrouteFilterSchema.pick({ mainRoute: true });
        // Uso:
        const result = MainRouteSchema.safeParse({ mainRoute: mainRoute });
        if (!result.success) {
            console.log("Error en mainRoute:", result.error);
        }
        else {
            console.log("MainRoute válido:", result.data.mainRoute);
        }
        const subroutes = await this.subrouteRepository.searchSubroutesByMainRoute(mainRoute);
        if (subroutes.length === 0) {
            throw new exceptions_1.SubroutesNotFoundedByMainRouteError();
        }
        return subroutes;
    }
    async findSubrouteByCustomId(customId) {
        const subroute = await this.subrouteRepository.findSubrouteByCustomId(customId);
        if (!subroute)
            throw new exceptions_1.SubrouteNotFoundByCustomIdError();
        return subroute;
    }
    async deletePermanentlySubroute(idSubroute) {
        return this.transactionManager.executeTransaction(async (session) => {
            try {
                const subroute = await this.subrouteRepository.findSubrouteById(idSubroute);
                if (!subroute)
                    throw new exceptions_1.SubrouteNotFoundError();
                const route = await this.routeRepository.findRouteByCustomId(subroute.mainRoute);
                await this.routeRepository.updateRouteDeleteSubroute(route, subroute);
                const deleteSubroute = await this.subrouteRepository.deletePermanentlySubroute(idSubroute, session);
                validators_1.SubrouteValidator;
                return deleteSubroute;
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    //routes
    async createRoute(data) {
        return await this.transactionManager.executeTransaction(async (session) => {
            const dataName = {
                name: data.name
            };
            let createdRoute;
            try {
                await this.routeValidator.validateUniquenessRoute(data.id);
                await this.routeValidator.validateUniquenessNameRoute(dataName);
                createdRoute = await this.routeRepository.createRoute(data, session);
                this.moduleRepository.updateModuleAddRoute(data, createdRoute, session);
                console.log(module);
                return createdRoute;
            }
            catch (error) {
                if (error.code === 11000) {
                    throw new exceptions_1.SubrouteDuplicateError("El ID de ruta ya existe, intente nuevamente con otro ID");
                }
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async findRouteById(idRoute) {
        try {
            const route = await this.routeRepository.findRouteById(idRoute);
            validators_1.RouteValidator.validateFoundRoute(route);
            return route;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async updateRouteById(idRoute, data) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const route = await this.routeRepository.findRouteById(idRoute);
                validators_1.RouteValidator.validateFoundRoute(route);
                if (data.active !== undefined && route.active === data.active)
                    throw new exceptions_1.ActiveRouteInconsistencyError();
                const dataName = {
                    name: data.name
                };
                await this.routeValidator.validateUniquenessNameRoute(dataName);
                const currentModule = await this.moduleRepository.findModuleByCustomId(route.idModule);
                console.log("Modulo actual : ", currentModule);
                if (data.idModule !== undefined) {
                    const module = await models_1.ModuleModel.findOne({ id: data.idModule });
                    console.log("Modulo futuro: ", module);
                    validators_1.ModuleValidator.validateFoundModule(module);
                    this.moduleRepository.updateModuleAddRoute(data, route, session);
                    this.moduleRepository.updateModuleDeleteRoute(currentModule, route, session);
                }
                const updateRoute = await this.routeRepository.updateRouteById(idRoute, data, session);
                return updateRoute;
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async deleteRoute(idRoute) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const route = await this.routeRepository.findRouteById(idRoute);
                validators_1.RouteValidator.validateFoundRoute(route);
                validators_1.RouteValidator.validateStatusInactiveRoute(route);
                const deleteRoute = await this.routeRepository.deleteRoute(idRoute, session);
                return deleteRoute;
            }
            catch (error) {
                throw new exceptions_1.UnexpectedError(error);
            }
        });
    }
    async activateRoute(idRoutes) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const route = await this.routeRepository.findRouteById(idRoutes);
                validators_1.RouteValidator.validateFoundRoute(route);
                validators_1.RouteValidator.validateActiveStatusRoute(route);
                const routeActive = await this.routeRepository.activateRoute(idRoutes, session);
                return routeActive;
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async getSubroutesWithIdRoute(idRoute) {
        try {
            const route = await this.routeRepository.findRouteById(idRoute);
            validators_1.RouteValidator.validateFoundRoute(route);
            const subroutes = await this.routeRepository.getSubroutesWithIdRoute(idRoute);
            return subroutes;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findRouteByCustomId(customId) {
        try {
            const route = await this.routeRepository.findRouteByCustomId(customId);
            validators_1.RouteValidator.validateFoundRoute(route);
            return route;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async searchRoutesByFilters(filter) {
        try {
            validators_1.RouteValidator.validateFilterOptionsRoute(filter);
            return this.routeRepository.searchRoutesByFilters(filter);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async listRoutes() {
        try {
            const routes = await this.routeRepository.listRoutes();
            validators_1.RouteValidator.validateExistingRoutes(routes);
            return routes;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    //MODULESSSSSSSSSSSSSSSSS
    async findModuleById(idModule) {
        try {
            const module = await this.moduleRepository.findModuleById(idModule);
            validators_1.ModuleValidator.validateFoundModule(module);
            return module;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findModuleByCustomId(customIdModule) {
        try {
            const module = await this.moduleRepository.findModuleByCustomId(customIdModule);
            validators_1.ModuleValidator.validateFoundModule(module);
            return module;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async searchModuleByFilter(filter) {
        try {
            validators_1.ModuleValidator.validateModuleFilter(filter);
            const modules = await this.moduleRepository.searchModuleByFilter(filter);
            validators_1.ModuleValidator.validateFoundModules(modules);
            return modules;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async createModule(data) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                await this.moduleValidator.validateUniquenessesModule(data.id);
                const module = await this.moduleRepository.createModule(data, session);
                return module;
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async updateModule(idModule, data) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const moduleFounded = await this.moduleRepository.findModuleById(idModule);
                validators_1.ModuleValidator.validateFoundModule(moduleFounded);
                const moduleUpdated = await this.moduleRepository.updateModule(idModule, data, session);
                return moduleUpdated;
            }
            catch (error) {
                if (error.code === 11000) {
                    throw new exceptions_1.SubrouteDuplicateError("El ID de subruta ya existe, intente nuevamente con otro ID");
                }
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async activateModule(idModule) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const moduleFounded = await this.moduleRepository.findModuleById(idModule);
                validators_1.ModuleValidator.validateFoundModule(moduleFounded);
                validators_1.ModuleValidator.validateStatusModuleActive(moduleFounded);
                return await this.moduleRepository.activateModule(idModule, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async deleteModule(idModule) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                const moduleFounded = await this.moduleRepository.findModuleById(idModule);
                validators_1.ModuleValidator.validateFoundModule(moduleFounded);
                validators_1.ModuleValidator.validateStatusModuleInactive(moduleFounded);
                return await this.moduleRepository.deleteModule(idModule, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async getRoutesByModule(idModule) {
        try {
            const moduleFounded = await this.moduleRepository.findModuleById(idModule);
            validators_1.ModuleValidator.validateFoundModule(moduleFounded);
            return await this.moduleRepository.getRoutesByModule(idModule);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async getSubroutesByPermissionKeys(permissionLabels) {
        try {
            return await this.subrouteRepository.getSubroutesByPermissionKeys(permissionLabels);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async getRoutesByMainRouteIds(mainRouteIds) {
        try {
            return await this.routeRepository.getRoutesByMainRouteIds(mainRouteIds);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async getModulesByUserModules(mainModulesIds) {
        try {
            return await this.moduleRepository.getModulesByMainModuleIds(mainModulesIds);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ISubrouteRepository")),
    __param(1, (0, tsyringe_1.inject)("SubrouteValidator")),
    __param(2, (0, tsyringe_1.inject)("RouteValidator")),
    __param(3, (0, tsyringe_1.inject)("IRouteRepository")),
    __param(4, (0, tsyringe_1.inject)("ModuleValidator")),
    __param(5, (0, tsyringe_1.inject)("IModuleRepository")),
    __param(6, (0, tsyringe_1.inject)("TransactionManager")),
    __metadata("design:paramtypes", [Object, validators_1.SubrouteValidator,
        validators_1.RouteValidator, Object, validators_1.ModuleValidator, Object, transactionManager_1.TransactionManager])
], MenuService);
//# sourceMappingURL=Menu.service.js.map