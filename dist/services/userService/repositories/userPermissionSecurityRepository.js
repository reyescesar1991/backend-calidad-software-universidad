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
exports.UserPermissionSecurityRepositoryImpl = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
let UserPermissionSecurityRepositoryImpl = class UserPermissionSecurityRepositoryImpl {
    UserPermissionSecurityModel;
    constructor(UserPermissionSecurityModel) {
        this.UserPermissionSecurityModel = UserPermissionSecurityModel;
    }
    async setDataPermissionSecurityUser(dataPermissionSecurityUser, session) {
        const [dataPermissionSecurity] = await this.UserPermissionSecurityModel.create([dataPermissionSecurityUser], { session });
        return dataPermissionSecurity;
    }
    async updateDataPermissionSecurityUser(idUserParam, dataPermissionSecurityUser, session) {
        // 1. Preparar el objeto de actualización
        const updateData = {
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
        if (updateData.customPermissionsSecurity.length < 1) {
            return this.UserPermissionSecurityModel.findOneAndDelete({ idUser: idUserParam }, { session }).exec();
        }
        // 4. Ejecutar la actualización
        return this.UserPermissionSecurityModel.findOneAndUpdate({ idUser: idUserParam }, { $set: updateData }, {
            new: true, // Devuelve el documento actualizado
            runValidators: true, // Ejecuta validaciones del esquema
            session // Sesión de transacción (opcional)
        }).exec();
    }
    async getDataPermissionSecurityUser(idCustomUserParam) {
        return await this.UserPermissionSecurityModel.findOne({
            idUser: idCustomUserParam
        }).exec();
    }
};
exports.UserPermissionSecurityRepositoryImpl = UserPermissionSecurityRepositoryImpl;
exports.UserPermissionSecurityRepositoryImpl = UserPermissionSecurityRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UserPermissionSecurityModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserPermissionSecurityRepositoryImpl);
//# sourceMappingURL=userPermissionSecurityRepository.js.map