import { ClientSession } from "mongoose";
import { FilterOptions, UserConfigFilterKeys } from "../../../core/types";
import { UserDocument } from "../../../db/models";
import { ObjectIdParam, UpdateUserDto, UserDto } from "../../../validations";


export interface IUserRepository {

    findUserById(idUser : ObjectIdParam) : Promise<UserDocument | null>;
    findUserByCustomId(customIdUser : string) : Promise<UserDocument | null>;
    findUserByUsername(username: string) : Promise<UserDocument | null>;
    searchUserByFilter(filter : FilterOptions<UserConfigFilterKeys>) : Promise<UserDocument[] | null>;
    createUser(dataUser : UserDto, session?: ClientSession) : Promise<UserDocument | null>;
    updateUser(idUser : ObjectIdParam, updateDataUser : UpdateUserDto, session?: ClientSession) : Promise<UserDocument | null>;
    changeStatusUser(newStatus: string, idUser: ObjectIdParam, session?: ClientSession) : Promise<UserDocument | null>;
    changeDepartmentUser(idUser : ObjectIdParam, idNewDepartment : ObjectIdParam, session?: ClientSession) : Promise<UserDocument | null>;
    changeRoleConfig(idUser : ObjectIdParam, idNewConfigRole : ObjectIdParam, session?: ClientSession) : Promise<UserDocument | null>;
    addPasswordToHistory(userId: ObjectIdParam, hashedPassword: string, session?: ClientSession): Promise<void>;
    isPasswordInHistory(userId: ObjectIdParam, hashedPassword: string): Promise<boolean>;
    deletePasswordInHistory(userId: ObjectIdParam, hashedPassword: string, session?: ClientSession): Promise<boolean>;
    enableTwoFactorAuth(userId: ObjectIdParam, session?: ClientSession): Promise<UserDocument>;
    disableTwoFactorAuth(userId: ObjectIdParam, session?: ClientSession): Promise<UserDocument>;
}