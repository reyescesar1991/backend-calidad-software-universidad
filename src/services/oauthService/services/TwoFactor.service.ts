import { inject, injectable } from "tsyringe";
import { ITwoFactorDataRepository } from "../interfaces/ITwoFactorDataRepository";
import { handleError } from "../../../core/exceptions";
import { TwoFactorAuthDocument } from "../../../db/models";
import { TwoFactorDataValidator } from "../../../core/validators";
import { ObjectIdParam, TwoFactorAuthDto } from "../../../validations";
import { TransactionManager } from "../../../core/database/transactionManager";

@injectable()
export class TwoFactorService{

    constructor(
        @inject("ITwoFactorDataRepository") private readonly twoFactorDataRepository : ITwoFactorDataRepository,
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
    ){}

    async getFactorsAvailable(): Promise<TwoFactorAuthDocument[] | null>{

        try {

            const twoFactorData = await this.twoFactorDataRepository.getFactorsAvailable();

            TwoFactorDataValidator.validateTwoFactorDataBase(twoFactorData);

            return twoFactorData;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findFactorById(factorId: ObjectIdParam): Promise<TwoFactorAuthDocument | null>{

        try {

            const factor = await this.twoFactorDataRepository.findFactorById(factorId);

            TwoFactorDataValidator.validateFactorExists(factor);

            return factor;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findFactorByMethod(methodFactor: string): Promise<TwoFactorAuthDocument | null>{

        try {

            const factor = await this.twoFactorDataRepository.findFactorByMethod(methodFactor);

            TwoFactorDataValidator.validateFactorExistsByMethod(factor);

            return factor;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async addFactor(dataFactor: TwoFactorAuthDto): Promise<TwoFactorAuthDocument | null>{

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const factor = await this.twoFactorDataRepository.findFactorByMethod(dataFactor.method);

                    TwoFactorDataValidator.validateFactorExistsByMethod(factor);

                    TwoFactorDataValidator.validateNewFactorQuantity(dataFactor.quantityUsers);

                    return factor;

                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }
}