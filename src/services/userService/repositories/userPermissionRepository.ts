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
     * Obtiene solo el campo 'customPermissions' para un usuario dado.
     * @param idCustomUserParam El ID del usuario.
     * @returns Un array de objetos de permiso personalizado o null si el usuario no es encontrado.
     */
    async getPermissionsUser(idCustomUserParam: string): Promise<ICustomPermission[] | null> {
        try {
            // Usamos .findOne() para encontrar el documento del usuario
            // y .select('customPermissions') para proyectar solo ese campo.
            // .lean() es opcional pero recomendado para lecturas si no necesitas métodos de documento Mongoose.
            const userPermission = await this.UserPermissionModel.findOne(
                { idUser: idCustomUserParam }
            )
            .select('customPermissions -_id') // Selecciona customPermissions y excluye _id
            .lean() // Devuelve un objeto POJO (Plain Old JavaScript Object) en lugar de un documento Mongoose
            .exec();

            // Si el documento no se encuentra, userPermission será null.
            // Si se encuentra, pero customPermissions es null/undefined (aunque el esquema lo tiene como default: []),
            // podemos devolver un array vacío o null.
            if (!userPermission) {
                return null; // O [] si prefieres un array vacío para indicar "no hay permisos personalizados"
            }

            // userPermission ahora contendrá solo { customPermissions: [...] }
            return userPermission.customPermissions || []; // Aseguramos un array vacío si por alguna razón es null
        } catch (error) {
            // Es buena práctica manejar errores en el repositorio o propagarlos.
            // Aquí, lo relanzamos para que la capa superior (servicio) lo maneje.
            throw error;
        }
    }
}