"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSecurityAuditDependencies = void 0;
const tsyringe_1 = require("tsyringe");
const models_1 = require("../../../db/models");
const oauthService_1 = require("../../../services/oauthService");
const securityAuditRepository_1 = require("../../../services/oauthService/repositories/securityAuditRepository");
const validators_1 = require("../../validators");
const configureSecurityAuditDependencies = async () => {
    tsyringe_1.container.register("SecurityAuditModel", { useValue: models_1.SecurityAuditModel });
    tsyringe_1.container.register("SecurityAuditValidator", { useClass: validators_1.SecurityAuditValidator });
    tsyringe_1.container.register("ISecurityAuditRepository", { useClass: securityAuditRepository_1.SecurityAuditRepositoryImpl });
    tsyringe_1.container.register("SecurityAuditService", { useClass: oauthService_1.SecurityAuditService });
};
exports.configureSecurityAuditDependencies = configureSecurityAuditDependencies;
//# sourceMappingURL=dependencies.js.map