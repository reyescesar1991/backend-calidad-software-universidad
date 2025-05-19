import { inject, injectable } from "tsyringe";
import { IHeadquarterRepository } from "../../../services/locationService";
import { ObjectIdParam } from "../../../validations";
import { HeadquartersDocument } from "../../../db/models";
import { FilterHeadquarterError, HeadquarterAlreadyExistsError, HeadquarterIsAlreadyActiveError, HeadquarterIsAlreadyDesactiveError, HeadquarterKeysAlreadyExistError, HeadquarterNotExistsError, HeadquartersByFilterNotFoudError } from "../../exceptions";
import { FilterOptions, HeadquarterConfigFilterKeys } from "../../types";
import { HeadquarterFilterSchema } from "../../../validations/sharedValidators/headquarterFilterValidator";

@injectable()
export class HeadquarterValidator {

    constructor(
        @inject("IHeadquarterRepository") private readonly headquarterRepository: IHeadquarterRepository,
    ) { }

    static validateFilterOptionsHeadquarter(filter: FilterOptions<HeadquarterConfigFilterKeys>): void {

        const resultSchema = HeadquarterFilterSchema.safeParse(filter);

        if (!resultSchema.success) {

            const errors = resultSchema.error.errors.map(e => `${e.path[0]}: ${e.message}`);
            console.log(errors);
            throw new FilterHeadquarterError(`Filtro inválido:\n- ${errors.join('\n- ')}`);
        }
    }


    async validateHeadquarterExists(idHeadquarter: ObjectIdParam): Promise<HeadquartersDocument | null> {

        const headquarter = await this.headquarterRepository.findHeadquarterById(idHeadquarter);

        if (!headquarter) throw new HeadquarterNotExistsError();

        return headquarter;
    }

    async validateHeadquarterUniqueness(idHeadquarter: string): Promise<void> {

        const headquarter = await this.headquarterRepository.findHeadquarterByCustomId(idHeadquarter);

        if (headquarter) throw new HeadquarterAlreadyExistsError();

    }

    async validateHeadquarterExistsWithCustomId(idHeadquarter: string): Promise<HeadquartersDocument | null> {

        const headquarter = await this.headquarterRepository.findHeadquarterByCustomId(idHeadquarter);

        if (!headquarter) throw new HeadquarterNotExistsError();

        return headquarter;
    }

    async validateHeadquarterIsAlreadyActive(idHeadquarter: ObjectIdParam): Promise<boolean | null> {

        const headquarter = await this.headquarterRepository.findHeadquarterById(idHeadquarter);

        if (!headquarter.isActive) return headquarter.isActive;

        throw new HeadquarterIsAlreadyActiveError();
    }

    async validateHeadquarterIsAlreadyDesactive(idHeadquarter: ObjectIdParam): Promise<boolean | null> {

        const headquarter = await this.headquarterRepository.findHeadquarterById(idHeadquarter);

        if (headquarter.isActive) return headquarter.isActive;

        throw new HeadquarterIsAlreadyDesactiveError();
    }

    async validateHeadquartersByFilter(filter : FilterOptions<HeadquarterConfigFilterKeys>): Promise<HeadquartersDocument[] | null> {

        const headquarters = await this.headquarterRepository.searchHeadquarterByFilter(filter);

        if (headquarters.length < 1) throw new HeadquartersByFilterNotFoudError();

        return headquarters;
    }

    async validateHeadquarterUniqueKeys(filter : FilterOptions<HeadquarterConfigFilterKeys>): Promise<void> {

        const headquarter = await this.headquarterRepository.searchHeadquarterByFilterWithOr(filter);

        console.log(headquarter);
        
        if (headquarter.length >= 1) throw new HeadquarterKeysAlreadyExistError();

    }
}