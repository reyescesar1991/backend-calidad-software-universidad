import { ClientSession } from "mongoose";
import { ModuleDto, ModuleUpdateDto, ObjectIdParam, RouteDto, RouteUpdateDto } from "../../../validations";
import { ModuleDocument, RouteDocument } from "../../../db/models";
import { FilterOptions, ModuleFilterKeys } from "../../../core/types";

export interface IModuleRepository {


    findModuleById(idModule : ObjectIdParam) : Promise<ModuleDocument | null>;
    findModuleByCustomId(customIdModule : string) : Promise<ModuleDocument | null>;
    searchModuleByFilter(filter : FilterOptions<ModuleFilterKeys>) : Promise<ModuleDocument[] | null>;
    createModule(data: ModuleDto, session?: ClientSession) : Promise<ModuleDocument | null>;
    updateModule(idModule : ObjectIdParam, data: ModuleUpdateDto, session?: ClientSession) : Promise<ModuleDocument | null>;
    updateModuleAddRoute(dataRoute : RouteUpdateDto, routeCreated : RouteDocument, session?: ClientSession) : Promise<ModuleDocument | null>;
    updateModuleDeleteRoute(actualModule : ModuleDocument, route : RouteDocument, session?: ClientSession) : Promise<ModuleDocument | null>;
    activateModule(idModule: ObjectIdParam, session?: ClientSession) : Promise<ModuleDocument | null>;
    deleteModule(idModule : ObjectIdParam, session?: ClientSession) : Promise<ModuleDocument | null>;
    getRoutesByModule(idModule: ObjectIdParam) : Promise<RouteDocument[] | null>;
    

    getModulesByMainModuleIds(modulesIds: string[]): Promise<ModuleDocument[]>;
}