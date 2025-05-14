import { inject, injectable } from "tsyringe";
import { IRolePermissionRepository } from "../interfaces/IRoleRepository";
import { ClientSession, Model } from "mongoose";
import { RoleDocument } from "../../../db/models";
import { PermissionDocument } from "../../../db/models/permissionsModels/permission.model";


@injectable()
export class RolePermissionRepositoryImpl implements IRolePermissionRepository{

    constructor(@inject("RoleModel") private readonly RoleModel : Model<RoleDocument> ) {}

    async addPermissionRole(idRoleParam: string, permission: PermissionDocument, session?: ClientSession): Promise<RoleDocument | null> {
        
        return await this.RoleModel.findOneAndUpdate(

            {idRole : idRoleParam},
            {$push : {permissions : permission._id}},
            {new: true, useFindAndModify: true, session}
        ).exec();
    }

    async deletePermissionRole(idRoleParam: string, permission: PermissionDocument, session?: ClientSession): Promise<RoleDocument | null> {
        return await this.RoleModel.findOneAndUpdate(

            {idRole : idRoleParam},
            {$pull : {permissions : permission._id}},
            {new: true, useFindAndModify: true, session},
        ).exec();
    }

    
}