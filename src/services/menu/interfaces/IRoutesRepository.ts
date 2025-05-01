import { ClientSession } from "mongoose";
import { FilterOptions, RouteFilterKeys } from "../../../core/types";
import { RouteDocument, SubrouteDocument } from "../../../db/models";
import { ObjectIdParam, RouteDto, RouteUpdateDto } from "../../../validations";


export interface IRouteRepository{

    createRoute(data : RouteDto, session?: ClientSession) : Promise<RouteDocument>;
    findRouteById(idRoute : ObjectIdParam) : Promise<RouteDocument | null>;
    updateRouteById(idRoute : ObjectIdParam, data: RouteUpdateDto, session?: ClientSession) : Promise<RouteDocument | null>;
    deleteRoute(idRoute : ObjectIdParam, session?: ClientSession) : Promise<RouteDocument | null>;
    activateRoute(idRoute : ObjectIdParam, session?: ClientSession) : Promise<RouteDocument | null>;
    getSubroutesWithIdRoute(idRoute : ObjectIdParam) : Promise<SubrouteDocument[] | null>;
    findRouteByCustomId(idRoute : string) : Promise<RouteDocument | null>;
    searchRoutesByFilters(filter: FilterOptions<RouteFilterKeys>) : Promise<RouteDocument[] | null>;
    listRoutes() : Promise<RouteDocument[] | null>;

}