import { ClientSession } from "mongoose";
import { HeadquartersDocument } from "../../../db/models";
import { HeadquarterDto, ObjectIdParam, UpdateHeadquarterDto } from "../../../validations";
import { FilterOptions, HeadquarterConfigFilterKeys } from "../../../core/types";


export interface IHeadquarterRepository{

    
    findHeadquarterById(idHeadquarter : ObjectIdParam) : Promise<HeadquartersDocument | null>;
    findHeadquarterByCustomId(customIdHeadquarter : string) : Promise<HeadquartersDocument | null>;
    searchHeadquarterByFilter(filter : FilterOptions<HeadquarterConfigFilterKeys>) : Promise<HeadquartersDocument[] | null>;
    listHeadquarter() : Promise<HeadquartersDocument[] | null>;
    activateHeadquarter(idHeadquarter : ObjectIdParam, session?: ClientSession) : Promise<HeadquartersDocument | null>;
    desactivateHeadquarter(idHeadquarter : ObjectIdParam, session?: ClientSession) : Promise<HeadquartersDocument | null>;
    createHeadquarter(dataHeadquarter : HeadquarterDto, session?: ClientSession) : Promise<HeadquartersDocument | null>;
    updateHeadquarter(idHeadquarter : ObjectIdParam, dataUpdateHeadquarter : UpdateHeadquarterDto, session?: ClientSession) : Promise<HeadquartersDocument | null>;
    searchHeadquarterByFilterWithOr(filter : FilterOptions<HeadquarterConfigFilterKeys>) : Promise<HeadquartersDocument[] | null>;

}