import mongoose from "mongoose";
import { IJwtPayloadType } from "../token/jwtPayload.interface";

export interface ISessionManagementType{

    userId : mongoose.Types.ObjectId;
    token : IJwtPayloadType;
    createdAt?: Date;
    expiresAt : Date;
    ipAddress : string;
    userAgent : string;
    isActive?: boolean;
}