import { inject, injectable } from "tsyringe";
import { IHeadquarterRepository } from "./interfaces/IHeadquarterRepository";
import { HeadquarterValidator } from "../../core/validators";
import { HeadquarterDto, ObjectIdParam } from "../../validations";
import { HeadquartersDocument } from "../../db/models";
import { handleError } from "../../core/exceptions";
import { TransactionManager } from "../../core/database/transactionManager";
import { FilterOptions, HeadquarterConfigFilterKeys } from "../../core/types";

@injectable()
export class LocationService {

    constructor(
        @inject("IHeadquarterRepository") private readonly headquarterRepository : IHeadquarterRepository,
        @inject("HeadquarterValidator") private readonly headquarterValidator : HeadquarterValidator,
        @inject("TransactionManager") private readonly transactionManager : TransactionManager,

    ){}

    async findHeadquarterById(idHeadquarter : ObjectIdParam) : Promise<HeadquartersDocument | null>{

        try {

            const headquarter = await this.headquarterValidator.validateHeadquarterExists(idHeadquarter);

            return headquarter;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findHeadquarterByCustomId(customIdHeadquarter : string) : Promise<HeadquartersDocument | null>{

        try {

            const headquarter = await this.headquarterValidator.validateHeadquarterExistsWithCustomId(customIdHeadquarter);

            return headquarter;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async searchHeadquarterByFilter(filter: FilterOptions<HeadquarterConfigFilterKeys>): Promise<HeadquartersDocument[] | null>{

        try {

            HeadquarterValidator.validateFilterOptionsHeadquarter(filter);

            const headquarters = await this.headquarterValidator.validateHeadquartersByFilter(filter);

            return headquarters;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async activateHeadquarter(idHeadquarter : ObjectIdParam) : Promise<HeadquartersDocument | null>{

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    await this.headquarterValidator.validateHeadquarterExists(idHeadquarter);

                    await this.headquarterValidator.validateHeadquarterIsAlreadyActive(idHeadquarter);

                    return await this.headquarterRepository.activateHeadquarter(idHeadquarter, session);
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }

    async desactivateHeadquarter(idHeadquarter : ObjectIdParam) : Promise<HeadquartersDocument | null>{

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    await this.headquarterValidator.validateHeadquarterExists(idHeadquarter);

                    await this.headquarterValidator.validateHeadquarterIsAlreadyDesactive(idHeadquarter);

                    return await this.headquarterRepository.desactivateHeadquarter(idHeadquarter, session);
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }

    async createHeadquarter(dataHeadquarter : HeadquarterDto) : Promise<HeadquartersDocument | null>{

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    await this.headquarterValidator.validateHeadquarterUniqueness(dataHeadquarter.idHeadquarter);

                    await this.headquarterValidator.validateHeadquarterUniqueKeys(
                        {
                            label : dataHeadquarter.label,
                            phoneNumber : dataHeadquarter.phoneNumber,
                            email : dataHeadquarter.email,
                        }
                    )

                    return await this.headquarterRepository.createHeadquarter(dataHeadquarter, session);
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }
}