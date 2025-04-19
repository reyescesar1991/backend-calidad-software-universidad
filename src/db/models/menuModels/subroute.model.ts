import mongoose, { Schema, model } from "mongoose";

export interface SubrouteDocument extends Document {

    _id: mongoose.Types.ObjectId;
    id : { type: String, required: true},
    name : {type: String, required: true},
    path : {type: String, required: true},
    active : {type: Boolean, required: true},
    permissionKey : {type: String, required: true},
    mainRoute: {type: String, required: true},
};

export const SubrouteSchema = new Schema<SubrouteDocument>({

    id : { type: String, required: true},
    name : {type: String, required: true},
    path : {type: String, required: true},
    active : {type: Boolean, required: true},
    permissionKey : {type: String, required: true},
    mainRoute: {type: String, required: true},
    
} , { timestamps : true });


export const SubrouteModel = model<SubrouteDocument>("Subroute" , SubrouteSchema);