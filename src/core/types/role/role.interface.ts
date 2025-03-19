import { Schema } from "mongoose";

export interface IRoleType{

    idRole: string;
    name: string; 
    label: string;
    permissions: Schema.Types.ObjectId[];
    description?: string;
    isActive?: boolean;
    isDefault?: boolean; 
}