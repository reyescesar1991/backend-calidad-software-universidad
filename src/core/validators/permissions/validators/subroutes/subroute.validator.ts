import { inject, injectable } from "tsyringe";
import { ObjectIdParam } from "../../../../../validations";
import { DeleteSubrouteError, SubrouteAlreadyActiveError, SubrouteAlreadyInactiveError, SubrouteDuplicateError, SubrouteNotFoundError} from "../../../../exceptions";
import { ISubrouteRepository } from "../../../../../services/menu";
import { SubrouteDocument } from "../../../../../db/models";

@injectable()
export class SubrouteValidator{

    constructor(@inject("ISubrouteRepository") private repository: ISubrouteRepository) {} 

    static validateSubrouteInactiveStatus (subroute : SubrouteDocument) : void {

        if(!subroute.active) throw new SubrouteAlreadyInactiveError();

    }

    static validateSubrouteActiveStatus (subroute : SubrouteDocument) : void {

        if(subroute.active) throw new SubrouteAlreadyActiveError();

    }

    static validateSubrouteDelete (subroute : SubrouteDocument) : void {

        if(!subroute) throw new DeleteSubrouteError();
    }

    async validateSubrouteUniqueness (idSubroute : string) : Promise<void> {
        
        const exists = await this.repository.findSubrouteByCustomId(idSubroute);
        if(exists) throw new SubrouteDuplicateError("El ID de subruta ya existe, intente nuevamente con otro ID valido");
    }

    async validateSubroute (idSubroute : ObjectIdParam) : Promise<SubrouteDocument | null> {

        const subroute = await this.repository.findSubrouteById(idSubroute);
        if(!subroute) throw new SubrouteNotFoundError("Subruta no existe, intente con un ID valido");

        return subroute;
    }
}