import { ClientSession } from "mongoose";
import { UserPermissionSecurityDocument } from "../../../db/models/userPermission/userPermissionSecurity.model";
import { ObjectIdParam, UserPermissionSecurityDto } from "../../../validations";

export interface IUserPermissionSecurityRepository {

    setDataPermissionSecurityUser(dataPermissionUser : UserPermissionSecurityDto, session?: ClientSession) : Promise<UserPermissionSecurityDocument | null>;
    updateDataPermissionSecurityUser(idUserParam : string, dataPermissionUser: UserPermissionSecurityDto, session?: ClientSession) : Promise<UserPermissionSecurityDocument | null>;
    getDataPermissionSecurityUser(idCustomUserParam : string) : Promise<UserPermissionSecurityDocument | null>;
}