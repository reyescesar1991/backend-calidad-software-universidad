import { inject, injectable } from "tsyringe";
import { ISessionManagementRepository } from "../interfaces/ISessionManagementRepository";
import { ClientSession, Model } from "mongoose";
import { SessionManagementDocument } from "../../../db/models";
import { SessionManagementDto, UpdateSessionManagementDto } from "../../../validations";
import { TokenService } from "../services/Token.service";

@injectable()
export class SessionManagementRepositoryImpl implements ISessionManagementRepository{

    constructor(@inject("SessionManagementModel") private readonly SessionManagementModel : Model<SessionManagementDocument>,
        @inject("JwtService") private readonly tokenService : TokenService
    ){}

    async getSessionUserValidate(customId: string): Promise<SessionManagementDocument | null> {
        
        return await this.SessionManagementModel.findOne(
            {userId : customId},
        ).exec();
    }

    async createSessionUser(sessionUser: SessionManagementDto, session?: ClientSession): Promise<SessionManagementDocument | null> {
        
        const [sessionUserData] = await this.SessionManagementModel.create([sessionUser], {session});

        return sessionUserData;
    }

    async updateSessionUser(customId: string, dataUpdateSession: UpdateSessionManagementDto, session?: ClientSession): Promise<SessionManagementDocument | null> {
        
        return await this.SessionManagementModel.findOneAndUpdate(

            {userId : customId},
            {$set : {token : dataUpdateSession.token, expiresAt : dataUpdateSession.expiresAt}},
            {new: true, runValidators: true, session}
        ).exec();
    }

    async deleteSessionUser(customId: string, session?: ClientSession): Promise<SessionManagementDocument | null> {
        return await this.SessionManagementModel.findOneAndDelete(

            {userId : customId},
            {session}
            
        ).exec();
    }

    
}