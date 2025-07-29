import { model, Schema } from "mongoose";
import mongoose from "mongoose";

export interface DepartmentDocument extends Document {

    _id: mongoose.Types.ObjectId;
    idDepartment : string,
    label : string,
    name : string,
    description : string,
    headquartersId : mongoose.Types.ObjectId
    headquartersName : string,
    isActive : boolean,
}

export const departmentSchema = new Schema<DepartmentDocument>({

    idDepartment : {type: String, required: true, unique: true},
    label : {type: String, required: true},
    name : {type: String, required: true},
    description : {type: String, required: false},
    headquartersId : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Headquarter", 
        required: true 
    },
    headquartersName : {type: String, required: true},
    isActive : {type: Boolean, required: false, default: true},
});

export const DepartmentModel = model<DepartmentDocument>("Department" , departmentSchema);