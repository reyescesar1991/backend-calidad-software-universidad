import { model, Schema } from "mongoose";
import mongoose from "mongoose";

export interface SessionManagementDocument extends Document {

    _id : mongoose.Types.ObjectId;
    userId : mongoose.Schema.Types.ObjectId, 
    token : string,
    ipAddress : string,
    userAgent : string,

};

export const sessionManagementSchema = new Schema<SessionManagementDocument>({

    userId : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    token : {type: String, required: true, unique: true},
    ipAddress : {type: String, required: true},
    userAgent : {type: String, required: true},
});

sessionManagementSchema.index({expiresAt : 1}, {expireAfterSeconds: 0});

export const SessionManagementModel = model<SessionManagementDocument>("SessionManagement", sessionManagementSchema);