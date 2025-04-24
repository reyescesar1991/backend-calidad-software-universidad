import { inject, injectable } from "tsyringe";
import { ISubrouteRepository } from "./interfaces/ISubroutesRepository";
import { ObjectIdParam, RouteDto, RouteUpdateDto, SubrouteDto, SubrouteFilterSchema, SubrouteUpdateDto } from "../../validations";
import { RouteDocument, RouteModel, SubrouteDocument } from "../../db/models";
import { RouteValidator, SubrouteValidator } from "../../core/validators";
import { ActiveRouteInconsistencyError, FilterSubrouteError, SubrouteDuplicateError, SubrouteNotFoundByCustomIdError, SubrouteNotFoundByPermissionError, SubrouteNotFoundError, SubrouteRouteMatchError, SubroutesNotFoundedByMainRouteError } from "../../core/exceptions";
import { FilterOptions, RouteFilterKeys, SubrouteFilterKeys } from "../../core/types";
import { IRouteRepository } from ".";
import { TransactionManager } from "../../core/database/transactionManager";

@injectable()
export class MenuService {


    constructor(@inject("ISubrouteRepository") private readonly subrouteRepository: ISubrouteRepository,
        @inject("SubrouteValidator") private readonly subrouteValidator: SubrouteValidator,
        @inject("RouteValidator") private readonly routeValidator: RouteValidator,
        @inject("IRouteRepository") private readonly routeRepository: IRouteRepository,
        @inject("TransactionManager") private readonly transactionManager: TransactionManager) { }

    async createSubroute(data: SubrouteDto): Promise<SubrouteDocument> {

        await this.subrouteValidator.validateSubrouteUniqueness(data.id);

        let createdSubroute: SubrouteDocument;
        try {
            createdSubroute = await this.subrouteRepository.createSubroute(data);

            //TODO: Actualizar con el servicio para actualizar rutas padres no hacerlo aca
            //TODO: Validar que exista la ruta padre con el validator de routes
            const updateResult = await RouteModel.findOneAndUpdate(
                { id: data.mainRoute },
                { $push: { subroutes: createdSubroute._id } },
                { new: true, useFindAndModify: false }
            );

            if (!updateResult) {
                await this.subrouteRepository.deletePermanentlySubroute(createdSubroute._id);
                throw new SubrouteRouteMatchError("La ruta padre no existe");
            }

            console.log("Ruta actualizada:", updateResult);
            return createdSubroute;

        } catch (error) {
            if (error.code === 11000) {
                throw new SubrouteDuplicateError("El ID de subruta ya existe, intente nuevamente con otro ID");
            }

            if (createdSubroute) {
                await this.subrouteRepository.deletePermanentlySubroute(createdSubroute._id);
            }
            throw error;
        }
    }

    async findSubrouteById(idSubroute: ObjectIdParam): Promise<SubrouteDocument | null> {

        const subroute = await this.subrouteRepository.findSubrouteById(idSubroute);
        if (!subroute) throw new SubrouteNotFoundError();
        return subroute;
    }

    async updateSubroute(idSubroute: ObjectIdParam, data: SubrouteUpdateDto): Promise<SubrouteDocument | null> {

        await this.subrouteValidator.validateSubroute(idSubroute);

        try {

            // return subrouteUpdated;

            if (data.mainRoute) {

                console.log("Existe el campo main route para actualizar");

                //TODO: usar el servicio de rutas para hacer estas operaciones
                const updateRoute = await RouteModel.findOne(
                    { id: data.mainRoute },
                );

                console.log("Ruta destino para actualizar", updateRoute);

                const actualSubroute = await this.subrouteRepository.findSubrouteById(idSubroute);

                console.log("Subruta actual", actualSubroute);

                //TODO: usar el servicio de rutas para hacer estas operaciones
                const actualRoute = await RouteModel.findOne({
                    id: actualSubroute.mainRoute
                })

                console.log("Ruta actual : ", actualRoute);

                //TODO: usar el servicio de rutas para hacer estas operaciones
                const updateResultRoute = await RouteModel.findOneAndUpdate(
                    { id: updateRoute.id },
                    { $push: { subroutes: actualSubroute._id } },
                    { new: true, useFindAndModify: false }
                );

                //TODO: usar el servicio de rutas para hacer estas operaciones
                const updateResultRouteOld = await RouteModel.findOneAndUpdate(
                    { id: actualRoute.id },
                    { $pull: { subroutes: actualSubroute._id } },
                );

            }

            const subrouteUpdated = await this.subrouteRepository.updateSubroute(idSubroute, data);

            return subrouteUpdated

        } catch (error) {

        }
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

    async findByCustomId(customId: string): Promise<SubrouteDocument | null> {

        const subroute = await this.subrouteRepository.findByCustomId(customId);

        if (!subroute) throw new SubrouteNotFoundByCustomIdError();

        return subroute;
    }

    //TODO: HACER EL DELETE PERMANENTLY UNA VEZ TERMINE RUTA SERVICE



    //routes

    async createRoute(data: RouteDto): Promise<RouteDocument> {

        return await this.transactionManager.executeTransaction(

            async (session) => {

                await this.routeValidator.validateUniquenessRoute(data.id);

                let createdRoute: RouteDocument;

                try {

                    createdRoute = await this.routeRepository.createRoute(data, session);

                    return createdRoute;

                } catch (error) {

                    if (error.code === 11000) {
                        throw new SubrouteDuplicateError("El ID de subruta ya existe, intente nuevamente con otro ID");
                    }

                    //TODO: dESCOMENTAR CUANDO ESTE LISTO EL PERMANENTLY

                    // if (createdRoute) {
                    //     await this.subrouteRepository.deletePermanentlySubroute(createdRoute._id);
                    // }
                    throw error;
                }


            }
        )
    }

    async findRouteById(idRoute: ObjectIdParam): Promise<RouteDocument | null> {

        const route = await this.routeRepository.findRouteById(idRoute);

        RouteValidator.validateFoundRoute(route);

        return route;

    }

    async updateRouteById(idRoute: ObjectIdParam, data: RouteUpdateDto) : Promise<RouteDocument | null>{


        return await this.transactionManager.executeTransaction(

            async (session) => {


                const route = await this.routeRepository.findRouteById(idRoute);

                RouteValidator.validateFoundRoute(route);

                if(data.active !== undefined && route.active === data.active) throw new ActiveRouteInconsistencyError();

                const dataName : FilterOptions<RouteFilterKeys> = {

                    name : data.name
                }

                await this.routeValidator.validateUniquenessNameRoute(dataName)

                const updateRoute = await this.routeRepository.updateRouteById(idRoute, data, session);

                return updateRoute;

            }
        )
    }

    async deleteRoute(idRoute : ObjectIdParam) : Promise<RouteDocument | null>{

        return await this.transactionManager.executeTransaction(

            async (session) => {

                const route = await this.routeRepository.findRouteById(idRoute);

                RouteValidator.validateFoundRoute(route);

                RouteValidator.validateStatusActiveRoute(route);

                const deleteRoute = await this.routeRepository.deleteRoute(idRoute, session);

                return deleteRoute;
            }
        )
    }
}