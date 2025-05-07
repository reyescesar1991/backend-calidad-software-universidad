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
        
        return await this.RoleModel.findById(idRole).exec();
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
    async createRole(dataRole: RoleDto): Promise<RoleDocument | null> {
        return await this.RoleModel.create(dataRole);
    }
    async updateRole(idRole: ObjectIdParam, dataRole: UpdateRoleDto): Promise<RoleDocument | null> {
        return await this.RoleModel.findByIdAndUpdate(

            idRole,
            dataRole,
            {new : true, runValidators : true}
        ).exec();
    }
    async deleteRole(idRole: ObjectIdParam): Promise<RoleDocument | null> {
        return await this.RoleModel.findByIdAndUpdate(
            idRole,
            {$set : {isActive : false}},
            {new: true, runValidators : true},
        ).exec();
    }
    async activateRole(idRole: ObjectIdParam): Promise<RoleDocument | null> {
        return await this.RoleModel.findByIdAndUpdate(
            idRole,
            {$set : {isActive : true}},
            {new : true, runValidators : true},
        ).exec();
    }
    async setDefaultRoleSystem(idRole: ObjectIdParam): Promise<RoleDocument | null> {
        return await this.RoleModel.findByIdAndUpdate(
            idRole,
            [{$set : {isActive : { $not : '$isActive'}}}],
            {new: true, runValidators : true}
        ).exec();
    }
}