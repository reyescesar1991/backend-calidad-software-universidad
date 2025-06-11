import { model, Schema } from "mongoose";
import mongoose from "mongoose";

export interface SessionManagementDocument extends Document {

    _id : mongoose.Types.ObjectId;
    userId : string, 
    token : string,
    ipAddress : string,
    userAgent : string,
    expiresAt: number

};

export const sessionManagementSchema = new Schema<SessionManagementDocument>({

    userId : { type: String, required: true, unique: true},
    token : {type: String, required: true, unique: true},
    ipAddress : {type: String, required: true},
    userAgent : {type: String, required: true},
    expiresAt: { type: Number, required: true} 
}, {timestamps : true, versionKey : false});

sessionManagementSchema.index({expiresAt : 1}, {expireAfterSeconds: 0});

export const SessionManagementModel = model<SessionManagementDocument>("SessionManagement", sessionManagementSchema);