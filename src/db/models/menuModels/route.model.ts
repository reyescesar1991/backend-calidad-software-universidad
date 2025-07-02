import mongoose, { Schema, model } from "mongoose";

export interface RouteDocument extends Document {

    _id: mongoose.Types.ObjectId;
    id : string,
    idModule : string,
    name : string,
    path : string,
    icon : string,
    active: boolean,
    subroutes: Schema.Types.ObjectId[]
}

export const RouteSchema = new Schema<RouteDocument>({

    id : {type: String, required: true, unique: true},
    name : {type: String, required: true, unique: true},
    idModule : {type: String, required: true},
    path : {type: String, required: true},
    icon : {type: String, required: true},
    active: {type: Boolean, required: true},
    subroutes: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Subroute"
    }],

} , { timestamps : true });

export const RouteModel = model<RouteDocument>("Route", RouteSchema);

export type SimplifiedRoute = Omit<RouteDocument, '_id' | 'subroutes' | '__v' | 'createdAt' | 'updatedAt'>;