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
exports.UserRepositoryImpl = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
let UserRepositoryImpl = class UserRepositoryImpl {
    UserModel;
    constructor(UserModel) {
        this.UserModel = UserModel;
    }
    async findUserById(idUser) {
        return await this.UserModel.findById(idUser).exec();
    }
    async findUserByCustomId(customIdUser) {
        return await this.UserModel.findOne({ idUser: customIdUser }).exec();
    }
    async findUserByUsername(username) {
        return await this.UserModel.findOne({ username: username }).exec();
    }
    async searchUserByFilter(filter) {
        return await this.UserModel.find(filter).exec();
    }
    async createUser(dataUser, session) {
        const [user] = await this.UserModel.create([dataUser], { session });
        return user;
    }
    async updateUser(idUser, updateDataUser, session) {
        return await this.UserModel.findByIdAndUpdate(idUser, updateDataUser, { new: true, runValidators: true, session }).exec();
    }
    async changeStatusUser(newStatus, idUser, session) {
        return await this.UserModel.findByIdAndUpdate(idUser, { $set: { status: newStatus } }, { new: true, runValidators: true, session }).exec();
    }
    async addPasswordToHistory(userId, hashedPassword, session) {
        await this.UserModel.findByIdAndUpdate(userId, [
            {
                $set: {
                    passwordHistory: {
                        $filter: {
                            input: "$passwordHistory",
                            as: "ph", //Recorre elemento por elemento del array
                            cond: { $ne: ["$$ph", hashedPassword] } // Elimina duplicados
                        }
                    }
                }
            },
            {
                $set: {
                    passwordHistory: {
                        $concatArrays: [
                            [hashedPassword], // Nuevo elemento
                            "$passwordHistory" // Array existente
                        ]
                    }
                }
            },
            {
                $set: {
                    passwordHistory: { $slice: ["$passwordHistory", 5] } // Limitar a 5
                }
            }
        ], { session });
    }
    async isPasswordInHistory(userId, hashedPassword) {
        const user = await this.UserModel.findById(userId)
            .select("passwordHistory")
            .exec();
        if (!user) {
            //TODO: COLOCAR ERROR DE USUARIO NO ENCONTRADO
            throw new Error("Usuario no encontrado"); // O manejar como false según tu lógica
        }
        // 2. Verificar si el hash existe en el historial
        return user.passwordHistory.includes(hashedPassword);
    }
    async deletePasswordInHistory(userId, hashedPassword, session) {
        const result = await this.UserModel.findByIdAndUpdate(userId, {
            $pull: { passwordHistory: hashedPassword } // Elimina la contraseña del array
        }, { session, new: true } // Retorna el documento actualizado
        ).exec();
        return !!result;
    }
    async enableTwoFactorAuth(userId, session) {
        return await this.UserModel.findByIdAndUpdate(userId, { $set: { hasTwoFactor: true } }, { new: true, runValidators: true, session }).exec();
    }
    async disableTwoFactorAuth(userId, session) {
        return await this.UserModel.findByIdAndUpdate(userId, { $set: { hasTwoFactor: false } }, { new: true, runValidators: true, session }).exec();
    }
    async searchUsersByFilterWithOr(filter) {
        const orConditions = Object.entries(filter).map(([key, value]) => ({
            [key]: value
        }));
        // Si no hay condiciones, retornar array vacío
        if (orConditions.length === 0)
            return [];
        return await this.UserModel.find({
            $or: orConditions
        }).exec();
    }
    async getStatusUser(customIdUser) {
        const result = await this.UserModel.findOne({ idUser: customIdUser }, { status: 1, _id: 0 } // Proyección: solo el campo status
        ).lean() //Mejora el rendimiento al evitar la hidratación completa del documento
            .exec();
        return result?.status || null;
    }
};
exports.UserRepositoryImpl = UserRepositoryImpl;
exports.UserRepositoryImpl = UserRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UserModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserRepositoryImpl);
//# sourceMappingURL=userRepository.js.map