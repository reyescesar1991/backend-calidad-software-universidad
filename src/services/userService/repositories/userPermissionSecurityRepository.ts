import { inject, injectable } from "tsyringe";
import { IUserPermissionSecurityRepository } from "../interfaces/IUserPermissionSecurityRepository";
import { ClientSession, Model } from "mongoose";
import { UserPermissionSecurityDocument } from "../../../db/models/userPermission/userPermissionSecurity.model";
import { ObjectIdParam, UpdateUserPermissionSecurityDto, UserPermissionSecurityDto } from "../../../validations";

@injectable()
export class UserPermissionSecurityRepositoryImpl implements IUserPermissionSecurityRepository {

    constructor(@inject("UserPermissionSecurityModel") private readonly UserPermissionSecurityModel: Model<UserPermissionSecurityDocument>) { }

    async setDataPermissionSecurityUser(dataPermissionSecurityUser: UserPermissionSecurityDto, session?: ClientSession): Promise<UserPermissionSecurityDocument | null> {

        const [dataPermissionSecurity] = await this.UserPermissionSecurityModel.create([dataPermissionSecurityUser], { session });

        return dataPermissionSecurity;
    }

    async updateDataPermissionSecurityUser(idUserParam : string, dataPermissionSecurityUser: UpdateUserPermissionSecurityDto, session?: ClientSession): Promise<UserPermissionSecurityDocument | null> {

        // 1. Preparar el objeto de actualización
        const updateData: Record<string, any> = {
            updatedAt: new Date()
        };

        // 2. Manejar actualización de rol
        if (dataPermissionSecurityUser.idRol) {
            updateData.roleId = dataPermissionSecurityUser.idRol;
        }

        // 3. Manejar actualización de permisos personalizados
        if (dataPermissionSecurityUser.customPermissionsSecurity) {
            updateData.customPermissionsSecurity = dataPermissionSecurityUser.customPermissionsSecurity.map(perm => ({
                permissionSecurityId: perm.permissionSecurityId,
                can: perm.can,
                permissionKey: perm.permissionKey
            }));
        }

        console.log("Data actualizada en el repositorio: ", updateData);

        if(updateData.customPermissionsSecurity.length < 1){

            return this.UserPermissionSecurityModel.findOneAndDelete(
                {idUser : idUserParam},
                {session}
            ).exec();
        }
        

        // 4. Ejecutar la actualización
        return this.UserPermissionSecurityModel.findOneAndUpdate(
            {idUser : idUserParam},
            { $set: updateData },
            {
                new: true,         // Devuelve el documento actualizado
                runValidators: true, // Ejecuta validaciones del esquema
                session             // Sesión de transacción (opcional)
            }
        ).exec();
    }

    async getDataPermissionSecurityUser(idCustomUserParam: string): Promise<UserPermissionSecurityDocument | null> {
        
        return await this.UserPermissionSecurityModel.findOne(
            {
                idUser : idCustomUserParam
            }
        ).exec();
    }
}