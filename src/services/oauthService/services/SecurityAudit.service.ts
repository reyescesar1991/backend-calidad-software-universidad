import { inject, injectable } from "tsyringe";
import { ISecurityAuditRepository } from "../interfaces/ISecurityAuditRepository";

@injectable()
export class SecurityAuditService{

    constructor(
        @inject("ISecurityAuditRepository") private readonly securityAuditRepository : ISecurityAuditRepository
    ){}

    
}   