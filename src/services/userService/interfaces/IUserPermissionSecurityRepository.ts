import { ClientSession } from "mongoose";
import { UserPermissionSecurityDocument } from "../../../db/models/userPermission/userPermissionSecurity.model";
import { UserPermissionSecurityDto } from "../../../validations";

export interface IUserPermissionSecurityRepository {

    setDataPermissionSecurityUser(dataPermissionUser : UserPermissionSecurityDto, session?: ClientSession) : Promise<UserPermissionSecurityDocument | null>;
}