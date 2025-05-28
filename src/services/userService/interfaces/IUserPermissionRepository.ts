import { ClientSession } from "mongoose";
import { UserPermissionDocument } from "../../../db/models/userPermission/userPermission.model";
import { UserPermissionDto } from "../../../validations";

export interface IUserPermissionRepository {

    setDataPermissionUser(dataPermissionUser : UserPermissionDto, session?: ClientSession) : Promise<UserPermissionDocument | null>;
}