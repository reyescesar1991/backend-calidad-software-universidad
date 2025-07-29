import { inject, injectable } from "tsyringe";
import { IUserPermissionRepository } from "../interfaces/IUserPermissionRepository";
import { ClientSession, Model } from "mongoose";
import { UserPermissionDocument } from "../../../db/models/userPermission/userPermission.model";
import { UpdateUserPermissionDto, UserPermissionDto } from "../../../validations";
import { ICustomPermission } from "../../../core/types";

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



    /**
     * Obtiene solo los 'customPermissions' para un usuario dado donde 'can' es true.
     * @param idCustomUserParam El ID del usuario.
     * @returns Un array de objetos de permiso personalizado donde 'can' es true, o null si el usuario no es encontrado.
     * Devuelve un array vacío si el usuario es encontrado pero no tiene permisos con 'can: true'.
     */
    async getPermissionsUser(idCustomUserParam: string): Promise<ICustomPermission[] | null> {
        try {
            const result = await this.UserPermissionModel.aggregate([
                // 1. Filtrar el documento del usuario por idUser
                {
                    $match: {
                        idUser: idCustomUserParam
                    }
                },
                // 2. Proyectar solo los customPermissions y filtrarlos por 'can: true'
                {
                    $project: {
                        _id: 0, // Excluimos el _id del documento raíz si no lo necesitamos
                        customPermissions: {
                            $filter: {
                                input: "$customPermissions", // El array sobre el que queremos iterar
                                as: "permission",             // Nombre de la variable para cada elemento
                                cond: { $eq: ["$$permission.can", true] } // Condición: si 'can' es true
                            }
                        }
                    }
                }
            ]).exec();

            // La agregación devuelve un array de documentos que coinciden con el $match.
            // Si no se encuentra el usuario, el array estará vacío.
            if (!result || result.length === 0) {
                return null;
            }

            // Si se encuentra el usuario, 'result' será un array con un solo objeto
            // que contiene el array 'customPermissions' filtrado.
            const userPermissionsDoc = result[0];

            // Aseguramos que customPermissions sea un array, incluso si está vacío.
            return userPermissionsDoc.customPermissions || [];
        } catch (error) {
            throw error;
        }
    }
}