import { inject, injectable } from "tsyringe";
import { IRolePermissionSecurityRepository } from "../interfaces/IRoleRepository";
import { ClientSession, Model } from "mongoose";
import { PermissionSecurityDocument, RoleDocument } from "../../../db/models";

@injectable()
export class RolePermissionSecurityImpl implements IRolePermissionSecurityRepository{

    constructor(@inject("RoleModel") private readonly RoleModel : Model<RoleDocument>){}

    async addPermissionSecurityRole(idRoleParam: string, permissionSecurity: PermissionSecurityDocument, session?: ClientSession): Promise<RoleDocument | null> {
        
        return await this.RoleModel.findOneAndUpdate(

            {idRole : idRoleParam},
            {$push : {permissionsSecurity : permissionSecurity._id}},
            {new: true, useFindAndModify : true, session},
        ).exec();
    }
    async deletePermissionSecurityRole(idRoleParam: string, permissionSecurity: PermissionSecurityDocument, session?: ClientSession): Promise<RoleDocument | null> {
        
        return await this.RoleModel.findOneAndUpdate(

            {idRole : idRoleParam},
            {$pull : {permissionsSecurity : permissionSecurity._id}},
            {new: true, useFindAndModify : true, session},
        ).exec();
    }
}