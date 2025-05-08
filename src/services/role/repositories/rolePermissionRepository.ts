import { inject, injectable } from "tsyringe";
import { IRolePermissionRepository } from "../interfaces/IRoleRepository";
import { ClientSession, Model } from "mongoose";
import { RoleDocument } from "../../../db/models";
import { ObjectIdParam } from "../../../validations";


@injectable()
export class RolePermissionRepositoryImpl implements IRolePermissionRepository{

    constructor(@inject("RoleModel") private readonly RoleModel : Model<RoleDocument> ) {}

    async addPermissionRole(idRoleParam: string, idPermission: string, session?: ClientSession): Promise<RoleDocument | null> {
        
        return await this.RoleModel.findOneAndUpdate(

            {idRole : idRoleParam},
            {$push : {permissions : idPermission}},
            {new: true, useFindAndModify: true, session}
        ).exec();
    }

    async deletePermissionRole(idRoleParam: string, idPermission: string, session?: ClientSession): Promise<RoleDocument | null> {
        return await this.RoleModel.findOneAndUpdate(

            {idRole : idRoleParam},
            {$pull : {permissions : idPermission}},
            {new: true, useFindAndModify: true, session},
        ).exec();
    }
}