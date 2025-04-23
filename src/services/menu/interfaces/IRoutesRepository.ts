import { FilterOptions, RouteFilterKeys } from "../../../core/types";
import { RouteDocument, SubrouteDocument } from "../../../db/models";
import { ObjectIdParam, RouteDto, RouteUpdateDto } from "../../../validations";


export interface IRouteRepository{

    createRoute(data : RouteDto) : Promise<RouteDocument>;
    findRouteById(idRoute : ObjectIdParam) : Promise<RouteDocument | null>;
    updateRouteById(idRoute : ObjectIdParam, data: RouteUpdateDto) : Promise<RouteDocument | null>;
    deleteRoute(idRoute : ObjectIdParam) : Promise<RouteDocument | null>;
    activateRoutes(idRoutes : ObjectIdParam[]) : Promise<RouteDocument | null>;
    getSubroutesWithIdRoute(idRoute : ObjectIdParam) : Promise<SubrouteDocument[] | null>;
    updateSubrouteWithIdRoute (customId: string, subroute: SubrouteDocument) : Promise<RouteDocument | null>
    deletePermanentlySubrouteWithIdRoute (customId: string, subroute: SubrouteDocument) : Promise<RouteDocument | null>
    findRouteByCustomId(idRoute : ObjectIdParam) : Promise<RouteDocument | null>;
    searchSubroutesByFilters(filter: FilterOptions<RouteFilterKeys>) : Promise<RouteDocument[] | null>;
    listRoutes() : Promise<RouteDocument[] | null>;

}