import { inject, injectable } from "tsyringe";
import { IRouteRepository } from "../../../../services/menu";
import { RouteAlreadyExistsError, RouteNameAlreadyExistsError, RouteNotExistsError } from "../../../exceptions";
import { ObjectIdParam } from "../../../../validations";
import { RouteDocument } from "../../../../db/models";
import { FilterOptions, RouteFilterKeys } from "../../../types";

@injectable()
export class RouteValidator {

    constructor(@inject("IRouteRepository") private readonly routeRepository : IRouteRepository){}

    async validateUniquenessRoute(customIdRoute : string) : Promise<void>{

        const existsRoute = await this.routeRepository.findRouteByCustomId(customIdRoute);

        if(existsRoute) throw new RouteAlreadyExistsError();
    }

    static validateFoundRoute(route : RouteDocument) : void {


        if(!route) throw new RouteNotExistsError();
    }

    async validateUniquenessNameRoute(filter: FilterOptions<RouteFilterKeys>) : Promise<void>{


        const existsName = await this.routeRepository.searchRoutesByFilters(filter);

        console.log(existsName);
        

        if(existsName.length > 0) throw new RouteNameAlreadyExistsError();
    }

}