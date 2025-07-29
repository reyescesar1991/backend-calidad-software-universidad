import { inject, injectable } from "tsyringe";
import { IRoleConfigRepository } from "../interfaces/IRoleConfigRepository";
import { ClientSession, Model } from "mongoose";
import { RoleConfigDocument } from "../../../db/models/roleModels/roleConfig.model";
import { ConfigRoleResponse, FilterOptions, RoleConfigFilterKeys } from "../../../core/types";
import { ObjectIdParam, RoleConfigDto, UpdateRoleConfigDto } from "../../../validations";
import { RoleDocument } from "../../../db/models";
import { handleError } from "../../../core/exceptions";

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

        try {

            console.log('ROLE CONFIG', roleConfigId);
        

        const roleConfig = await this.RoleConfigModel.findOne({rolID : roleConfigId}).populate<{ rolID: RoleDocument }>('rolID').exec();

        console.log(roleConfig);
        

        return roleConfig.rolID;
            
        } catch (error) {
            
            handleError(error)
        }
    }


    async findRolesByConfigRoles(): Promise<ConfigRoleResponse[]> {

        const roleConfigs = await this.RoleConfigModel.find({isActive : true})
            .populate<{ rolID: RoleDocument | null }>({
                path: 'rolID',
                match: { isActive: true }, // Filtra para que solo popule si el rol está activo
                select: '_id idRole name label' // Selecciona solo los campos que necesitas
            })
            .exec();

        // Extraer los documentos de rol poblados.
        // El campo 'rolID' será null si la referencia estaba rota o si no cumplió la condición 'match'.
        // El filtro se encarga de limpiar esos resultados nulos.
        // const roles = roleConfigs
        //     .map(config => config.rolID)
        //     .filter((role): role is RoleDocument => role !== null);

        return roleConfigs.map(config => ({
            _id: config.rolID?._id,
            idRole: config.rolID?.idRole,
            name: config.rolID?.name,
            label: config.rolID?.label,
            idConfigRole: config._id
        }));
    }
}