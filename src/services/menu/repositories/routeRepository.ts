import { inject, injectable } from "tsyringe";
import { IRouteRepository } from "..";
import { ClientSession, Model } from "mongoose";
import { RouteDocument, SubrouteDocument } from "../../../db/models";
import { FilterOptions, RouteFilterKeys } from "../../../core/types";
import { RouteDto, ObjectIdParam, RouteUpdateDto, SubrouteDto } from "../../../validations";

@injectable()
export class RouteRepository implements IRouteRepository {

    constructor(@inject("RouteModel") private readonly RouteModel: Model<RouteDocument>) { }

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
            { new: true, runValidators: true }
        ).exec();
    }

    async updateRouteAddSubroute(data: SubrouteDto, subrouteCreated: SubrouteDocument, session?: ClientSession): Promise<RouteDocument | null> {

        const updateResult = await this.RouteModel.findOneAndUpdate(
            { id: data.mainRoute },
            { $push: { subroutes: subrouteCreated._id } },
            { new: true, useFindAndModify: false }
        );

        console.log(updateResult);


        return updateResult;
    }

    async updateRouteDeleteSubroute(actualRoute: RouteDocument, subroute: SubrouteDocument): Promise<RouteDocument | null> {

        const updateResultRouteOld = await this.RouteModel.findOneAndUpdate(
            { id: actualRoute.id },
            { $pull: { subroutes: subroute._id } },
        );

        return updateResultRouteOld;
    }

    async deleteRoute(idRoute: ObjectIdParam, session?: ClientSession): Promise<RouteDocument | null> {

        return await this.RouteModel.findByIdAndUpdate(

            idRoute,
            { $set: { active: false } },
            { new: true, runValidators: true }
        ).exec();
    }

    async deletePermanentlyRoute(idRoute: ObjectIdParam, session?: ClientSession): Promise<RouteDocument | null> {
        
        return await this.RouteModel.findByIdAndDelete(idRoute).exec();
    }

    async activateRoute(idRoute: ObjectIdParam, session?: ClientSession): Promise<RouteDocument | null> {

        return await this.RouteModel.findByIdAndUpdate(

            idRoute,
            { $set: { active: true } },
            { new: true, runValidators: true }
        )
    }
    async getSubroutesWithIdRoute(idRoute: ObjectIdParam): Promise<SubrouteDocument[] | null> {

        const routeWithSubroutes = await this.RouteModel
            .findById(idRoute)
            .populate<{ subroutes: SubrouteDocument[] }>("subroutes") // Tipo explícito
            .exec();

        return routeWithSubroutes.subroutes;

    }
    async findRouteByCustomId(idRoute: string): Promise<RouteDocument | null> {

        return await this.RouteModel.findOne({ id: idRoute }).exec();
    }
    async searchRoutesByFilters(filter: FilterOptions<RouteFilterKeys>): Promise<RouteDocument[] | null> {

        return await this.RouteModel.find(filter).exec();
    }
    async listRoutes(): Promise<RouteDocument[] | null> {

        return await this.RouteModel.find({}).exec();
    }



}