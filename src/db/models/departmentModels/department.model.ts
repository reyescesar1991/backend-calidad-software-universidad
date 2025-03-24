import { Schema } from "mongoose";
import { IDepartmentType } from "../../../core/types";

export interface DepartmentDocument extends Document, IDepartmentType {}

export const DepartmentSchema = new Schema<DepartmentDocument>({

    idDepartment : {type: String, required: true},
    label : {type: String, required: true},
    name : {type: String, required: false},
    description : {type: String, required: false},
    //TODO: NECESITO tener el pull de las headquarters
});