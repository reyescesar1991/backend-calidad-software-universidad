import { inject, injectable } from "tsyringe";
import { IHeadquarterRepository } from "../interfaces/IHeadquarterRepository";
import { ClientSession, Model } from "mongoose";
import { HeadquartersDocument } from "../../../db/models";
import { ObjectIdParam, HeadquarterDto, UpdateHeadquarterDto } from "../../../validations";
import { FilterOptions, HeadquarterConfigFilterKeys } from "../../../core/types";

@injectable()
export class IHeadquarterRepositoryImpl implements IHeadquarterRepository {

    constructor(
        @inject("HeadquartersModel") private readonly HeadquarterModel: Model<HeadquartersDocument>,
    ) { }

    async findHeadquarterById(idHeadquarter: ObjectIdParam): Promise<HeadquartersDocument | null> {

        return await this.HeadquarterModel.findById(idHeadquarter).exec();
    }

    async findHeadquarterByCustomId(customIdHeadquarter: string): Promise<HeadquartersDocument | null> {

        return await this.HeadquarterModel.findOne({ idHeadquarter: customIdHeadquarter }).exec();
    }

    async searchHeadquarterByFilter(filter: FilterOptions<HeadquarterConfigFilterKeys>): Promise<HeadquartersDocument[] | null> {

        const query: any = {};

        Object.entries(filter).forEach(([key, value]) => {
            if (key === "geoLocation" && typeof value === "object") {
                // Convertir objeto geoLocation en claves anidadas
                Object.entries(value).forEach(([subKey, subValue]) => {
                    query[`geoLocation.${subKey}`] = subValue;
                });
            } else {
                query[key] = value;
            }
        });

        return this.HeadquarterModel.find(query).exec();
    }

    async searchHeadquarterByFilterWithOr(filter: FilterOptions<HeadquarterConfigFilterKeys>): Promise<HeadquartersDocument[] | null> {

        const orConditions = Object.entries(filter).map(([key, value]) => ({
            [key]: value
        }));

        // Si no hay condiciones, retornar array vacío
        if (orConditions.length === 0) return [];

        return await this.HeadquarterModel.find({
            $or: orConditions
        }).exec();
    }

    async listHeadquarter(): Promise<HeadquartersDocument[] | null> {
        
        return await this.HeadquarterModel.find({}).exec();
    }

    async activateHeadquarter(idHeadquarter: ObjectIdParam, session?: ClientSession): Promise<HeadquartersDocument | null> {

        return await this.HeadquarterModel.findByIdAndUpdate(

            idHeadquarter,
            { $set: { isActive: true } },
            { new: true, runValidators: true, session }
        ).exec();
    }

    async desactivateHeadquarter(idHeadquarter: ObjectIdParam, session?: ClientSession): Promise<HeadquartersDocument | null> {

        return await this.HeadquarterModel.findByIdAndUpdate(

            idHeadquarter,
            { $set: { isActive: false } },
            { new: true, runValidators: true, session }
        ).exec();
    }

    async createHeadquarter(dataHeadquarter: HeadquarterDto, session?: ClientSession): Promise<HeadquartersDocument | null> {

        const [headquarter] = await this.HeadquarterModel.create([dataHeadquarter], { session });
        return headquarter;

    }

    async updateHeadquarter(idHeadquarter: ObjectIdParam, dataUpdateHeadquarter: UpdateHeadquarterDto, session?: ClientSession): Promise<HeadquartersDocument | null> {

        return await this.HeadquarterModel.findByIdAndUpdate(

            idHeadquarter,
            dataUpdateHeadquarter,
            { new: true, runValidators: true, session }
        ).exec();
    }
}