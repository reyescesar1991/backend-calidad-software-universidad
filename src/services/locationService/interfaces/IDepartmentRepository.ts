import { ClientSession } from "mongoose";
import { DepartmentDocument } from "../../../db/models";
import { DepartmentDto, ObjectIdParam, UpdateDepartmentDto } from "../../../validations";
import { DepartmentConfigFilterKeys, FilterOptions } from "../../../core/types";


export interface IHeadquarterRepository{

    
    findHeadquarterById(idHeadquarter : ObjectIdParam) : Promise<DepartmentDocument | null>;
    findHeadquarterByCustomId(customIdHeadquarter : string) : Promise<DepartmentDocument | null>;
    searchHeadquarterByFilter(filter : FilterOptions<DepartmentConfigFilterKeys>) : Promise<DepartmentDocument[] | null>;
    listHeadquarter() : Promise<DepartmentDocument[] | null>;
    activateHeadquarter(idHeadquarter : ObjectIdParam, session?: ClientSession) : Promise<DepartmentDocument | null>;
    desactivateHeadquarter(idHeadquarter : ObjectIdParam, session?: ClientSession) : Promise<DepartmentDocument | null>;
    createHeadquarter(dataHeadquarter : DepartmentDto, session?: ClientSession) : Promise<DepartmentDocument | null>;
    updateHeadquarter(idHeadquarter : ObjectIdParam, dataUpdateHeadquarter : UpdateDepartmentDto, session?: ClientSession) : Promise<DepartmentDocument | null>;
    searchHeadquarterByFilterWithOr(filter : FilterOptions<DepartmentConfigFilterKeys>) : Promise<DepartmentDocument[] | null>;

}