import { RouteModel, SubrouteModel } from "../../../../../db/models"
import { SubrouteDuplicateError, SubrouteRouteMatchError } from "../../../../exceptions";

export class SubrouteValidator{


    static readonly validateSubrouteUniqueness = async (idSubroute : string) => {

        const exists = await SubrouteModel.findOne({id : idSubroute})
        if(exists) throw new SubrouteDuplicateError("El ID de subruta ya existe, intente nuevamente con otro ID");
    }
    
    // static readonly validateRouteIDMatchSubroute = async (idRoute : string) => {

    //     const exists = await RouteModel.findOne({id : idRoute});
        
    //     if(!exists) throw new SubrouteRouteMatchError("La ruta padre asociada a la subruta no existe");
    // }
}