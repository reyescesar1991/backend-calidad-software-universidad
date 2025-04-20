import { inject, injectable } from "tsyringe";
import { ISubrouteRepository } from "./interfaces/ISubroutesRepository";
import { ObjectIdParam, SubrouteDto, SubrouteUpdateDto } from "../../validations";
import { RouteModel, SubrouteDocument, SubrouteModel } from "../../db/models";
import { SubrouteValidator } from "../../core/validators";
import { SubrouteDuplicateError, SubrouteNotFoundError, SubrouteRouteMatchError } from "../../core/exceptions";

@injectable()
export class MenuService {


    constructor(@inject("ISubrouteRepository") private readonly subrouteRepository: ISubrouteRepository,
    @inject("SubrouteValidator") private readonly subrouteValidator: SubrouteValidator) { }

    async createSubroute(data: SubrouteDto): Promise<SubrouteDocument> {

        await this.subrouteValidator.validateSubrouteUniqueness(data.id);

        let createdSubroute: SubrouteDocument;
        try {
            createdSubroute = await this.subrouteRepository.createSubroute(data);

            //TODO: Actualizar con el servicio para actualizar rutas padres no hacerlo aca
            //TODO: Validar que exista la ruta padre con el validator de routes
            const updateResult = await RouteModel.findOneAndUpdate(
                { id: data.mainRoute },
                { $push: { subroutes: createdSubroute._id } },
                { new: true, useFindAndModify: false }
            );

            if (!updateResult) {
                await this.subrouteRepository.deletePermanentlySubroute(createdSubroute._id);
                throw new SubrouteRouteMatchError("La ruta padre no existe");
            }

            console.log("Ruta actualizada:", updateResult);
            return createdSubroute;

        } catch (error) {
            if (error.code === 11000) {
                throw new SubrouteDuplicateError("El ID de subruta ya existe, intente nuevamente con otro ID");
            }

            if (createdSubroute) {
                await this.subrouteRepository.deletePermanentlySubroute(createdSubroute._id);
            }
            throw error;
        }
    }

    async findSubrouteById(idSubroute : ObjectIdParam) : Promise<SubrouteDocument | null>{

        const subroute = await this.subrouteRepository.findSubrouteById(idSubroute);
        if (!subroute) throw new SubrouteNotFoundError();
        return subroute;
    }

    async updateSubroute(idSubroute : ObjectIdParam, data : SubrouteUpdateDto) : Promise<SubrouteDocument | null>{

        await this.subrouteValidator.validateSubroute(idSubroute);

        try {

            // return subrouteUpdated;

            if(data.mainRoute){

                console.log("Existe el campo main route para actualizar");

                //TODO: usar el servicio de rutas para hacer estas operaciones
                const updateRoute = await RouteModel.findOne(
                    { id: data.mainRoute },
                );

                console.log("Ruta destino para actualizar",updateRoute);

                const actualSubroute = await this.subrouteRepository.findSubrouteById(idSubroute);

                console.log("Subruta actual" , actualSubroute);
                
                //TODO: usar el servicio de rutas para hacer estas operaciones
                const actualRoute = await RouteModel.findOne({
                    id : actualSubroute.mainRoute
                })
                
                console.log("Ruta actual : ", actualRoute);

                //TODO: usar el servicio de rutas para hacer estas operaciones
                const updateResultRoute = await RouteModel.findOneAndUpdate(
                    { id: updateRoute.id },
                    { $push: { subroutes: actualSubroute._id } },
                    { new: true, useFindAndModify: false }
                );

                //TODO: usar el servicio de rutas para hacer estas operaciones
                const updateResultRouteOld = await RouteModel.findOneAndUpdate(
                    { id: actualRoute.id },
                    { $pull: { subroutes: actualSubroute._id } },
                );

            }

            const subrouteUpdated = await this.subrouteRepository.updateSubroute(idSubroute, data);
                
            return subrouteUpdated
            
        } catch (error) {
            
        }
    }
}