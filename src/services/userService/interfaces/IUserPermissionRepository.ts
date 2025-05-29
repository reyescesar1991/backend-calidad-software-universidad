import { ClientSession } from "mongoose";
import { UserPermissionDocument } from "../../../db/models/userPermission/userPermission.model";
import { ObjectIdParam, UpdateUserPermissionDto, UserPermissionDto } from "../../../validations";

export interface IUserPermissionRepository {

    setDataPermissionUser(dataPermissionUser : UserPermissionDto, session?: ClientSession) : Promise<UserPermissionDocument | null>;
    updateDataPermissionUser(idUserParam: string, dataPermissionUser: UpdateUserPermissionDto, session?: ClientSession) : Promise<UserPermissionDocument | null>;
    getDataPermissionUser(idCustomUserParam : string) : Promise<UserPermissionDocument | null>;
    
}