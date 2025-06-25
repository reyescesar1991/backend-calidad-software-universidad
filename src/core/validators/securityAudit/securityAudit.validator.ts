import { injectable } from "tsyringe";
import { SecurityAuditDocument } from "../../../db/models";
import { RegistryAuditNotFoundError, RegistryAuditSecondFactorAttempsIsAlreadyMaxError } from "../../exceptions";

@injectable()
export class SecurityAuditValidator {

    static validateSecurityAuditRegistryExists(registryAudit : SecurityAuditDocument) : void{

        if(!registryAudit) throw new RegistryAuditNotFoundError();
    }

    static validateSecurityAuditAttempsUserSecondFactor(registryAudit : SecurityAuditDocument) : void{

        if(registryAudit.secondFactorAttempts >= 3) throw new RegistryAuditSecondFactorAttempsIsAlreadyMaxError();
    }
}