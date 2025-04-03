
import mongoose from "mongoose";
import { CompanyDepartmentEnum } from "../../enums";

export interface IDepartmentType{

    idDepartment: string;
    label: CompanyDepartmentEnum;
    name: CompanyDepartmentEnum
    description?: string; 
    headquartersId: mongoose.Types.ObjectId; 
    headquartersName: string;
    isActive?: boolean;
}