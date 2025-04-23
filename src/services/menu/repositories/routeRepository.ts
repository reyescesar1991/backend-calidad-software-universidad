import { inject, injectable } from "tsyringe";
import { IRouteRepository } from "..";
import { ClientSession, Model } from "mongoose";
import { RouteDocument, SubrouteDocument } from "../../../db/models";
import { FilterOptions, RouteFilterKeys } from "../../../core/types";
import { RouteDto, ObjectIdParam, RouteUpdateDto } from "../../../validations";

@injectable()
export class RouteRepository implements IRouteRepository{

    constructor(@inject("RouteModel") private readonly RouteModel : Model<RouteDocument>){}


    async createRoute(data: RouteDto, session?: ClientSession): Promise<RouteDocument> {
        
        const [newRoute] = await this.RouteModel.create([data], { session });
        return newRoute;
    }
    findRouteById(idRoute: ObjectIdParam): Promise<RouteDocument | null> {
        
        return this.RouteModel.findById(idRoute).exec();
    }
    updateRouteById(idRoute: ObjectIdParam, data: RouteUpdateDto, session?: ClientSession): Promise<RouteDocument | null> {
        throw new Error("Method not implemented.");
    }
    deleteRoute(idRoute: ObjectIdParam, session?: ClientSession): Promise<RouteDocument | null> {
        throw new Error("Method not implemented.");
    }
    activateRoutes(idRoutes: ObjectIdParam[], session?: ClientSession): Promise<RouteDocument | null> {
        throw new Error("Method not implemented.");
    }
    getSubroutesWithIdRoute(idRoute: ObjectIdParam): Promise<SubrouteDocument[] | null> {
        throw new Error("Method not implemented.");
    }
    updateSubrouteWithIdRoute(customId: string, subroute: SubrouteDocument, session?: ClientSession): Promise<RouteDocument | null> {
        throw new Error("Method not implemented.");
    }
    deletePermanentlySubrouteWithIdRoute(customId: string, subroute: SubrouteDocument, session?: ClientSession): Promise<RouteDocument | null> {
        throw new Error("Method not implemented.");
    }
    async findRouteByCustomId(idRoute: string): Promise<RouteDocument | null> {
        
        return await this.RouteModel.findOne({id : idRoute}).exec();
    }
    searchSubroutesByFilters(filter: FilterOptions<RouteFilterKeys>, session?: ClientSession): Promise<RouteDocument[] | null> {
        throw new Error("Method not implemented.");
    }
    listRoutes(): Promise<RouteDocument[] | null> {
        throw new Error("Method not implemented.");
    }

    

}