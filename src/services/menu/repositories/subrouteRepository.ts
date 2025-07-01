import { inject, injectable } from "tsyringe";
import { ISubrouteRepository } from "../interfaces/ISubroutesRepository";
import { FilterOptions, SubrouteFilterKeys } from "../../../core/types";
import { SubrouteDocument } from "../../../db/models";
import { SubrouteDto, ObjectIdParam, SubrouteUpdateDto } from "../../../validations";
import { ClientSession, Model } from "mongoose";
import { timeOutMongoError } from "../../../core/utils/timeOutError";

@injectable()
export class SubrouteRepository implements ISubrouteRepository{


    constructor(@inject("SubrouteModel") private readonly subrouteModel : Model<SubrouteDocument>){}

    async createSubroute(data: SubrouteDto): Promise<SubrouteDocument> {
        
        return this.subrouteModel.create(data);

    }
    async updateSubroute(idSubroute: ObjectIdParam, data: SubrouteUpdateDto): Promise<SubrouteDocument | null> {
        
        return this.subrouteModel.findByIdAndUpdate(
            idSubroute,
            data,
            {new : true, runValidators: true},
        ).exec();

    }
    async deleteSubroute(idSubroute: ObjectIdParam): Promise<SubrouteDocument | null> {
        
        return this.subrouteModel.findByIdAndUpdate(
            idSubroute,
            {$set : {active : false}},
            { new: true, runValidators: true }
        ).exec();
    }
    async findSubrouteById(idSubroute: ObjectIdParam): Promise<SubrouteDocument | null> {
        
        try {
            
            return this.subrouteModel.findById(idSubroute).exec();

        } catch (error) {
            
            timeOutMongoError(error);
            
        }
    }
    async deletePermanentlySubroute(idSubroute: ObjectIdParam, session?: ClientSession): Promise<SubrouteDocument | null> {
        
        return this.subrouteModel.findByIdAndDelete(idSubroute).exec();
    }
    async activeSubroute(idSubroute: ObjectIdParam): Promise<SubrouteDocument | null> {
        
        return this.subrouteModel.findByIdAndUpdate(
            idSubroute,
            {$set : {active: true}},
            {new: true, runValidators: true},
        ).exec();
    }
    async getSubroutesByPermission(permissionKey: string): Promise<SubrouteDocument | null> {
        
        return this.subrouteModel.findOne({permissionKey : permissionKey}).exec();
    }
    async searchSubroutesByFilters(filter: FilterOptions<SubrouteFilterKeys>): Promise<SubrouteDocument[]> {
        console.log(filter);
        
        return this.subrouteModel.find(filter).exec();
    }

    async listSubroutes(): Promise<SubrouteDocument[] | null> {
        return this.subrouteModel.find({}).exec();
    }

    async searchSubroutesByMainRoute(mainRoute: string): Promise<SubrouteDocument[] | null> {
        return this.subrouteModel.find({mainRoute: mainRoute})
    }

    async findSubrouteByCustomId(customId: string): Promise<SubrouteDocument | null> {
        return this.subrouteModel.findOne({ id: customId }).exec();
    }



    /**
     * Obtiene los documentos SubrouteDocument que tienen un permissionKey que coincide
     * con alguno de los strings en el array permissionLabels.
     * @param permissionLabels Un array de strings (ej. ['modificar_producto', 'crear_usuario']).
     * @returns Una promesa que resuelve a un array de SubrouteDocument que coinciden.
     * Devuelve un array vacío si no se encuentran coincidencias.
     */
    async getSubroutesByPermissionKeys(permissionLabels: string[]): Promise<SubrouteDocument[]> {
        try {
            // Usamos el operador $in para buscar documentos donde 'permissionKey'
            // esté contenido en el array 'permissionLabels'.
            // Añadimos { active: true } para que solo devuelva rutas activas, si eso es lo deseado.
            const subroutes = await this.subrouteModel.find({
                permissionKey: { $in: permissionLabels },
                active: true // Considera si quieres filtrar por activas o no
            }).exec();

            // Si no se encuentran documentos, find() devuelve un array vacío, lo cual es ideal.
            return subroutes;
        } catch (error) {
            // Manejo de errores: loguear, envolver, o relanzar.
            // Es crucial propagar el error para que la capa de servicio pueda manejarlo.
            throw error;
        }
    }
}