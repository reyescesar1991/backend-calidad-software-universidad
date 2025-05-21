import { ClientSession } from "mongoose";
import { DepartmentDocument } from "../../../db/models";
import { DepartmentDto, ObjectIdParam, UpdateDepartmentDto } from "../../../validations";
import { DepartmentConfigFilterKeys, FilterOptions } from "../../../core/types";


export interface IDepartmentRepository{

    
    findDepartmentById(idDepartment : ObjectIdParam) : Promise<DepartmentDocument | null>;
    findDepartmentByCustomId(customIdDepartment : string) : Promise<DepartmentDocument | null>;
    findDepartmentsByHeadquarter(idHeadquarter : ObjectIdParam) : Promise<DepartmentDocument[] | null>;
    searchDepartmentByFilter(filter : FilterOptions<DepartmentConfigFilterKeys>) : Promise<DepartmentDocument[] | null>;
    listDepartment() : Promise<DepartmentDocument[] | null>;
    activateDepartment(idDepartment : ObjectIdParam, session?: ClientSession) : Promise<DepartmentDocument | null>;
    desactivateDepartment(idDepartment : ObjectIdParam, session?: ClientSession) : Promise<DepartmentDocument | null>;
    createDepartment(dataDepartment : DepartmentDto, session?: ClientSession) : Promise<DepartmentDocument | null>;
    updateDepartment(idDepartment : ObjectIdParam, dataUpdateDepartment : UpdateDepartmentDto, session?: ClientSession) : Promise<DepartmentDocument | null>;
    searchDepartmentByFilterWithOr(filter : FilterOptions<DepartmentConfigFilterKeys>) : Promise<DepartmentDocument[] | null>;

}