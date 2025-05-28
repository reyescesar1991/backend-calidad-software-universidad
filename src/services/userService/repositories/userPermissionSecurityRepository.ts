import { inject, injectable } from "tsyringe";
import { IUserPermissionSecurityRepository } from "../interfaces/IUserPermissionSecurityRepository";
import { ClientSession, Model } from "mongoose";
import { UserPermissionSecurityDocument } from "../../../db/models/userPermission/userPermissionSecurity.model";
import { UserPermissionSecurityDto } from "../../../validations";

@injectable()
export class UserPermissionSecurityRepositoryImpl implements IUserPermissionSecurityRepository{

    constructor(@inject("UserPermissionSecurityModel") private readonly UserPermissionSecurityModel: Model<UserPermissionSecurityDocument>) { }


    async setDataPermissionSecurityUser(dataPermissionSecurityUser: UserPermissionSecurityDto, session?: ClientSession): Promise<UserPermissionSecurityDocument | null> {
        
        const [dataPermissionSecurity] = await this.UserPermissionSecurityModel.create([dataPermissionSecurityUser], {session});

        return dataPermissionSecurity;
    }
}