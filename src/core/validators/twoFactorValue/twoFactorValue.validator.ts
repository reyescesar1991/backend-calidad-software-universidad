import { injectable } from "tsyringe";
import { TwoFactorValueUserDocument } from "../../../db/models";
import { UserCodeNotMatchError, UserTwoFactorValueNotFoundError } from "../../exceptions";

@injectable()
export class TwoFactorValueValidator {

    static validateTwoFactorDataBase(twoFactorValueUser: TwoFactorValueUserDocument): void {

        if (twoFactorValueUser) throw new UserTwoFactorValueNotFoundError();
    }

    static validateCodeTwoFactor(codeParam: string, codeDb: string): void {

        if(codeParam !== codeDb) throw new UserCodeNotMatchError();
    }
}