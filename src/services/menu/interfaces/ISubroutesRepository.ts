import { FilterOptions, SubrouteFilterKeys } from "../../../core/types";
import { SubrouteDocument } from "../../../db/models";
import { ObjectIdParam, SubrouteDto, SubrouteUpdateDto } from "../../../validations";

export interface ISubrouteRepository{


    createSubroute(data: SubrouteDto) : Promise<SubrouteDocument>;
    updateSubroute(idSubroute: ObjectIdParam, data: SubrouteUpdateDto) : Promise<SubrouteDocument | null>;
    deleteSubroute(idSubroute: ObjectIdParam) : Promise<SubrouteDocument | null>;
    findSubrouteById(idSubroute: ObjectIdParam) : Promise<SubrouteDocument | null>;
    deletePermanentlySubroute(idSubroute: ObjectIdParam) : Promise<SubrouteDocument | null>;
    activeSubroute(idSubroute: ObjectIdParam) : Promise<SubrouteDocument | null>;
    getSubroutesByPermission(permissionKey : string) : Promise<SubrouteDocument | null>;
    searchSubroutesByFilters(filter: FilterOptions<SubrouteFilterKeys>) : Promise<SubrouteDocument[] | null>;
    listSubroutes() : Promise<SubrouteDocument[] | null>;
    searchSubroutesByMainRoute(mainRoute: string) : Promise<SubrouteDocument[] | null>;
    findSubrouteByCustomId(customId: string): Promise<SubrouteDocument | null>;
}