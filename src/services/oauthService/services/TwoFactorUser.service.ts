import { inject, injectable } from "tsyringe";
import { TransactionManager } from "../../../core/database/transactionManager";
import { ITwoFactorUserRepository } from "../../userService";
import { ITwoFactorValueRepository } from "../interfaces/ITwoFactorValueRepository";
import { UserTwoFactorValueUserDto } from "../../../validations";
import { TwoFactorValueUserDocument } from "../../../db/models";
import { handleError } from "../../../core/exceptions";
import { UserValidator } from "../../../core/validators";

@injectable()
export class TwoFactorUserService{

    constructor(
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("ITwoFactorUserRepository") private readonly twoFactorUserActiveRepository: ITwoFactorUserRepository,
        @inject("ITwoFactorValueRepository") private readonly twoFactorValueRepository: ITwoFactorValueRepository,
    ){}

    async createTwoFactorValueUser(dataFactor: UserTwoFactorValueUserDto): Promise<TwoFactorValueUserDocument | null>{

        return await this.transactionManager.executeTransaction(

            async () => {

                try {

                    //1. Verificar que el usuario tenga un registro en tabla intermedia de factor-user y que este activo
                    const userFactorActive = await this.twoFactorUserActiveRepository.getTwoFactorUser(dataFactor.userId);

                    UserValidator.validateTwoFactorUserIsAlreadyActive(userFactorActive.isActive);

                    //2. 
                    return null

                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }
}