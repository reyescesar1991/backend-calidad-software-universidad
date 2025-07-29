import { inject, injectable } from "tsyringe";
import { ILocationUserDataRepository } from "../interfaces/ILocationUserDataRepository";
import { ClientSession, Model } from "mongoose";
import { LocationUserDocument } from "../../../db/models";
import { LocationUserDataDto } from "../../../validations";

@injectable()
export class LocationUserDataRepositoryImpl implements ILocationUserDataRepository{

    constructor(
        @inject("LocationUserModel") private readonly LocationUserModel: Model<LocationUserDocument>
    ){}

    async createLocationUserData(dataLocationUser: LocationUserDataDto, session?: ClientSession): Promise<LocationUserDocument | null> {
        
        const [locationUser] = await this.LocationUserModel.create([dataLocationUser], { session });

        return locationUser;
    }

    async getLocationUserData(idUser: string): Promise<LocationUserDocument | null> {
        
        return await this.LocationUserModel.findOne({userId: idUser}).exec();
    }
}