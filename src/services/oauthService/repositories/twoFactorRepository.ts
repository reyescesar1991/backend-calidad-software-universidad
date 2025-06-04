import { ClientSession, Model } from "mongoose";
import { TwoFactorAuthDocument } from "../../../db/models";
import { ObjectIdParam, TwoFactorAuthDto, UpdateTwoFactorAuthDto } from "../../../validations";
import { ITwoFactorDataRepository } from "../interfaces/ITwoFactorDataRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class TwoFactorDataRepositoryImpl implements ITwoFactorDataRepository{


    constructor(@inject("TwoFactorAuthModel") private readonly TwoFactorModel : Model<TwoFactorAuthDocument>){}

    async getFactorsAvailable(): Promise<TwoFactorAuthDocument[] | null> {
        
        return await this.TwoFactorModel.find({}).exec();
    }
    async findFactorById(factorId: ObjectIdParam): Promise<TwoFactorAuthDocument | null> {
        
        return await this.TwoFactorModel.findById(factorId).exec();
    }
    async findFactorByMethod(methodFactor: string): Promise<TwoFactorAuthDocument | null> {
        
        return await this.TwoFactorModel.findOne({method : methodFactor}).exec();
    }
    async addFactor(dataFactor: TwoFactorAuthDto, session?: ClientSession): Promise<TwoFactorAuthDocument | null> {
        
        const [factor] = await this.TwoFactorModel.create([dataFactor], {session});
        return factor;
    }
    async updateFactor(factorId: ObjectIdParam, dataFactor: UpdateTwoFactorAuthDto, session?: ClientSession): Promise<TwoFactorAuthDocument | null> {
        
        return await this.TwoFactorModel.findByIdAndUpdate(

            factorId,
            dataFactor,
            {new: true, runValidators: true, session}
        ).exec();
    }
    async enableFactor(factorId: ObjectIdParam, session?: ClientSession): Promise<TwoFactorAuthDocument | null> {
        
        return await this.TwoFactorModel.findByIdAndUpdate(

            factorId,
            {$set : {isEnabled : true}},
            {new: true, runValidators: true, session}
        ).exec();
    }
    async disableFactor(factorId: ObjectIdParam, session?: ClientSession): Promise<TwoFactorAuthDocument | null> {
        
        return await this.TwoFactorModel.findByIdAndUpdate(
            factorId,
            {$set : {isEnabled : false}},
            {new: true, runValidators: true, session}
        ).exec();
    }
    async addUserQuantity(factorId: ObjectIdParam, session?: ClientSession): Promise<TwoFactorAuthDocument | null> {
        
        return await this.TwoFactorModel.findByIdAndUpdate(
            factorId,
            { $inc: { quantityUsers: 1 } },
            {new: true, runValidators: true, session}
        ).exec();
    }

    
}