import { inject, injectable } from "tsyringe";
import { ObjectIdParam } from "../../../../../validations";
import { SubrouteDuplicateError, SubrouteNotFoundError} from "../../../../exceptions";
import { ISubrouteRepository } from "../../../../../services/menu";

@injectable()
export class SubrouteValidator{

    constructor(@inject("ISubrouteRepository") private repository: ISubrouteRepository) {} 


    async validateSubrouteUniqueness (idSubroute : string) : Promise<void> {
        
        const exists = await this.repository.findByCustomId(idSubroute);
        if(exists) throw new SubrouteDuplicateError("El ID de subruta ya existe, intente nuevamente con otro ID valido");
    }

    async validateSubroute (idSubroute : ObjectIdParam) : Promise<void> {

        const exists = await this.repository.findSubrouteById(idSubroute);
        if(!exists) throw new SubrouteNotFoundError("Subruta no existe, intente con un ID valido");
    }
}