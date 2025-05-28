import mongoose from "mongoose";

export interface IUserPermission{

    idUser : string;
    roleId : string;
    customPermissions : {

        permissionId : mongoose.Types.ObjectId;
        can : boolean;
        permissionLabel : string,
    }[];
}