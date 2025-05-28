import { inject, injectable } from "tsyringe";
import { IUserPermissionRepository } from "../interfaces/IUserPermissionRepository";
import { ClientSession, Model } from "mongoose";
import { UserPermissionDocument } from "../../../db/models/userPermission/userPermission.model";
import { UserPermissionDto } from "../../../validations";

@injectable()
export class UserPermissionRepositoryImpl implements IUserPermissionRepository{

    constructor(@inject("UserPermissionModel") private readonly UserPermissionModel: Model<UserPermissionDocument>) { }


    async setDataPermissionUser(dataPermissionUser: UserPermissionDto, session?: ClientSession): Promise<UserPermissionDocument | null> {
        
        const [dataPermission] = await this.UserPermissionModel.create([dataPermissionUser], {session});

        return dataPermission;
    }
}