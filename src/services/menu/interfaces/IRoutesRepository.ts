import { RouteDocument } from "../../../db/models";
import { ObjectIdParam, RouteDto, RouteUpdateDto } from "../../../validations";


export interface IRouteRepository{

    createRoute(data : RouteDto) : Promise<RouteDocument>;
    findRouteById(idRoute : ObjectIdParam) : Promise<RouteDocument | null>;
    updateRouteById(idRoute : ObjectIdParam, data: RouteUpdateDto) : Promise<RouteDocument | null>;
    deleteRoute(idRoute : ObjectIdParam) : Promise<RouteDocument | null>;
}