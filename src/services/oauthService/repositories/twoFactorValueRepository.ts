import { inject, injectable } from "tsyringe";
import { ITwoFactorValueRepository } from "../interfaces/ITwoFactorValueRepository";
import { ClientSession, Model } from "mongoose";
import { TwoFactorValueUserDocument } from "../../../db/models";
import { UserTwoFactorValueUserDto } from "../../../validations";

@injectable()
export class TwoFactorValueRepositoryImpl implements ITwoFactorValueRepository{

    constructor(@inject("TwoFactorUserValueModel") private readonly TwoFactorUserValueModel : Model<TwoFactorValueUserDocument>){}

    async findTwoFactorValueUserByCustomUserId(customIdUser: string): Promise<TwoFactorValueUserDocument | null> {
        
        return await this.TwoFactorUserValueModel.findOne(
            {userId : customIdUser},
        ).exec();
    }
    async createTwoFactorValueUser(dataFactor: UserTwoFactorValueUserDto, session ?: ClientSession): Promise<TwoFactorValueUserDocument | null> {
        
        const [twoFactorValue] = await this.TwoFactorUserValueModel.create([dataFactor], {session});
        return twoFactorValue;
    }
    async deleteTwoFactorValueUser(customIdUser: string, session ?: ClientSession): Promise<TwoFactorValueUserDocument | null> {
        
        return await this.TwoFactorUserValueModel.findOneAndDelete(
            {userId : customIdUser},
            {session},
        ).exec();
    }
}