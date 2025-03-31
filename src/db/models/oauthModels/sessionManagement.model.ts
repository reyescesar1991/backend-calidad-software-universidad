import { model, Schema } from "mongoose";
import { ISessionManagementType } from "../../../core/types";
import mongoose from "mongoose";

export interface SessionManagementDocument extends Document, ISessionManagementType {};

export const sessionManagementSchema = new Schema<SessionManagementDocument>({

    userId : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    token : {type: String, required: true, unique: true},
    createdAt : {type: Date, default: Date.now},
    expiresAt : {type: Date, required: true},
    ipAddress : {type: String, required: true},
    userAgent : {type: String, required: true},
    isActive : {type: Boolean, default: false},
});

sessionManagementSchema.index({expiresAt : 1}, {expireAfterSeconds: 0});

export const SessionManagementModel = model<SessionManagementDocument>("SessionManagement", sessionManagementSchema);