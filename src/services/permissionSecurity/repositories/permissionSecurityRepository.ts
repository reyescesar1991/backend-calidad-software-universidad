import { inject, injectable } from "tsyringe";
import { PermissionSecurityDocument } from "../../../db/models";
import { PermissionSecurityDto, ObjectIdParam, UpdatePermissionSecurityDto } from "../../../validations";
import { IPermissionSecurityRepository } from "../interfaces/IPermissionSecurityRepository";
import { Model } from "mongoose";

@injectable()
export class PermissionSecurityRepository implements IPermissionSecurityRepository {

    constructor(@inject("PermissionSecurityModel") private readonly permissionSecurityModel: Model<PermissionSecurityDocument>) { };

    createPermissionSecurity(data: PermissionSecurityDto): Promise<PermissionSecurityDocument> {

        return this.permissionSecurityModel.create(data);
    }
    findPermissionSecurityById(idPermission: ObjectIdParam): Promise<PermissionSecurityDocument | null> {

        return this.permissionSecurityModel.findById(idPermission).exec();
    }
    updatePermissionSecurity(idPermission: ObjectIdParam, data: UpdatePermissionSecurityDto): Promise<PermissionSecurityDocument | null> {

        return this.permissionSecurityModel.findByIdAndUpdate(idPermission, data, { new: true, runValidators: true }).exec();
    }
    deletePermissionSecurity(idPermission: ObjectIdParam): Promise<PermissionSecurityDocument | null> {

        return this.permissionSecurityModel.findByIdAndUpdate(

            idPermission,
            { $set: { isActive: false } },
            { new: true, runValidators: true }
        ).exec();
    }
    togglePermissionSecurityActive(idPermission: ObjectIdParam): Promise<PermissionSecurityDocument | null> {
        return this.permissionSecurityModel.findByIdAndUpdate(

            idPermission,
            [{ $set: { isActive: { $not: "$isActive" } } }],
            { new: true },
        ).exec();
    }
    updateLabelPermissionSecurity(idPermission: ObjectIdParam, newLabel: string): Promise<PermissionSecurityDocument | null> {

        return this.permissionSecurityModel.findByIdAndUpdate(

            idPermission,
            { $set: { label: newLabel } },
            { new: true, runValidators: true },
        ).exec();
    }
    permanentlyDeletePermissionSecurity(idPermission: ObjectIdParam): Promise<PermissionSecurityDocument | null> {

        return this.permissionSecurityModel.findByIdAndDelete(
            idPermission
        ).exec();
    }
    listPermissionsSecurity(): Promise<PermissionSecurityDocument[] | null> {

        return this.permissionSecurityModel.find({}).exec();
    }
    getPermissionsSecurityByStatus(isActive: boolean): Promise<PermissionSecurityDocument[] | null> {

        return this.permissionSecurityModel.find({ isActive }).exec();
    }
    changeIsSystemDefinedPermissionSecurity(idPermission: ObjectIdParam): Promise<PermissionSecurityDocument | null> {

        return this.permissionSecurityModel.findByIdAndUpdate(
            idPermission,
            [{ $set: { isSystemDefined: { $not: "$isSystemDefined" } } }],
            { new: true },
        ).exec();
    }

}