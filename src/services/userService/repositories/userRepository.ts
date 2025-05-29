import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../interfaces/IUserRepository";
import { ClientSession, Model } from "mongoose";
import { UserDocument } from "../../../db/models";
import { FilterOptions, UserConfigFilterKeys } from "../../../core/types";
import { ObjectIdParam, UserDto, UpdateUserDto } from "../../../validations";

@injectable()
export class UserRepositoryImpl implements IUserRepository {

    constructor(@inject("UserModel") private readonly UserModel: Model<UserDocument>) { }

    async findUserById(idUser: ObjectIdParam): Promise<UserDocument | null> {

        return await this.UserModel.findById(idUser).exec();
    }
    async findUserByCustomId(customIdUser: string): Promise<UserDocument | null> {

        return await this.UserModel.findOne({ idUser: customIdUser }).exec();
    }
    async findUserByUsername(username: string): Promise<UserDocument | null> {

        return await this.UserModel.findOne({ username: username }).exec();
    }
    async searchUserByFilter(filter: FilterOptions<UserConfigFilterKeys>): Promise<UserDocument[] | null> {

        return await this.UserModel.find(filter).exec();
    }
    async createUser(dataUser: UserDto, session?: ClientSession): Promise<UserDocument | null> {

        const [user] = await this.UserModel.create([dataUser], { session });
        return user;
    }
    async updateUser(idUser: ObjectIdParam, updateDataUser: UpdateUserDto, session?: ClientSession): Promise<UserDocument | null> {

        return await this.UserModel.findByIdAndUpdate(

            idUser,
            updateDataUser,
            { new: true, runValidators: true, session }

        ).exec();
    }
    async changeStatusUser(newStatus: string, idUser: ObjectIdParam, session?: ClientSession): Promise<UserDocument | null> {

        return await this.UserModel.findByIdAndUpdate(
            idUser,
            { $set: { status: newStatus } },
            { new: true, runValidators: true, session }
        ).exec();
    }
    async addPasswordToHistory(userId: ObjectIdParam, hashedPassword: string, session?: ClientSession): Promise<void> {

        await this.UserModel.findByIdAndUpdate(
            userId,
            [
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
            ],
            { session }
        );
    }

    async isPasswordInHistory(userId: ObjectIdParam, hashedPassword: string): Promise<boolean> {

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
    async deletePasswordInHistory(userId: ObjectIdParam, hashedPassword: string, session?: ClientSession): Promise<boolean> {

        const result = await this.UserModel.findByIdAndUpdate(
            userId,
            {
                $pull: { passwordHistory: hashedPassword } // Elimina la contraseña del array
            },
            { session, new: true } // Retorna el documento actualizado
        ).exec();

        return !!result;
    }
    async enableTwoFactorAuth(userId: ObjectIdParam, session?: ClientSession): Promise<UserDocument> {

        return await this.UserModel.findByIdAndUpdate(

            userId,
            { $set: { hasTwoFactor: true } },
            { new: true, runValidators: true, session }
        ).exec();
    }
    async disableTwoFactorAuth(userId: ObjectIdParam, session?: ClientSession): Promise<UserDocument> {

        return await this.UserModel.findByIdAndUpdate(

            userId,
            { $set: { hasTwoFactor: false } },
            { new: true, runValidators: true, session }
        ).exec();
    }

    async searchUsersByFilterWithOr(filter: FilterOptions<UserConfigFilterKeys>): Promise<UserDocument[] | null> {

        const orConditions = Object.entries(filter).map(([key, value]) => ({
            [key]: value
        }));

        // Si no hay condiciones, retornar array vacío
        if (orConditions.length === 0) return [];

        return await this.UserModel.find({
            $or: orConditions
        }).exec();
    }



}