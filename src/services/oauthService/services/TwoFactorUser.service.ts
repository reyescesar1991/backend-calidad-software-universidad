import { inject, injectable } from "tsyringe";
import { TransactionManager } from "../../../core/database/transactionManager";
import { ITwoFactorUserRepository } from "../../userService";

@injectable()
export class TwoFactorUserService{

    constructor(
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("ITwoFactorUserRepository") private readonly twoFactorUserActiveRepository: ITwoFactorUserRepository,
    ){}

    
}