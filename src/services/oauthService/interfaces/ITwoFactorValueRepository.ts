import { ClientSession } from "mongoose";
import { TwoFactorValueUserDocument } from "../../../db/models";
import { ObjectIdParam, UserTwoFactorValueUserDto } from "../../../validations";

export interface ITwoFactorValueRepository {

    findTwoFactorValueUserByCustomUserId(idUser : ObjectIdParam) : Promise<TwoFactorValueUserDocument | null>;
    generateAndSendCode(dataFactor : UserTwoFactorValueUserDto, session ?: ClientSession) : Promise<TwoFactorValueUserDocument | null>;
    deleteTwoFactorValueUser(idUser : ObjectIdParam, session ?: ClientSession) : Promise<TwoFactorValueUserDocument | null>;
}