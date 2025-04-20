import { PermissionSecurityDocument } from "../../../db/models";
import { ObjectIdParam, PermissionSecurityDto, UpdatePermissionSecurityDto } from "../../../validations";

export interface IPermissionSecurityRepository{


    createPermissionSecurity(data: PermissionSecurityDto) : Promise<PermissionSecurityDocument>;
    findPermissionSecurityById(idPermission : ObjectIdParam) : Promise<PermissionSecurityDocument | null>;
    updatePermissionSecurity(idPermission: ObjectIdParam, data : UpdatePermissionSecurityDto) : Promise<PermissionSecurityDocument | null>;
    deletePermissionSecurity(idPermission: ObjectIdParam) : Promise<PermissionSecurityDocument | null>;
    togglePermissionSecurityActive(idPermission: ObjectIdParam) : Promise<PermissionSecurityDocument | null>;
    updateLabelPermissionSecurity(idPermission: ObjectIdParam, newLabel : string) : Promise<PermissionSecurityDocument | null>;
    permanentlyDeletePermissionSecurity(idPermission: ObjectIdParam) : Promise<PermissionSecurityDocument | null>;
    listPermissionsSecurity() : Promise<PermissionSecurityDocument[] | null>;
    getPermissionsSecurityByStatus(isActive : boolean) : Promise<PermissionSecurityDocument[] | null>;
    changeIsSystemDefinedPermissionSecurity(idPermission : ObjectIdParam) : Promise<PermissionSecurityDocument | null>;
    findByField<T extends keyof PermissionSecurityDocument>(
            field: T,
            value: PermissionSecurityDocument[T]
        ): Promise<PermissionSecurityDocument | null>;
}