import { inject, injectable } from "tsyringe";
import { ISecurityAuditRepository } from "../interfaces/ISecurityAuditRepository";
import { SecurityAuditDocument } from "../../../db/models";
import { SecurityAuditDto, UpdateSecurityAuditDto, ObjectIdParam } from "../../../validations";
import { ClientSession, Model } from "mongoose";


@injectable()
export class SecurityAuditRepositoryImpl implements ISecurityAuditRepository{


    constructor(@inject("SecurityAuditModel") private readonly SecurityAuditModel : Model<SecurityAuditDocument>){}

    async createRegistrySecurityAudit(dataAudit: SecurityAuditDto, session ?: ClientSession): Promise<SecurityAuditDocument | null> {
        
        const [data] = await this.SecurityAuditModel.create([dataAudit], {session});
        return data;
    }

    async updateRegistrySecurityAudit(userId : ObjectIdParam, dataUpdateAudit: UpdateSecurityAuditDto, session ?: ClientSession): Promise<SecurityAuditDocument | null> {
        
        return await this.SecurityAuditModel.findByIdAndUpdate(
            userId,
            dataUpdateAudit,
            {new: true, runValidators: true, session}
        ).exec();
    }

    async getRegistrySecurityAuditByUser(idUser: ObjectIdParam): Promise<SecurityAuditDocument | null> {
        
        return await this.SecurityAuditModel.findById(idUser).exec();
    }

    async addAttempLogin(userId: ObjectIdParam, session?: ClientSession): Promise<SecurityAuditDocument | null> {
        throw new Error("Method not implemented.");
    }
    async resetAttempLogin(userId: ObjectIdParam, session?: ClientSession): Promise<SecurityAuditDocument | null> {
        throw new Error("Method not implemented.");
    }
    async addAttempSecondFactor(userId: ObjectIdParam, session?: ClientSession): Promise<SecurityAuditDocument | null> {
        throw new Error("Method not implemented.");
    }
    async resetAttempSecondFactor(userId: ObjectIdParam, session?: ClientSession): Promise<SecurityAuditDocument | null> {
        throw new Error("Method not implemented.");
    }
    
}