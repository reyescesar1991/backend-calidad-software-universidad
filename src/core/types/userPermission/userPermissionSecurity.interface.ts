import mongoose from "mongoose";

export interface IUserPermissionSecurity{

    idUser : string;
    idRol : string;
    customPermissionsSecurity : {

        permissionSecurityId : mongoose.Types.ObjectId;
        can : boolean;
        permissionKey : string;
    }[]
}