import { inject, injectable } from "tsyringe";
import { IRolePermissionSecurityRepository } from "../interfaces/IRoleRepository";
import { Model } from "mongoose";
import { RoleDocument } from "../../../db/models";
import { ObjectIdParam } from "../../../validations";

@injectable()
export class RolePermissionSecurityImpl implements IRolePermissionSecurityRepository{

    constructor(@inject("RoleModel") private readonly RoleModel : Model<RoleDocument>){}

    async addPermissionSecurityRole(idRole: ObjectIdParam, idPermissionSecurity: string): Promise<RoleDocument | null> {
        throw new Error("Method not implemented.");
    }
    async deletePermissionSecurityRole(idRole: ObjectIdParam, idPermissionSecurity: string): Promise<RoleDocument | null> {
        throw new Error("Method not implemented.");
    }
}