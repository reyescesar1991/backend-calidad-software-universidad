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
        console.log("DATA CREADA EWN EL REGISTRY", data);
        
        return data;
    }

    async updateRegistrySecurityAudit(userId : ObjectIdParam, dataUpdateAudit: UpdateSecurityAuditDto, session ?: ClientSession): Promise<SecurityAuditDocument | null> {
        
        return await this.SecurityAuditModel.findOneAndUpdate(
            {userId : userId},
            dataUpdateAudit,
            {new: true, runValidators: true, session}
        ).exec();
    }

    async getRegistrySecurityAuditByUser(idUser: ObjectIdParam): Promise<SecurityAuditDocument | null> {
        
        return await this.SecurityAuditModel.findOne({userId : idUser}).exec();
    }

    async addAttempLogin(userId: ObjectIdParam, session?: ClientSession): Promise<SecurityAuditDocument | null> {
        
        return await this.SecurityAuditModel.findOneAndUpdate(
            {userId : userId},
            { $inc: { loginAttempts: 1 } },
            {new: true, runValidators: true, session}
        ).exec();
    }
    async resetAttempLogin(userId: ObjectIdParam, session?: ClientSession): Promise<SecurityAuditDocument | null> {
        
        return await this.SecurityAuditModel.findOneAndUpdate(
            {userId : userId},
            { $set: { loginAttempts: 0 } },
            {new: true, runValidators: true, session}
        ).exec();
    }
    async addAttempSecondFactor(userId: ObjectIdParam, session?: ClientSession): Promise<SecurityAuditDocument | null> {
        
        const user = await this.SecurityAuditModel.findOneAndUpdate(
            {userId : userId},
            { $inc: { secondFactorAttempts: 1 } },
            {new: true, runValidators: true, session}
        ).exec();

        console.log("usuario recuperado para sumar",user);

        return user;
        
    }
    async resetAttempSecondFactor(userId: ObjectIdParam, session?: ClientSession): Promise<SecurityAuditDocument | null> {
        
        return await this.SecurityAuditModel.findOneAndUpdate(
            {userId : userId},
            { $set: { secondFactorAttempts: 0 } },
            {new: true, runValidators: true, session}
        ).exec();
    }

    async getUserAttempsLogin(userId: ObjectIdParam): Promise<number | null> {
        
        const result = await this.SecurityAuditModel.findById(
            { idUser: userId },
            { loginAttempts: 1, _id: 0 }  // Proyección: solo el campo status
        ).lean() //Mejora el rendimiento al evitar la hidratación completa del documento
        .exec();

        return result?.loginAttempts || null;
    }

    async getUserAttempsSecondFactor(userId: ObjectIdParam): Promise<number | null> {
        
        const result = await this.SecurityAuditModel.findById(
            { idUser: userId },
            { secondFactorAttempts: 1, _id: 0 }  // Proyección: solo el campo status
        ).lean() //Mejora el rendimiento al evitar la hidratación completa del documento
        .exec();

        return result?.secondFactorAttempts || null;
    }
}