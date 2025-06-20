import { inject, injectable } from "tsyringe";
import { ITwoFactorDataRepository } from "../interfaces/ITwoFactorDataRepository";
import { handleError } from "../../../core/exceptions";
import { TwoFactorAuthDocument } from "../../../db/models";
import { TwoFactorDataValidator } from "../../../core/validators";
import { ObjectIdParam, TwoFactorAuthDto, UpdateTwoFactorAuthDto } from "../../../validations";
import { TransactionManager } from "../../../core/database/transactionManager";
import { ClientSession } from "mongoose";
import { Transactional } from "../../../core/utils/transaccional-wrapper";

@injectable()
export class TwoFactorService {

    constructor(
        @inject("ITwoFactorDataRepository") private readonly twoFactorDataRepository: ITwoFactorDataRepository,
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("TwoFactorDataValidator") private readonly twoFactorDataValidator: TwoFactorDataValidator,
    ) { }

    async getFactorsAvailable(): Promise<TwoFactorAuthDocument[] | null> {

        try {

            const twoFactorData = await this.twoFactorDataRepository.getFactorsAvailable();

            TwoFactorDataValidator.validateTwoFactorDataBase(twoFactorData);

            return twoFactorData;

        } catch (error) {

            handleError(error);
        }
    }

    async findFactorById(factorId: ObjectIdParam): Promise<TwoFactorAuthDocument | null> {

        try {

            const factor = await this.twoFactorDataRepository.findFactorById(factorId);

            TwoFactorDataValidator.validateFactorExists(factor);

            return factor;

        } catch (error) {

            handleError(error);
        }
    }

    async findFactorByMethod(methodFactor: string): Promise<TwoFactorAuthDocument | null> {

        try {

            const factor = await this.twoFactorDataRepository.findFactorByMethod(methodFactor);

            TwoFactorDataValidator.validateFactorExistsByMethod(factor);

            return factor;

        } catch (error) {

            handleError(error);
        }
    }

    @Transactional()
    async addFactor(dataFactor: TwoFactorAuthDto, sessionParam?: ClientSession): Promise<TwoFactorAuthDocument | null> {

        try {

            console.log(dataFactor);

            await this.twoFactorDataValidator.validateFactorUniquenessByMethod(dataFactor.method);

            TwoFactorDataValidator.validateNewFactorQuantity(dataFactor.quantityUsers);

            return await this.twoFactorDataRepository.addFactor(dataFactor, sessionParam);

        } catch (error) {

            handleError(error);
        }
    }

    async updateFactor(factorId: ObjectIdParam, dataFactor: UpdateTwoFactorAuthDto): Promise<TwoFactorAuthDocument | null> {

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const factor = await this.twoFactorDataRepository.findFactorById(factorId);

                    TwoFactorDataValidator.validateFactorExists(factor);

                    await this.twoFactorDataValidator.validateFactorUniquenessByMethod(dataFactor.method);

                    return await this.twoFactorDataRepository.updateFactor(factorId, dataFactor, session);

                } catch (error) {

                    handleError(error);
                }
            }
        )
    }

    async enableFactor(factorId: ObjectIdParam): Promise<TwoFactorAuthDocument | null> {

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const factor = await this.twoFactorDataRepository.findFactorById(factorId);

                    TwoFactorDataValidator.validateFactorExists(factor);

                    TwoFactorDataValidator.validateFactorAlreadyEnable(factor);

                    return await this.twoFactorDataRepository.enableFactor(factorId, session);

                } catch (error) {

                    handleError(error);
                }
            }
        )
    }

    async disableFactor(factorId: ObjectIdParam): Promise<TwoFactorAuthDocument | null> {

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const factor = await this.twoFactorDataRepository.findFactorById(factorId);

                    TwoFactorDataValidator.validateFactorExists(factor);

                    TwoFactorDataValidator.validateFactorAlreadyDisable(factor);

                    return await this.twoFactorDataRepository.disableFactor(factorId, session);

                } catch (error) {

                    handleError(error);
                }
            }
        )
    }

    async addUserQuantity(factorId: ObjectIdParam): Promise<TwoFactorAuthDocument | null> {

        console.log(factorId);


        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const factor = await this.twoFactorDataRepository.findFactorById(factorId);

                    TwoFactorDataValidator.validateFactorExists(factor);

                    return await this.twoFactorDataRepository.addUserQuantity(factorId, session);

                } catch (error) {

                    handleError(error);
                }
            }
        )
    }
}