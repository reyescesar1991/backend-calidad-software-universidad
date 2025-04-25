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
    updateSubrouteWithIdRoute (customId: string, subroute: SubrouteDocument, session?: ClientSession) : Promise<RouteDocument | null>
    deletePermanentlySubrouteWithIdRoute (customId: string, subroute: SubrouteDocument, session?: ClientSession) : Promise<RouteDocument | null>
    findRouteByCustomId(idRoute : string) : Promise<RouteDocument | null>;
    searchRoutesByFilters(filter: FilterOptions<RouteFilterKeys>, session?: ClientSession) : Promise<RouteDocument[] | null>;
    listRoutes() : Promise<RouteDocument[] | null>;

}