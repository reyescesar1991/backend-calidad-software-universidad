import { inject, injectable } from "tsyringe";
import { IRouteRepository } from "../../../services/menu";
import { FilterOptionsRouteNotValid, NotExistsRoutesDatabaseError, RouteAlreadyActiveError, RouteAlreadyExistsError, RouteAlreadyInactiveError, RouteNameAlreadyExistsError, RouteNotExistsError } from "../../exceptions";
import { RouteDocument } from "../../../db/models";
import { FilterOptions, RouteFilterKeys } from "../../types";
import { RouteFilterSchemaZod } from "../../../validations";

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

    static validateStatusInactiveRoute(route : RouteDocument) : void{

        if(!route.active) throw new RouteAlreadyInactiveError();
    }

    static validateFilterOptionsRoute(filter: FilterOptions<RouteFilterKeys>){

        const result = RouteFilterSchemaZod.safeParse(filter);

        if(!result.success){

            const errors = result.error.errors.map(e => `${e.path[0]}: ${e.message}`);
            console.log(errors);
            throw new FilterOptionsRouteNotValid(`Filtro inválido:\n- ${errors.join('\n- ')}`);
        }
    }

    static validateExistingRoutes(routes : RouteDocument[]){

        if(routes.length === 0) throw new NotExistsRoutesDatabaseError();
    }

    static validateActiveStatusRoute(route : RouteDocument) : void{

        if(route.active) throw new RouteAlreadyActiveError();
    }

    async validateUniquenessNameRoute(filter: FilterOptions<RouteFilterKeys>) : Promise<void>{


        const existsName = await this.routeRepository.searchRoutesByFilters(filter);

        console.log(existsName);
        

        if(existsName.length > 0) throw new RouteNameAlreadyExistsError();
    }

}