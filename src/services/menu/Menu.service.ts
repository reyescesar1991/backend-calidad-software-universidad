import { inject, injectable } from "tsyringe";
import { ISubrouteRepository } from "./interfaces/ISubroutesRepository";
import { ModuleDto, ModuleFilterSchemaZod, ModuleUpdateDto, ObjectIdParam, RouteDto, RouteUpdateDto, SubrouteDto, SubrouteFilterSchema, SubrouteUpdateDto } from "../../validations";
import { ModuleDocument, ModuleModel, RouteDocument, SubrouteDocument } from "../../db/models";
import { ModuleValidator, RouteValidator, SubrouteValidator } from "../../core/validators";
import { ActiveRouteInconsistencyError, FilterSubrouteError, handleError, SubrouteDuplicateError, SubrouteNotFoundByCustomIdError, SubrouteNotFoundByPermissionError, SubrouteNotFoundError, SubrouteRouteMatchError, SubroutesNotFoundedByMainRouteError, UnexpectedError } from "../../core/exceptions";
import { FilterOptions, ModuleFilterKeys, RouteFilterKeys, SubrouteFilterKeys } from "../../core/types";
import { IModuleRepository, IRouteRepository } from ".";
import { TransactionManager } from "../../core/database/transactionManager";
import { ClientSession } from "mongoose";
import { RoleConfigService } from "../roleConfig/roleConfig.service";
import { RoleService } from "../role/Role.service";

@injectable()
export class MenuService {


    constructor(@inject("ISubrouteRepository") private readonly subrouteRepository: ISubrouteRepository,
        @inject("SubrouteValidator") private readonly subrouteValidator: SubrouteValidator,
        @inject("RouteValidator") private readonly routeValidator: RouteValidator,
        @inject("IRouteRepository") private readonly routeRepository: IRouteRepository,
        @inject("ModuleValidator") private readonly moduleValidator: ModuleValidator,
        @inject("IModuleRepository") private readonly moduleRepository: IModuleRepository,
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        // @inject("RoleConfigService") private readonly roleConfigService : RoleConfigService,
        // @inject("RoleService") private readonly roleService : RoleService,
    ) { }

    async createSubroute(data: SubrouteDto): Promise<SubrouteDocument> {

        return this.transactionManager.executeTransaction(

            async (session) => {

                let createdSubroute: SubrouteDocument;

                try {

                    await this.subrouteValidator.validateSubrouteUniqueness(data.id);

                    // logger.info('Inicio creacion de subrouta', {

                    //     mainRoute: data.mainRoute,
                    //     subrouteId: data.id
                    // });

                    const mainRoute = await this.routeRepository.findRouteByCustomId(data.mainRoute);

                    RouteValidator.validateFoundRoute(mainRoute);

                    createdSubroute = await this.subrouteRepository.createSubroute(data);

                    const updateResult = await this.routeRepository.updateRouteAddSubroute(data, createdSubroute, session);

                    if (!updateResult) {
                        await this.subrouteRepository.deletePermanentlySubroute(createdSubroute._id);
                        throw new SubrouteRouteMatchError("La ruta padre no existe");
                    }

                    // logger.info('Ruta actualizada con nueva subruta', {

                    //     updateRoute: updateResult
                    // });

                    // logger.info("Subruta creada correctamente", {

                    //     subroute: createdSubroute,
                    // })

                    return createdSubroute;

                } catch (error) {

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
                        throw new SubrouteDuplicateError("El ID de subruta ya existe, intente nuevamente con otro ID");
                    }

                    if (createdSubroute) {
                        await this.subrouteRepository.deletePermanentlySubroute(createdSubroute._id);
                    }
                    throw error;
                }
            }
        )
    }

    async findSubrouteById(idSubroute: ObjectIdParam): Promise<SubrouteDocument | null> {

        try {

            const subroute = await this.subrouteValidator.validateSubroute(idSubroute);
            return subroute;

        } catch (error) {

            handleError(error);
        }
    }

    async updateSubroute(idSubroute: ObjectIdParam, data: SubrouteUpdateDto): Promise<SubrouteDocument | null> {

        return this.transactionManager.executeTransaction(

            async (session) => {

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

                    return subrouteUpdated

                } catch (error) {

                    handleError(error);
                }
            }
        )
    }

    async deleteSubroute(idSubroute: ObjectIdParam): Promise<SubrouteDocument | null> {

        const subroute = await this.subrouteValidator.validateSubroute(idSubroute);

        SubrouteValidator.validateSubrouteInactiveStatus(subroute);

        return await this.subrouteRepository.deleteSubroute(idSubroute);

    }

    async activeSubroute(idSubroute: ObjectIdParam): Promise<SubrouteDocument | null> {

        const subroute = await this.subrouteValidator.validateSubroute(idSubroute);

        SubrouteValidator.validateSubrouteActiveStatus(subroute);

        return await this.subrouteRepository.activeSubroute(idSubroute);
    }

    async getSubroutesByPermission(permissionKey: string): Promise<SubrouteDocument | null> {

        const subroute = await this.subrouteRepository.getSubroutesByPermission(permissionKey);

        if (!subroute) throw new SubrouteNotFoundByPermissionError();

        return subroute;
    }

    async searchSubroutesByFilters(filter: FilterOptions<SubrouteFilterKeys>): Promise<SubrouteDocument[] | null> {

        const result = SubrouteFilterSchema.safeParse(filter);

        if (!result.success) {

            const errors = result.error.errors.map(e => `${e.path[0]}: ${e.message}`);
            console.log(errors);
            throw new FilterSubrouteError(`Filtro inválido:\n- ${errors.join('\n- ')}`);
        }

        return this.subrouteRepository.searchSubroutesByFilters(filter);
    }

    async listSubroutes(): Promise<SubrouteDocument[] | null> {

        return await this.subrouteRepository.listSubroutes();
    }

    async searchSubroutesByMainRoute(mainRoute: string): Promise<SubrouteDocument[] | null> {


        const MainRouteSchema = SubrouteFilterSchema.pick({ mainRoute: true });

        // Uso:
        const result = MainRouteSchema.safeParse({ mainRoute: mainRoute });

        if (!result.success) {
            console.log("Error en mainRoute:", result.error);
        } else {
            console.log("MainRoute válido:", result.data.mainRoute);
        }

        const subroutes = await this.subrouteRepository.searchSubroutesByMainRoute(mainRoute);

        if (subroutes.length === 0) {

            throw new SubroutesNotFoundedByMainRouteError();
        }

        return subroutes;
    }

    async findSubrouteByCustomId(customId: string): Promise<SubrouteDocument | null> {

        const subroute = await this.subrouteRepository.findSubrouteByCustomId(customId);

        if (!subroute) throw new SubrouteNotFoundByCustomIdError();

        return subroute;
    }

    async deletePermanentlySubroute(idSubroute: ObjectIdParam): Promise<SubrouteDocument | null> {


        return this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const subroute = await this.subrouteRepository.findSubrouteById(idSubroute);

                    if (!subroute) throw new SubrouteNotFoundError();

                    const route = await this.routeRepository.findRouteByCustomId(subroute.mainRoute);

                    await this.routeRepository.updateRouteDeleteSubroute(route, subroute);

                    const deleteSubroute = await this.subrouteRepository.deletePermanentlySubroute(idSubroute, session);

                    SubrouteValidator

                    return deleteSubroute;

                } catch (error) {

                    handleError(error);
                }
            }
        )

    }



    //routes

    async createRoute(data: RouteDto): Promise<RouteDocument> {

        return await this.transactionManager.executeTransaction(

            async (session) => {

                const dataName: FilterOptions<RouteFilterKeys> = {

                    name: data.name
                }

                let createdRoute: RouteDocument;

                try {

                    await this.routeValidator.validateUniquenessRoute(data.id);

                    await this.routeValidator.validateUniquenessNameRoute(dataName);

                    createdRoute = await this.routeRepository.createRoute(data, session);

                    this.moduleRepository.updateModuleAddRoute(data, createdRoute, session);
                    
                    console.log(module);

                    return createdRoute

                } catch (error) {

                    if (error.code === 11000) {
                        throw new SubrouteDuplicateError("El ID de ruta ya existe, intente nuevamente con otro ID");
                    }

                    handleError(error);
                }
            }
        )
    }

    async findRouteById(idRoute: ObjectIdParam): Promise<RouteDocument | null> {

        try {
            const route = await this.routeRepository.findRouteById(idRoute);

            RouteValidator.validateFoundRoute(route);

            return route;

        } catch (error) {

            handleError(error);

        }

    }

    async updateRouteById(idRoute: ObjectIdParam, data: RouteUpdateDto): Promise<RouteDocument | null> {


        return await this.transactionManager.executeTransaction(

            async (session) => {


                try {

                    const route = await this.routeRepository.findRouteById(idRoute);

                    RouteValidator.validateFoundRoute(route);

                    if (data.active !== undefined && route.active === data.active) throw new ActiveRouteInconsistencyError();

                    const dataName: FilterOptions<RouteFilterKeys> = {

                        name: data.name
                    }

                    await this.routeValidator.validateUniquenessNameRoute(dataName);

                    const currentModule = await this.moduleRepository.findModuleByCustomId(route.idModule);

                    console.log("Modulo actual : ", currentModule);
                    

                    if (data.idModule !== undefined) {

                        const module = await ModuleModel.findOne(
                            { id: data.idModule }
                        )

                        console.log("Modulo futuro: ", module);


                        ModuleValidator.validateFoundModule(module);


                        this.moduleRepository.updateModuleAddRoute(data, route, session);


                        this.moduleRepository.updateModuleDeleteRoute(currentModule, route, session);

                    }

                    const updateRoute = await this.routeRepository.updateRouteById(idRoute, data, session);

                    return updateRoute;


                } catch (error) {

                    handleError(error)
                }

            }
        )
    }

    async deleteRoute(idRoute: ObjectIdParam): Promise<RouteDocument | null> {

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const route = await this.routeRepository.findRouteById(idRoute);

                    RouteValidator.validateFoundRoute(route);

                    RouteValidator.validateStatusInactiveRoute(route);

                    const deleteRoute = await this.routeRepository.deleteRoute(idRoute, session);

                    return deleteRoute;

                } catch (error) {

                    throw new UnexpectedError(error);
                }
            }
        )
    }


    async activateRoute(idRoutes: ObjectIdParam): Promise<RouteDocument | null> {


        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const route = await this.routeRepository.findRouteById(idRoutes);

                    RouteValidator.validateFoundRoute(route);

                    RouteValidator.validateActiveStatusRoute(route);

                    const routeActive = await this.routeRepository.activateRoute(idRoutes, session);

                    return routeActive;


                } catch (error) {

                    handleError(error);
                }
            }
        )
    }

    async getSubroutesWithIdRoute(idRoute: ObjectIdParam): Promise<SubrouteDocument[] | null> {

        try {

            const route = await this.routeRepository.findRouteById(idRoute);

            RouteValidator.validateFoundRoute(route);

            const subroutes = await this.routeRepository.getSubroutesWithIdRoute(idRoute);

            return subroutes;

        } catch (error) {

            handleError(error);
        }
    }

    async findRouteByCustomId(customId: string): Promise<RouteDocument | null> {


        try {

            const route = await this.routeRepository.findRouteByCustomId(customId);

            RouteValidator.validateFoundRoute(route);

            return route;


        } catch (error) {

            handleError(error)
        }
    }

    async searchRoutesByFilters(filter: FilterOptions<RouteFilterKeys>): Promise<RouteDocument[] | null> {

        try {

            RouteValidator.validateFilterOptionsRoute(filter);

            return this.routeRepository.searchRoutesByFilters(filter);

        } catch (error) {

            handleError(error);
        }
    }

    async listRoutes(): Promise<RouteDocument[] | null> {

        try {

            const routes = await this.routeRepository.listRoutes();

            RouteValidator.validateExistingRoutes(routes);

            return routes;

        } catch (error) {

            handleError(error);
        }
    }

    //MODULESSSSSSSSSSSSSSSSS

    async findModuleById(idModule: ObjectIdParam): Promise<ModuleDocument | null> {

        try {

            const module = await this.moduleRepository.findModuleById(idModule);

            ModuleValidator.validateFoundModule(module);

            return module;

        } catch (error) {

            handleError(error);

        }
    }

    async findModuleByCustomId(customIdModule: string): Promise<ModuleDocument | null> {

        try {

            const module = await this.moduleRepository.findModuleByCustomId(customIdModule);

            ModuleValidator.validateFoundModule(module);

            return module;

        } catch (error) {

            handleError(error);
        }
    }

    async searchModuleByFilter(filter: FilterOptions<ModuleFilterKeys>): Promise<ModuleDocument[] | null> {

        try {

            ModuleValidator.validateModuleFilter(filter);

            const modules = await this.moduleRepository.searchModuleByFilter(filter);

            ModuleValidator.validateFoundModules(modules);

            return modules;

        } catch (error) {

            handleError(error);
        }
    }

    async createModule(data: ModuleDto): Promise<ModuleDocument | null> {

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    await this.moduleValidator.validateUniquenessesModule(data.id);

                    const module = await this.moduleRepository.createModule(data, session);

                    return module;

                } catch (error) {

                    handleError(error);

                }
            }
        )
    }

    async updateModule(idModule: ObjectIdParam, data: ModuleUpdateDto): Promise<ModuleDocument | null> {

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const moduleFounded = await this.moduleRepository.findModuleById(idModule);

                    ModuleValidator.validateFoundModule(moduleFounded);

                    const moduleUpdated = await this.moduleRepository.updateModule(idModule, data, session);

                    return moduleUpdated;

                } catch (error) {

                    if (error.code === 11000) {
                        throw new SubrouteDuplicateError("El ID de subruta ya existe, intente nuevamente con otro ID");
                    }

                    handleError(error)
                }
            }
        )
    }

    async activateModule(idModule: ObjectIdParam) : Promise<ModuleDocument | null>{

        return await this.transactionManager.executeTransaction(

            async (session) => {


                try {

                    const moduleFounded = await this.moduleRepository.findModuleById(idModule);

                    ModuleValidator.validateFoundModule(moduleFounded);

                    ModuleValidator.validateStatusModuleActive(moduleFounded);

                    return await this.moduleRepository.activateModule(idModule, session);

                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }

    async deleteModule(idModule : ObjectIdParam) : Promise<ModuleDocument | null>{


        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const moduleFounded = await this.moduleRepository.findModuleById(idModule);

                    ModuleValidator.validateFoundModule(moduleFounded);

                    ModuleValidator.validateStatusModuleInactive(moduleFounded);

                    return await this.moduleRepository.deleteModule(idModule, session);

                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }


    async getRoutesByModule(idModule: ObjectIdParam) : Promise<RouteDocument[] | null>{

        try {

            const moduleFounded = await this.moduleRepository.findModuleById(idModule);

            ModuleValidator.validateFoundModule(moduleFounded);

            return await this.moduleRepository.getRoutesByModule(idModule);

        } catch (error) {
            
            handleError(error);
        }
    }

    async getSubroutesByPermissionKeys(permissionLabels: string[]): Promise<SubrouteDocument[]>{

        try {

            return await this.subrouteRepository.getSubroutesByPermissionKeys(permissionLabels);
            
        } catch (error) {
            
            handleError(error);
        }
    }
}