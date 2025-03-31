import mongoose from "mongoose";

export interface ISessionManagementType{

    userId : mongoose.Types.ObjectId;
    token : string;
    createdAt?: Date;
    expiresAt : Date;
    ipAddress : string;
    userAgent : string;
    isActive?: boolean;
}