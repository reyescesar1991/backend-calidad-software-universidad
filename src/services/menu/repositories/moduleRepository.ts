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


    /**
     * Obtiene los documentos RouteModel basados en un array de 'id's de rutas principales.
     * Excluye el campo 'subroutes' y otros campos de metadatos.
     * @param mainRouteIds Un array de strings que representan los 'id's de las rutas principales.
     * @returns Una promesa que resuelve a un array de IRoute (objetos planos).
     * Devuelve un array vacío si no se encuentran coincidencias.
     */
    async getModulesByMainModuleIds(modulesIds: string[]): Promise<ModuleDocument[]> { // <-- TIPO DE RETORNO CAMBIADO A IRoute[]
        try {
            const modules = await this.ModuleModel.find({
                id: { $in: modulesIds },
            })
            // Proyección para incluir solo los campos deseados y excluir los no deseados
            .select('id title') // Incluye explícitamente los campos que quieres
            // No necesitas excluir __v, createdAt, updatedAt si no están en tu `select`,
            // pero es buena práctica si Mongoose los añade por defecto y no los quieres.
            .lean<ModuleDocument[]>() // <-- ¡CLAVE! Usa .lean<IRoute[]>() para el tipado correcto
            .exec();
            return modules;
        } catch (error) {
            // Es buena práctica manejar errores. Aquí lo relanzamos.
            console.error("Error fetching routes by main route IDs:", error);
            throw error;
        }
    }

    
}