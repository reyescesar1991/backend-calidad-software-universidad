import { Schema, model } from "mongoose";
import { ISubrouteType } from "../../../core/types";

interface SubrouteDocument extends ISubrouteType, Document {};

export const SubrouteSchema = new Schema<SubrouteDocument>({

    id : { type: String, required: true},
    name : {type: String, required: true},
    path : {type: String, required: true},
    active : {type: Boolean, required: true},
    permissionKey : {type: String, required: true},
    mainRoute: {type: String, required: true},
    // parentId : {
    //     type: Schema.Types.ObjectId,
    //     ref: "Route", 
    //     required: true
    // }
} , { timestamps : true });


export const SubrouteModel = model<SubrouteDocument>("Subroute" , SubrouteSchema);