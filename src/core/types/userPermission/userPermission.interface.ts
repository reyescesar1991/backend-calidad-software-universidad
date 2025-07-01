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

export interface ICustomPermission {
    permissionId: mongoose.Types.ObjectId; // Usar mongoose.Types.ObjectId consistentemente
    can: boolean;
    permissionLabel: string;
}