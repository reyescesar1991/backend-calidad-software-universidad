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

    /**
     * Obtiene los documentos RouteModel basados en un array de 'id's de rutas principales.
     * Excluye el campo 'subroutes' y otros campos de metadatos.
     * @param mainRouteIds Un array de strings que representan los 'id's de las rutas principales.
     * @returns Una promesa que resuelve a un array de IRoute (objetos planos).
     * Devuelve un array vacío si no se encuentran coincidencias.
     */
    async getRoutesByMainRouteIds(mainRouteIds: string[]): Promise<RouteDocument[]> { // <-- TIPO DE RETORNO CAMBIADO A IRoute[]
        try {
            const routes = await this.RouteModel.find({
                id: { $in: mainRouteIds },
                active: true // Asumiendo que solo quieres rutas activas
            })
            // Proyección para incluir solo los campos deseados y excluir los no deseados
            .select('id idModule name path icon active') // Incluye explícitamente los campos que quieres
            // No necesitas excluir __v, createdAt, updatedAt si no están en tu `select`,
            // pero es buena práctica si Mongoose los añade por defecto y no los quieres.
            .lean<RouteDocument[]>() // <-- ¡CLAVE! Usa .lean<IRoute[]>() para el tipado correcto
            .exec();
            return routes;
        } catch (error) {
            // Es buena práctica manejar errores. Aquí lo relanzamos.
            console.error("Error fetching routes by main route IDs:", error);
            throw error;
        }
    }

}