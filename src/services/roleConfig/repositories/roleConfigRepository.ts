import { inject, injectable } from "tsyringe";
import { IRoleConfigRepository } from "../interfaces/IRoleConfigRepository";
import { ClientSession, Model } from "mongoose";
import { RoleConfigDocument } from "../../../db/models/roleModels/roleConfig.model";
import { FilterOptions, RoleConfigFilterKeys } from "../../../core/types";
import { ObjectIdParam, RoleConfigDto, UpdateRoleConfigDto } from "../../../validations";
import { RoleDocument } from "../../../db/models";

@injectable()
export class RoleConfigRepositoryImpl implements IRoleConfigRepository {

    constructor(@inject("RoleConfigModel") private readonly RoleConfigModel: Model<RoleConfigDocument>) { }


    async findConfigRoleById(idConfigRole: ObjectIdParam): Promise<RoleConfigDocument | null> {

        return await this.RoleConfigModel.findById(idConfigRole).exec();
    }
    async findConfigRoleByNameRole(nameRole: string): Promise<RoleConfigDocument | null> {

        return await this.RoleConfigModel.findOne({ rolName: nameRole });
    }
    async searchConfigRoleByFilter(filter: FilterOptions<RoleConfigFilterKeys>): Promise<RoleConfigDocument[] | null> {
        return await this.RoleConfigModel.find(filter).exec();
    }
    async activateConfigRole(idConfigRole: ObjectIdParam, session?: ClientSession): Promise<RoleConfigDocument | null> {

        return await this.RoleConfigModel.findByIdAndUpdate(

            idConfigRole,
            { $set: { isActive: true } },
            { new: true, runValidators: true, session },
        ).exec();
    }
    async deleteConfigRole(idConfigRole: ObjectIdParam, session?: ClientSession): Promise<RoleConfigDocument | null> {
        return await this.RoleConfigModel.findByIdAndUpdate(

            idConfigRole,
            { $set: { isActive: false } },
            { new: true, runValidators: true, session }
        ).exec();
    }
    async createConfigRole(dataConfigRole: RoleConfigDto, session?: ClientSession): Promise<RoleConfigDocument | null> {

        const [newConfigRole] = await this.RoleConfigModel.create([dataConfigRole], { session });
        return newConfigRole;
    }
    async updateConfigRole(idConfigRole: ObjectIdParam, dataConfigRoleUpdate: UpdateRoleConfigDto, session?: ClientSession): Promise<RoleConfigDocument | null> {

        return await this.RoleConfigModel.findByIdAndUpdate(
            idConfigRole,
            dataConfigRoleUpdate,
            { new: true, runValidators: true, session }
        ).exec();
    }

    async findRoleConfigWithRole(
        roleConfigId: ObjectIdParam
    ): Promise<RoleDocument | null> {

        const roleConfig = await this.RoleConfigModel.findById(roleConfigId).populate<{ rolID: RoleDocument }>('rolID').exec();

        return roleConfig.rolID;
    }


    async findRolesByConfigRoles(): Promise<RoleDocument[]> {

        const roleConfigs = await this.RoleConfigModel.find({})
            .populate<{ rolID: RoleDocument | null }>({
                path: 'rolID',
                match: { isActive: true }, // Filtra para que solo popule si el rol está activo
                select: '_id idRole name label' // Selecciona solo los campos que necesitas
            })
            .exec();

        // Extraer los documentos de rol poblados.
        // El campo 'rolID' será null si la referencia estaba rota o si no cumplió la condición 'match'.
        // El filtro se encarga de limpiar esos resultados nulos.
        const roles = roleConfigs
            .map(config => config.rolID)
            .filter((role): role is RoleDocument => role !== null);

        return roles;
    }
}