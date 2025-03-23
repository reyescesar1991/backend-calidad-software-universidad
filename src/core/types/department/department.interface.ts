import { Schema } from "mongoose";

export interface IDepartmentType{

    idDepartment: string;
    label: string;
    name?: string
    description?: string; 
    headquartersId?: Schema.Types.ObjectId; 
    isActive?: boolean;
}