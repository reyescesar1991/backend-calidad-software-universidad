import { TwoFactorValueUserDocument } from "../../../db/models";
import { ObjectIdParam, UserTwoFactorValueUserDto } from "../../../validations";

export interface ITwoFactorValueRepository {

    findTwoFactorValueUserByCustomUserId(idUser : ObjectIdParam) : Promise<TwoFactorValueUserDocument | null>;
    generateAndSendCode(dataFactor : UserTwoFactorValueUserDto) : Promise<TwoFactorValueUserDocument | null>;
    deleteTwoFactorValueUser(customIdUser : string) : Promise<TwoFactorValueUserDocument | null>;
}