import { Schema, model } from "mongoose";
import { IRouteType } from "../../../core/types";

interface RouteDocument extends IRouteType, Document {}

export const RouteSchema = new Schema<RouteDocument>({

    id : {type: String, required: true},
    name : {type: String, required: true},
    path : {type: String, required: true},
    icon : {type: String, required: true},
    active: {type: Boolean, required: true},
    subroutes: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Subroute"
    }],

} , { timestamps : true });

export const RouteModel = model<RouteDocument>("Route", RouteSchema);