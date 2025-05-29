import { inject, injectable } from "tsyringe";
import { IUserPermissionRepository } from "../interfaces/IUserPermissionRepository";
import { ClientSession, Model } from "mongoose";
import { UserPermissionDocument } from "../../../db/models/userPermission/userPermission.model";
import { UpdateUserPermissionDto, UserPermissionDto } from "../../../validations";

@injectable()
export class UserPermissionRepositoryImpl implements IUserPermissionRepository {

    constructor(@inject("UserPermissionModel") private readonly UserPermissionModel: Model<UserPermissionDocument>) { }

    async updateDataPermissionUser(idUserParam: string, dataPermissionUser: UpdateUserPermissionDto, session?: ClientSession): Promise<UserPermissionDocument | null> {
        // 1. Preparar el objeto de actualización
        const updateData: Record<string, any> = {
            updatedAt: new Date()
        };

        // 2. Manejar actualización de rol
        if (dataPermissionUser.roleId) {
            updateData.roleId = dataPermissionUser.roleId;
        }

        // 3. Manejar actualización de permisos personalizados
        if (dataPermissionUser.customPermissions) {
            updateData.customPermissions = dataPermissionUser.customPermissions.map(perm => ({
                permissionId: perm.permissionId,
                can: perm.can,
                permissionLabel: perm.permissionLabel
            }));
        }

        // 4. Ejecutar la actualización
        return this.UserPermissionModel.findOneAndUpdate(
            {idUser : idUserParam},
            { $set: updateData },
            {
                new: true,         // Devuelve el documento actualizado
                runValidators: true, // Ejecuta validaciones del esquema
                session             // Sesión de transacción (opcional)
            }
        ).exec();
    }


    async setDataPermissionUser(dataPermissionUser: UserPermissionDto, session?: ClientSession): Promise<UserPermissionDocument | null> {

        const [dataPermission] = await this.UserPermissionModel.create([dataPermissionUser], { session });

        return dataPermission;
    }

    async getDataPermissionUser(idCustomUserParam: string): Promise<UserPermissionDocument | null> {
        
        return await this.UserPermissionModel.findOne(
            {
                idUser : idCustomUserParam
            }
        ).exec();
    }
}