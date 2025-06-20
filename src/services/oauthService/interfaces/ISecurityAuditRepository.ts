import { ClientSession } from "mongoose";
import { SecurityAuditDocument } from "../../../db/models";
import { ObjectIdParam, SecurityAuditDto, UpdateSecurityAuditDto } from "../../../validations";


export interface ISecurityAuditRepository{

    createRegistrySecurityAudit(dataAudit : SecurityAuditDto, session ?: ClientSession) : Promise<SecurityAuditDocument | null>;
    updateRegistrySecurityAudit(userId : ObjectIdParam, dataUpdateAudit : UpdateSecurityAuditDto, session ?: ClientSession) : Promise<SecurityAuditDocument | null>;
    getRegistrySecurityAuditByUser(idUser : ObjectIdParam) : Promise<SecurityAuditDocument | null>;
    addAttempLogin(userId : ObjectIdParam, session ?: ClientSession) : Promise<SecurityAuditDocument | null>;
    resetAttempLogin(userId : ObjectIdParam, session ?: ClientSession) : Promise<SecurityAuditDocument | null>;
    addAttempSecondFactor(userId : ObjectIdParam, session ?: ClientSession) : Promise<SecurityAuditDocument | null>;
    resetAttempSecondFactor(userId : ObjectIdParam, session ?: ClientSession) : Promise<SecurityAuditDocument | null>;

    getUserAttempsLogin(userId : ObjectIdParam): Promise<number | null>;
    getUserAttempsSecondFactor(userId : ObjectIdParam): Promise<number | null>;
}