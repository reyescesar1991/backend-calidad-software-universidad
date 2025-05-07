import { inject, injectable } from "tsyringe";
import { IRolePermissionRepository } from "../interfaces/IRoleRepository";
import { Model } from "mongoose";
import { RoleDocument } from "../../../db/models";
import { ObjectIdParam } from "../../../validations";


@injectable()
export class RolePermissionRepositoryImpl implements IRolePermissionRepository{

    constructor(@inject("RoleModel") private readonly RoleModel : Model<RoleDocument> ) {}

    async addPermissionRole(idRole: ObjectIdParam, idPermission: string): Promise<RoleDocument | null> {
        throw new Error("Method not implemented.");
    }
    async deletePermissionRole(idRole: ObjectIdParam, idPermission: string): Promise<RoleDocument | null> {
        throw new Error("Method not implemented.");
    }
}