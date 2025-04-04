import mongoose from "mongoose";

export interface IRoleConfigType{

    rolID : mongoose.Types.ObjectId;
    maxLoginAttempts : number;
    isActive ?: boolean;
    rolName : string;
}