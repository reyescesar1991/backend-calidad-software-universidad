import { container } from "tsyringe";
import { SecurityAuditModel } from "../../../db/models";
import { ISecurityAuditRepository, SecurityAuditService } from "../../../services/oauthService";
import { SecurityAuditRepositoryImpl } from "../../../services/oauthService/repositories/securityAuditRepository";
import { SecurityAuditValidator } from "../../validators";


export const configureSecurityAuditDependencies = async () => {

        container.register("SecurityAuditModel", { useValue: SecurityAuditModel });
    
        container.register("SecurityAuditValidator" , {useClass: SecurityAuditValidator});
    
        container.register<ISecurityAuditRepository>("ISecurityAuditRepository", { useClass: SecurityAuditRepositoryImpl });

        container.register("SecurityAuditService", {useClass : SecurityAuditService});
}