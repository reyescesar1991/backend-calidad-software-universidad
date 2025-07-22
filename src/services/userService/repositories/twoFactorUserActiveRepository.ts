import { inject, injectable } from "tsyringe";
import { UsersTwoFactorActiveDocument } from "../../../db/models";
import { ObjectIdParam, UserTwoFactorActiveDto } from "../../../validations";
import { ITwoFactorUserRepository } from "../interfaces/ITwoFactorActiveUser";
import { ClientSession, Model } from "mongoose";

@injectable()
export class TwoFactorUserActiveRepositoryImpl implements ITwoFactorUserRepository {

    constructor(@inject("UserTwoFactorModel") private readonly UserTwoFactorModel: Model<UsersTwoFactorActiveDocument>) { }

    async listTwoFactorUsers(): Promise<UsersTwoFactorActiveDocument[] | null> {
        
        return await this.UserTwoFactorModel.find({}).exec();
    }

    async getTwoFactorUser(userIdParam: ObjectIdParam): Promise<UsersTwoFactorActiveDocument | null> {

        return await this.UserTwoFactorModel.findOne({ userId: userIdParam }).exec();
    }

    async getTwoFactorUserActive(userIdParam: ObjectIdParam): Promise<boolean | null> {

        console.log("USER ID EN EL REPO: " , userIdParam);
        
        const twoFactorUserStatus = await this.UserTwoFactorModel.findOne({ userId: userIdParam }).exec();

        console.log("TWO FACTOR STATUS: ", twoFactorUserStatus);

        return twoFactorUserStatus.isActive;
    }

    async addTwoFactorUser(dataFactorUserParam: UserTwoFactorActiveDto, session?: ClientSession): Promise<UsersTwoFactorActiveDocument | null> {

        const [dataFactorUser] = await this.UserTwoFactorModel.create([dataFactorUserParam], { session });

        return dataFactorUser;
    }
    async activateTwoFactorUser(userIdParam: ObjectIdParam, session?: ClientSession): Promise<UsersTwoFactorActiveDocument | null> {

        return await this.UserTwoFactorModel.findOneAndUpdate(
            { userId: userIdParam },
            { $set: { isActive: true } },
            { new: true, runValidators: true, session }
        ).exec();
    }
    async inactivateTwoFactorUser(userIdParam: ObjectIdParam, session?: ClientSession): Promise<UsersTwoFactorActiveDocument | null> {

        return await this.UserTwoFactorModel.findOneAndUpdate(
            { userId: userIdParam },
            { $set: { isActive: false } },
            { new: true, runValidators: true, session }
        ).exec();
    }


}