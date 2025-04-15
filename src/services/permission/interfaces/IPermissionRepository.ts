import { PermissionDocument } from "../../../db/models/permissionsModels/permission.model";
import { CreatePermissionDto, ObjectIdParam, UpdatePermissionDto } from "../../../validations";

export interface IPermissionRepository{

    createPermission(data : CreatePermissionDto) : Promise<PermissionDocument>;
    findPermissionById(id: ObjectIdParam) : Promise<PermissionDocument | null>;
    updatePermission(id: ObjectIdParam, data: UpdatePermissionDto) : Promise<PermissionDocument | null>;
    deletePermission(id: ObjectIdParam) : Promise<PermissionDocument | null>;
    togglePermissionCan(id: ObjectIdParam): Promise<PermissionDocument | null>;
    updateLabelPermission(id: ObjectIdParam, newLabel : string) : Promise<PermissionDocument | null>;
    permanentlyDeletePermission(id: ObjectIdParam) : Promise<PermissionDocument | null>;
    listPermissions() : Promise<PermissionDocument[] | null>;
    getPermissionsByStatus(isActive : boolean) : Promise<PermissionDocument[] | null>; 
}