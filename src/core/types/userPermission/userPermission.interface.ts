import mongoose from "mongoose";

export interface IUserPermission{

    idUser : string;
    roleId : mongoose.Types.ObjectId;
    customPermissions : {

        permissionId : mongoose.Types.ObjectId;
        can : boolean;
        permissionKey : string,
    }[];
}