import { injectable } from "tsyringe";
import { TwoFactorValueUserDocument } from "../../../db/models";
import { UserCodeNotMatchError, UserTwoFactorValueFoundError, UserTwoFactorValueNotFoundError } from "../../exceptions";

@injectable()
export class TwoFactorValueValidator {

    static validateTwoFactorDataBaseNotExists(twoFactorValueUser: TwoFactorValueUserDocument): void {

        if (!twoFactorValueUser) throw new UserTwoFactorValueNotFoundError();
    }

    static validateTwoFactorDataBaseExists(twoFactorValueUser: TwoFactorValueUserDocument): void {

        if (twoFactorValueUser) throw new UserTwoFactorValueFoundError();
    }

}