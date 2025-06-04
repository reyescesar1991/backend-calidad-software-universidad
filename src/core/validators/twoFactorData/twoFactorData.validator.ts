import { inject, injectable } from "tsyringe";
import { ITwoFactorDataRepository } from "../../../services/oauthService";
import { TwoFactorAuthDocument } from "../../../db/models";
import { TwoFactorDataNotExistsByMethodError, TwoFactorDataNotExistsError, TwoFactorDataNotFoundInDatabaseError, TwoFactorDataQuantityNewFactorError } from "../../exceptions";

@injectable()
export class TwoFactorDataValidator{

    constructor(@inject("ITwoFactorDataRepository") private readonly twoFactorDataRepository : ITwoFactorDataRepository){}

    static validateTwoFactorDataBase(twoFactorDataBase : TwoFactorAuthDocument[]) : void{

        if(twoFactorDataBase.length < 1) throw new TwoFactorDataNotFoundInDatabaseError();
    }

    static validateFactorExists(factor : TwoFactorAuthDocument) : void{

        if(!factor) throw new TwoFactorDataNotExistsError();
    }

    static validateFactorExistsByMethod(factor : TwoFactorAuthDocument) : void{

        if(!factor) throw new TwoFactorDataNotExistsByMethodError();
    }

    static validateNewFactorQuantity(factorQuantity : number) : void{

        if(factorQuantity > 0) throw new TwoFactorDataQuantityNewFactorError();
    }
}