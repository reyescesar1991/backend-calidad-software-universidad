import { Schema } from "mongoose";
import { CompanyDepartmentEnum } from "../../enums";

export interface IDepartmentType{

    idDepartment: string;
    label: CompanyDepartmentEnum;
    name?: CompanyDepartmentEnum
    description?: string; 
    headquartersId?: Schema.Types.ObjectId; 
    isActive?: boolean;
}