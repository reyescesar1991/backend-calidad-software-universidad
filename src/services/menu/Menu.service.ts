import { inject, injectable } from "tsyringe";
import { ISubrouteRepository } from "./interfaces/ISubroutesRepository";
import { SubrouteDto } from "../../validations";
import { RouteModel, SubrouteDocument } from "../../db/models";
import { SubrouteValidator } from "../../core/validators";
import { SubrouteDuplicateError, SubrouteRouteMatchError } from "../../core/exceptions";

@injectable()
export class MenuService {


    constructor(@inject("ISubrouteRepository") private readonly subrouteRepository: ISubrouteRepository) { }

    async createSubroute(data: SubrouteDto): Promise<SubrouteDocument> {

        await SubrouteValidator.validateSubrouteUniqueness(data.id);

        let createdSubroute: SubrouteDocument;
        try {
            createdSubroute = await this.subrouteRepository.createSubroute(data);

            //TODO: Actualizar con el servicio para actualizar rutas padres no hacerlo aca


            
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
}