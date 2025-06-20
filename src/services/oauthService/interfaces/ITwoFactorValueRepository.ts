import { ClientSession } from "mongoose";
import { TwoFactorValueUserDocument } from "../../../db/models";
import { ObjectIdParam, UserTwoFactorValueUserDto } from "../../../validations";

export interface ITwoFactorValueRepository {

    findTwoFactorValueUserByCustomUserId(idUser : ObjectIdParam) : Promise<TwoFactorValueUserDocument | null>;
    generateAndSendCode(dataFactor : UserTwoFactorValueUserDto, session ?: ClientSession) : Promise<TwoFactorValueUserDocument | null>;
    deleteTwoFactorValueUser(customIdUser : string, session ?: ClientSession) : Promise<TwoFactorValueUserDocument | null>;
}