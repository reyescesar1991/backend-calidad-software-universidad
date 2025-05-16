import { inject, injectable } from "tsyringe";
import { IHeadquarterRepository } from "../interfaces/IHeadquarterRepository";
import { ClientSession, Model } from "mongoose";
import { HeadquartersDocument } from "../../../db/models";
import { ObjectIdParam, HeadquarterDto, UpdateHeadquarterDto } from "../../../validations";
import { FilterOptions, HeadquarterConfigFilterKeys } from "../../../core/types";

@injectable()
export class IHeadquarterRepositoryImpl implements IHeadquarterRepository{

    constructor(
        @inject("HeadquarterModel") private readonly HeadquarterModel : Model<HeadquartersDocument>,
    ){}

    async findHeadquarterById(idHeadquarter: ObjectIdParam): Promise<HeadquartersDocument | null> {
        
        return await this.HeadquarterModel.findById(idHeadquarter).exec();
    }

    async findHeadquarterByCustomId(customIdHeadquarter: string): Promise<HeadquartersDocument | null> {
        
        return await this.HeadquarterModel.findOne({idHeadquarter : customIdHeadquarter}).exec();
    }

    async searchHeadquarterByFilter(filter: FilterOptions<HeadquarterConfigFilterKeys>): Promise<HeadquartersDocument[] | null> {
        
        return await this.HeadquarterModel.find(filter).exec();
    }

    async activateHeadquarter(idHeadquarter: ObjectIdParam, session?: ClientSession): Promise<HeadquartersDocument | null> {
       
        return await this.HeadquarterModel.findByIdAndUpdate(

            idHeadquarter,
            {$set : {isActive : true}},
            {new: true, runValidators: true, session}
        ).exec();
    }

    async desactivateHeadquarter(idHeadquarter: ObjectIdParam, session?: ClientSession): Promise<HeadquartersDocument | null> {
        
        return await this.HeadquarterModel.findByIdAndUpdate(

            idHeadquarter,
            {$set : {isActive : false}},
            {new: true, runValidators: true, session}
        ).exec();
    }

    async createHeadquarter(dataHeadquarter: HeadquarterDto, session?: ClientSession): Promise<HeadquartersDocument | null> {
        
        const [headquarter] =  await this.HeadquarterModel.create([dataHeadquarter], {session});
        return headquarter;

    }

    async updateHeadquarter(idHeadquarter: ObjectIdParam, dataUpdateHeadquarter: UpdateHeadquarterDto, session?: ClientSession): Promise<HeadquartersDocument | null> {
        
        return await this.HeadquarterModel.findByIdAndUpdate(

            idHeadquarter,
            dataUpdateHeadquarter,
            {new: true, runValidators: true, session}
        ).exec();
    }
}