import { injectable } from "tsyringe";
import { SecurityAuditDocument } from "../../../db/models";
import { RegistryAuditNotFoundError, RegistryAuditSecondFactorAttempsIsAlreadyMaxError, UnauthorizedException2FAError } from "../../exceptions";

@injectable()
export class SecurityAuditValidator {

    static validateStatusUser2FA(registryAudit : SecurityAuditDocument) : void{

        if(registryAudit.twoFactorVerifiedUntil < new Date()) throw new UnauthorizedException2FAError();
    }

    static validateSecurityAuditRegistryExists(registryAudit : SecurityAuditDocument) : void{

        if(!registryAudit) throw new RegistryAuditNotFoundError();
    }

    static validateSecurityAuditAttempsUserSecondFactor(registryAudit : SecurityAuditDocument) : void{

        if(registryAudit.secondFactorAttempts >= 3) throw new RegistryAuditSecondFactorAttempsIsAlreadyMaxError();
    }
}