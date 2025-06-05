import { inject, injectable } from "tsyringe";
import { ITwoFactorDataRepository } from "../../../services/oauthService";
import { TwoFactorAuthDocument } from "../../../db/models";
import { TwoFactorDataAlreadyDisableError, TwoFactorDataAlreadyEnableError, TwoFactorDataAlreadyExistsByMethodError, TwoFactorDataNotExistsError, TwoFactorDataNotFoundByMethodError, TwoFactorDataNotFoundInDatabaseError, TwoFactorDataQuantityNewFactorError } from "../../exceptions";

@injectable()
export class TwoFactorDataValidator {

    constructor(@inject("ITwoFactorDataRepository") private readonly twoFactorDataRepository: ITwoFactorDataRepository) { }

    static validateTwoFactorDataBase(twoFactorDataBase: TwoFactorAuthDocument[]): void {

        if (twoFactorDataBase.length < 1) throw new TwoFactorDataNotFoundInDatabaseError();
    }

    static validateFactorExists(factor: TwoFactorAuthDocument): void {

        if (!factor) throw new TwoFactorDataNotExistsError();
    }

    static validateNewFactorQuantity(factorQuantity: number): void {

        if (factorQuantity > 0) throw new TwoFactorDataQuantityNewFactorError();
    }

    static validateFactorExistsByMethod(factor : TwoFactorAuthDocument) : void {

        if(!factor) throw new TwoFactorDataNotFoundByMethodError();
    }

    static validateFactorAlreadyEnable(factor : TwoFactorAuthDocument) : void {

        if(factor.isEnabled) throw new TwoFactorDataAlreadyEnableError();
    }

    static validateFactorAlreadyDisable(factor : TwoFactorAuthDocument) : void {

        if(!factor.isEnabled) throw new TwoFactorDataAlreadyDisableError();
    }

    async validateFactorUniquenessByMethod(method: string): Promise<void> {
        
        const factorExists = await this.twoFactorDataRepository.findFactorByMethod(method);

        if (factorExists) throw new TwoFactorDataAlreadyExistsByMethodError();
    }

}