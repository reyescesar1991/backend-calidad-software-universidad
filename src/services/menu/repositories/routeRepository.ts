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
    async findRouteById(idRoute: ObjectIdParam): Promise<RouteDocument | null> {
        
        return await this.RouteModel.findById(idRoute).exec();
    }
    async updateRouteById(idRoute: ObjectIdParam, data: RouteUpdateDto, session?: ClientSession): Promise<RouteDocument | null> {
        
        return await this.RouteModel.findByIdAndUpdate(

            idRoute,
            data,
            {new: true, runValidators: true}
        ).exec();
    }
    async deleteRoute(idRoute: ObjectIdParam, session?: ClientSession): Promise<RouteDocument | null> {
        
        return await this.RouteModel.findByIdAndUpdate(

            idRoute,
            {$set : {active : false}},
            {new: true, runValidators: true}
        ).exec();
    }
    async activateRoutes(idRoutes: ObjectIdParam[], session?: ClientSession): Promise<RouteDocument | null> {
        throw new Error("Method not implemented.");
    }
    async getSubroutesWithIdRoute(idRoute: ObjectIdParam): Promise<SubrouteDocument[] | null> {
        throw new Error("Method not implemented.");
    }
    async updateSubrouteWithIdRoute(customId: string, subroute: SubrouteDocument, session?: ClientSession): Promise<RouteDocument | null> {
        throw new Error("Method not implemented.");
    }
    async deletePermanentlySubrouteWithIdRoute(customId: string, subroute: SubrouteDocument, session?: ClientSession): Promise<RouteDocument | null> {
        throw new Error("Method not implemented.");
    }
    async findRouteByCustomId(idRoute: string): Promise<RouteDocument | null> {
        
        return await this.RouteModel.findOne({id : idRoute}).exec();
    }
    async searchRoutesByFilters(filter: FilterOptions<RouteFilterKeys>): Promise<RouteDocument[] | null> {
        
        return await this.RouteModel.find(filter).exec();
    }
    async listRoutes(): Promise<RouteDocument[] | null> {
        throw new Error("Method not implemented.");
    }

    

}