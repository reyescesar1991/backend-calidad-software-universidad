"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissionRepositoryImpl = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
let UserPermissionRepositoryImpl = class UserPermissionRepositoryImpl {
    UserPermissionModel;
    constructor(UserPermissionModel) {
        this.UserPermissionModel = UserPermissionModel;
    }
    async updateDataPermissionUser(idUserParam, dataPermissionUser, session) {
        // 1. Preparar el objeto de actualización
        const updateData = {
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
        return this.UserPermissionModel.findOneAndUpdate({ idUser: idUserParam }, { $set: updateData }, {
            new: true, // Devuelve el documento actualizado
            runValidators: true, // Ejecuta validaciones del esquema
            session // Sesión de transacción (opcional)
        }).exec();
    }
    async setDataPermissionUser(dataPermissionUser, session) {
        const [dataPermission] = await this.UserPermissionModel.create([dataPermissionUser], { session });
        return dataPermission;
    }
    async getDataPermissionUser(idCustomUserParam) {
        return await this.UserPermissionModel.findOne({
            idUser: idCustomUserParam
        }).exec();
    }
    /**
     * Obtiene solo los 'customPermissions' para un usuario dado donde 'can' es true.
     * @param idCustomUserParam El ID del usuario.
     * @returns Un array de objetos de permiso personalizado donde 'can' es true, o null si el usuario no es encontrado.
     * Devuelve un array vacío si el usuario es encontrado pero no tiene permisos con 'can: true'.
     */
    async getPermissionsUser(idCustomUserParam) {
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
                                as: "permission", // Nombre de la variable para cada elemento
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
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UserPermissionRepositoryImpl = UserPermissionRepositoryImpl;
exports.UserPermissionRepositoryImpl = UserPermissionRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UserPermissionModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserPermissionRepositoryImpl);
//# sourceMappingURL=userPermissionRepository.js.map