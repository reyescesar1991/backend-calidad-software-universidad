import { inject, injectable } from "tsyringe";
import { IRoleRepository } from "../interfaces/IRoleRepository";
import { Model } from "mongoose";
import { RoleDocument } from "../../../db/models";
import { FilterOptions, RoleFilterKeys } from "../../../core/types";
import { ObjectIdParam, RoleDto, UpdateRoleDto } from "../../../validations";

@injectable()
export class RoleRepositoryImpl implements IRoleRepository{

    constructor(@inject("RoleModel") private readonly RoleModel : Model<RoleDocument>){}


    async findRoleById(idRole: ObjectIdParam): Promise<RoleDocument | null> {
        throw new Error("Method not implemented.");
    }
    async findRoleByCustomId(customIdRole: string): Promise<RoleDocument | null> {
        throw new Error("Method not implemented.");
    }
    async searchRolesByFilters(filter: FilterOptions<RoleFilterKeys>): Promise<RoleDocument[] | null> {
        throw new Error("Method not implemented.");
    }
    async listRoles(): Promise<RoleDocument[] | null> {
        throw new Error("Method not implemented.");
    }
    async createRole(dataRole: RoleDto): Promise<RoleDocument | null> {
        throw new Error("Method not implemented.");
    }
    async updateRole(idRole: ObjectIdParam, dataRole: UpdateRoleDto): Promise<RoleDocument | null> {
        throw new Error("Method not implemented.");
    }
    async deleteRole(idRole: ObjectIdParam): Promise<RoleDocument | null> {
        throw new Error("Method not implemented.");
    }
    async activateRole(idRole: ObjectIdParam): Promise<RoleDocument | null> {
        throw new Error("Method not implemented.");
    }
    async setDefaultRoleSystem(idRole: ObjectIdParam): Promise<RoleDocument | null> {
        throw new Error("Method not implemented.");
    }
}