import { PermissionDocument } from "../../../db/models/permissionsModels/permission.model";
import { CreatePermissionDto, ObjectIdParam, UpdatePermissionDto } from "../../../validations";

export interface IPermissionRepository{

    createPermission(data : CreatePermissionDto) : Promise<PermissionDocument>;
    findPermissionById(id: ObjectIdParam) : Promise<PermissionDocument | null>;
    updatePermission(id: ObjectIdParam, data: UpdatePermissionDto) : Promise<PermissionDocument | null>;
    deletePermission(id: ObjectIdParam) : Promise<PermissionDocument | null>;
}