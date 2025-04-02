import { Schema } from "mongoose";
import { IDepartmentType } from "../../../core/types";
import mongoose from "mongoose";

export interface DepartmentDocument extends Document, IDepartmentType {}

export const DepartmentSchema = new Schema<DepartmentDocument>({

    idDepartment : {type: String, required: true},
    label : {type: String, required: true},
    name : {type: String, required: false},
    description : {type: String, required: false},
    headquartersId : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Headquarter", 
        required: true 
    },
    isActive : {type: Boolean, required: true, default: true},
});