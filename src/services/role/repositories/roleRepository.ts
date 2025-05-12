import { inject, injectable } from "tsyringe";
import { IRoleRepository } from "../interfaces/IRoleRepository";
import { ClientSession, Model } from "mongoose";
import { PermissionSecurityDocument, RoleDocument } from "../../../db/models";
import { FilterOptions, RoleFilterKeys } from "../../../core/types";
import { ObjectIdParam, RoleDto, UpdateRoleDto } from "../../../validations";
import { PermissionDocument } from "../../../db/models/permissionsModels/permission.model";

@injectable()
export class RoleRepositoryImpl implements IRoleRepository{

    constructor(@inject("RoleModel") private readonly RoleModel : Model<RoleDocument>){}

    async findRoleById(idRole: ObjectIdParam): Promise<RoleDocument | null> {
        
        return await this.RoleModel.findById(idRole).exec();
    }
    async getPermissionsRole(customIdRole: string): Promise<PermissionDocument[] | null> {
        const permissions =  await this.RoleModel.findOne({idRole : customIdRole})
        .populate<{ permissions: PermissionDocument[] }>("permissions").exec();

        return permissions.permissions;
    }
    async getPermissionsSecurityRole(customIdRole: string): Promise<PermissionSecurityDocument[] | null> {
        const permissionsSecurity = await this.RoleModel.findOne({idRole : customIdRole})
        .populate<{permissionsSecurity : PermissionSecurityDocument[]}>("permissionsSecurity").exec();

        return permissionsSecurity.permissionsSecurity;
    }
    async findRoleByCustomId(customIdRole: string): Promise<RoleDocument | null> {
        return await this.RoleModel.findOne({idRole : customIdRole}).exec();
    }
    async searchRolesByFilters(filter: FilterOptions<RoleFilterKeys>): Promise<RoleDocument[] | null> {
        return await this.RoleModel.find(filter).exec();
    }
    async listRoles(): Promise<RoleDocument[] | null> {
        return await this.RoleModel.find({});
    }
    async createRole(dataRole: RoleDto, session?: ClientSession): Promise<RoleDocument | null> {
        const [newRole] = await this.RoleModel.create([dataRole], { session });
        return newRole;
    }
    async updateRole(idRole: ObjectIdParam, dataRole: UpdateRoleDto, session?: ClientSession): Promise<RoleDocument | null> {
        return await this.RoleModel.findByIdAndUpdate(

            idRole,
            dataRole,
            {new : true, runValidators : true, session},
        ).exec();
    }
    async deleteRole(idRole: ObjectIdParam, session?: ClientSession): Promise<RoleDocument | null> {
        return await this.RoleModel.findByIdAndUpdate(
            idRole,
            {$set : {isActive : false}},
            {new: true, runValidators : true, session},
        ).exec();
    }
    async activateRole(idRole: ObjectIdParam, session?: ClientSession): Promise<RoleDocument | null> {
        return await this.RoleModel.findByIdAndUpdate(
            idRole,
            {$set : {isActive : true}},
            {new : true, runValidators : true, session},
        ).exec();
    }
    async setDefaultRoleSystem(idRole: ObjectIdParam, session?: ClientSession): Promise<RoleDocument | null> {
        return await this.RoleModel.findByIdAndUpdate(
            idRole,
            [{$set : {isDefault : { $not : '$isDefault'}}}],
            {new: true, runValidators : true, session}
        ).exec();
    }
    async unsetAllDefaultRoles(session?: ClientSession): Promise<void> {
        await this.RoleModel.updateMany(
            { isDefault: true },
            { $set: { isDefault: false } },
            { session }
        );
    }
}