import mongoose from "mongoose";

export interface ConfigRoleResponse{

    _id : mongoose.Types.ObjectId;
    idRole : string;
    name : string;
    label : string;
    idConfigRole : mongoose.Types.ObjectId;
}