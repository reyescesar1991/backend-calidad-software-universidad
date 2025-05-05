import { inject, injectable } from "tsyringe";
import { IModuleRepository } from "../interfaces/IModuleRepository";
import { ClientSession, Model } from "mongoose";
import { FilterOptions, ModuleFilterKeys } from "../../../core/types";
import { ModuleDocument, RouteDocument } from "../../../db/models";
import { ObjectIdParam, ModuleDto, ModuleUpdateDto, RouteDto } from "../../../validations";


@injectable()
export class ModuleRepositoryImpl implements IModuleRepository{

    constructor(@inject("ModuleModel") private readonly ModuleModel : Model<ModuleDocument>) {}

    async findModuleById(idModule: ObjectIdParam): Promise<ModuleDocument | null> {
        
        return await this.ModuleModel.findById(idModule).exec();
    }
    async findModuleByCustomId(customIdModule: string): Promise<ModuleDocument | null> {
        return await this.ModuleModel.findOne({id : customIdModule}).exec();
    }
    async searchModuleByFilter(filter: FilterOptions<ModuleFilterKeys>): Promise<ModuleDocument[] | null> {
        return await this.ModuleModel.find(filter).exec();
    }
    async createModule(data: ModuleDto, session?: ClientSession): Promise<ModuleDocument | null> {
        
        return await this.ModuleModel.create(data);
    }
    async updateModule(idModule : ObjectIdParam, data: ModuleUpdateDto, session?: ClientSession): Promise<ModuleDocument | null> {

        return await this.ModuleModel.findByIdAndUpdate(
            idModule,
            data,
            {new: true, runValidators: true}
        );
    }
    async activateModule(idModule: ObjectIdParam, session?: ClientSession): Promise<ModuleDocument | null> {
        
        return await this.ModuleModel.findByIdAndUpdate(

            idModule,
            {$set : {active : true}},
            {new: true, runValidators: true},
        ).exec();
    }
    async deleteModule(idModule: ObjectIdParam, session?: ClientSession): Promise<ModuleDocument | null> {
        return await this.ModuleModel.findByIdAndUpdate(

            idModule,
            {$set : {active : false}},
            {new: true, runValidators: true}
        ).exec();
    }
    async getRoutesByModule(idModule: ObjectIdParam): Promise<RouteDocument[] | null> {
        const routeWithSubroutes = await this.ModuleModel
        .findById(idModule)
        .populate<{ routes: RouteDocument[] }>("routes") // Tipo explícito
        .exec();

        return routeWithSubroutes.routes;
    }

    async updateModuleAddRoute(dataRoute: RouteDocument, routeCreated: RouteDocument, session?: ClientSession): Promise<ModuleDocument | null> {
        
        const module = await this.ModuleModel.findOneAndUpdate(

            { id: dataRoute.idModule, },
            { $push: { routes: routeCreated._id } },
            { new: true, useFindAndModify: true }
        ).exec();

        return module;
    }
    async updateModuleDeleteRoute(actualModule: ModuleDocument, route: RouteDocument, session?: ClientSession): Promise<ModuleDocument | null> {
        
        const module = await this.ModuleModel.findOneAndUpdate(
            { id: actualModule.id },
            { $pull: { routes: route._id } },
            { new: true, useFindAndModify: true }
        ).exec();

        return module;
    }

    
}