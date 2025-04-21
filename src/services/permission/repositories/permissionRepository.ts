import { Model } from "mongoose";
import { CreatePermissionDto, ObjectIdParam, UpdatePermissionDto } from "../../../validations";
import { IPermissionRepository } from "../interfaces/IPermissionRepository";
import { PermissionDocument } from "../../../db/models/permissionsModels/permission.model";
import { inject, injectable } from "tsyringe";
import { SubrouteDocument } from "../../../db/models";
import { timeOutMongoError } from "../../../core/utils/timeOutError";

@injectable()
export class PermissionRepository implements IPermissionRepository {

    constructor(@inject("PermissionModel") private readonly permissionModel: Model<PermissionDocument>) { }

    async createPermission(data: CreatePermissionDto): Promise<any> {
        return this.permissionModel.create(data);
    }
    async findPermissionById(id: ObjectIdParam): Promise<any> {

        try {

            return this.permissionModel.findById(id).exec();

        } catch (error) {

            timeOutMongoError(error);

        }

        return this.permissionModel.findById(id).exec();
    }
    async updatePermission(id: ObjectIdParam, data: UpdatePermissionDto): Promise<any> {
        return this.permissionModel.findByIdAndUpdate(id, data, { new: true, runValidators: true })
            .exec();
    }

    async deletePermission(id: ObjectIdParam): Promise<PermissionDocument | null> {
        return this.permissionModel.findByIdAndUpdate(
            id,
            { $set: { isActive: false } },
            { new: true, runValidators: true }
        ).exec();
    }

    // En PermissionRepository.ts
    async togglePermissionCan(id: ObjectIdParam): Promise<PermissionDocument | null> {
        return this.permissionModel.findByIdAndUpdate(
            id,
            [{ $set: { can: { $not: "$can" } } }],
            { new: true }
        ).exec();
    }

    async updateLabelPermission(id: ObjectIdParam, newLabel: string): Promise<PermissionDocument | null> {
        return this.permissionModel.findByIdAndUpdate(
            id,
            { $set: { label: newLabel } },
            { new: true, runValidators: true }
        ).exec();
    }

    async permanentlyDeletePermission(id: ObjectIdParam): Promise<PermissionDocument | null> {

        return this.permissionModel.findByIdAndDelete(id).exec();
    }

    async listPermissions(): Promise<PermissionDocument[] | null> {

        return this.permissionModel.find({}).exec();
    }

    async getPermissionsByStatus(isActive: boolean): Promise<PermissionDocument[] | null> {

        return this.permissionModel.find({ isActive }).exec();
    }

    async findByField<T extends keyof PermissionDocument>(
        field: T,
        value: PermissionDocument[T]
    ): Promise<PermissionDocument | null> {
        return this.permissionModel.findOne({ [field]: value }).exec();
    }

}