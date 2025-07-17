"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
const tsyringe_1 = require("tsyringe");
const dependencies_1 = require("../../core/config/dependenciesUsers/dependencies");
const validations_1 = require("../../validations");
const dependencies_2 = require("../../core/config/dependenciesSecurityAudit/dependencies");
const oauthService_1 = require("../../services/oauthService");
const dependencies_3 = require("../../core/config/dependenciesRoleConfig/dependencies");
const dependencies_4 = require("../../core/config/dependenciesRoles/dependencies");
const dependencies_5 = require("../../core/config/dependenciesDepartments/dependencies");
const dependencies_6 = require("../../core/config/dependenciesTwoFactorUser/dependencies");
(0, connectDb_1.initializeTestEnvironment)();
const runTestRegistrySecurityAudit = async () => {
    try {
        await (0, dependencies_1.configureUserDependencies)();
        await (0, dependencies_2.configureSecurityAuditDependencies)();
        await (0, dependencies_3.configureDependenciesRoleConfig)();
        await (0, dependencies_4.configureDependenciesRoles)();
        await (0, dependencies_5.configureDependenciesDepartments)();
        await (0, dependencies_6.configureDependenciesTwoFactorUser)();
        const securityAuditService = tsyringe_1.container.resolve(oauthService_1.SecurityAuditService);
        const dataSecurityAudit = {
            userId: validations_1.objectIdSchema.parse("6837729bc8dd4394aae758a9"),
            loginAttempts: 0,
            secondFactorAttempts: 0,
            lastFailedLogin: new Date(Date.now()),
        };
        const result = await securityAuditService.createRegistrySecurityAudit(dataSecurityAudit);
        console.log("📄 Registro de auditoria creado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestRegistrySecurityAudit().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testRegistrySecurityAudit.js.map