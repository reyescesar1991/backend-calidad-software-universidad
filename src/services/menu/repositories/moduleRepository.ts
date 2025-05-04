import { inject, injectable } from "tsyringe";
import { IModuleRepository } from "../interfaces/IModuleRepository";
import { ClientSession, Model } from "mongoose";
import { FilterOptions, ModuleFilterKeys } from "../../../core/types";
import { ModuleDocument, RouteDocument } from "../../../db/models";
import { ObjectIdParam, ModuleDto, ModuleUpdateDto } from "../../../validations";


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
    createModule(data: ModuleDto, session?: ClientSession): Promise<ModuleDocument | null> {
        throw new Error("Method not implemented.");
    }
    updateModule(data: ModuleUpdateDto, session?: ClientSession): Promise<ModuleDocument | null> {
        throw new Error("Method not implemented.");
    }
    activateModule(idModule: ObjectIdParam, session?: ClientSession): Promise<ModuleDocument | null> {
        throw new Error("Method not implemented.");
    }
    deleteModule(idModule: ObjectIdParam, session?: ClientSession): Promise<ModuleDocument | null> {
        throw new Error("Method not implemented.");
    }
    getRoutesByModule(idModule: ObjectIdParam): Promise<RouteDocument[] | null> {
        throw new Error("Method not implemented.");
    }

    
}