import { TwoFactorValueUserDocument } from "../../../db/models";
import { UserTwoFactorValueUserDto } from "../../../validations";

export interface ITwoFactorValueRepository {

    findTwoFactorValueUserByCustomUserId(customIdUser : string) : Promise<TwoFactorValueUserDocument | null>;
    generateAndSendCode(dataFactor : UserTwoFactorValueUserDto) : Promise<TwoFactorValueUserDocument | null>;
    deleteTwoFactorValueUser(customIdUser : string) : Promise<TwoFactorValueUserDocument | null>;
}