import { inject, injectable } from "tsyringe";
import { PermissionSecurityDocument } from "../../../db/models";
import { PermissionSecurityDto, ObjectIdParam, UpdatePermissionSecurityDto } from "../../../validations";
import { IPermissionSecurityRepository } from "../interfaces/IPermissionSecurityRepository";
import { Model } from "mongoose";

@injectable()
export class PermissionSecurityRepository implements IPermissionSecurityRepository{

    constructor(@inject("PermissionSecurityModel") private readonly permissionSecurityModel : Model<PermissionSecurityDocument>){};

    createPermissionSecurity(data: PermissionSecurityDto): Promise<PermissionSecurityDocument> {
        throw new Error("Method not implemented.");
    }
    findPermissionSecurityById(idPermission: ObjectIdParam): Promise<PermissionSecurityDocument | null> {
        throw new Error("Method not implemented.");
    }
    updatePermissionSecurity(idPermission: ObjectIdParam, data: UpdatePermissionSecurityDto): Promise<PermissionSecurityDocument | null> {
        throw new Error("Method not implemented.");
    }
    deletePermissionSecurity(idPermission: ObjectIdParam): Promise<PermissionSecurityDocument | null> {
        throw new Error("Method not implemented.");
    }
    togglePermissionSecurityCan(idPermission: ObjectIdParam): Promise<PermissionSecurityDocument | null> {
        throw new Error("Method not implemented.");
    }
    updateLabelPermissionSecurity(idPermission: ObjectIdParam, newLabel: string): Promise<PermissionSecurityDocument | null> {
        throw new Error("Method not implemented.");
    }
    permanentlyDeletePermissionSecurity(idPermission: ObjectIdParam): Promise<PermissionSecurityDocument | null> {
        throw new Error("Method not implemented.");
    }
    listPermissionsSecurity(): Promise<PermissionSecurityDocument[] | null> {
        throw new Error("Method not implemented.");
    }
    getPermissionsSecurityByStatus(isActive: boolean): Promise<PermissionSecurityDocument[] | null> {
        throw new Error("Method not implemented.");
    }
    changeIsSystemDefinedPermissionSecurity(isSystemDefined: boolean): Promise<PermissionSecurityDocument | null> {
        throw new Error("Method not implemented.");
    }
    
}