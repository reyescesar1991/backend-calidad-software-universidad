"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
const dependencies_1 = require("../../core/config/dependenciesTwoFactorUser/dependencies");
const tsyringe_1 = require("tsyringe");
const dependencies_2 = require("../../core/config/dependenciesUsers/dependencies");
const TwoFactorUser_service_1 = require("../../services/oauthService/services/TwoFactorUser.service");
const validations_1 = require("../../validations");
const dependencies_3 = require("../../core/config/dependenciesTwoFactorValue/dependencies");
const dependencies_4 = require("../../core/config/dependenciesRoles/dependencies");
const dependencies_5 = require("../../core/config/dependenciesRoleConfig/dependencies");
const dependencies_6 = require("../../core/config/dependenciesDepartments/dependencies");
const dependencies_7 = require("../../core/config/dependenciesSecurityAudit/dependencies");
(0, connectDb_1.initializeTestEnvironment)();
const runTestCompareFactor = async () => {
    try {
        await (0, dependencies_2.configureUserDependencies)();
        await (0, dependencies_1.configureDependenciesTwoFactorUser)();
        await (0, dependencies_3.configureDependenciesTwoFactorValueUser)();
        await (0, dependencies_4.configureDependenciesRoles)();
        await (0, dependencies_5.configureDependenciesRoleConfig)();
        await (0, dependencies_6.configureDependenciesDepartments)();
        await (0, dependencies_1.configureDependenciesTwoFactorUser)();
        await (0, dependencies_7.configureSecurityAuditDependencies)();
        const twoFactorValueService = tsyringe_1.container.resolve(TwoFactorUser_service_1.TwoFactorUserService);
        const userId = validations_1.objectIdSchema.parse("6837729bc8dd4394aae758a9");
        const result = await twoFactorValueService.validateFactorUser(userId, "536135");
        console.log(`📄 El código ${result ? 'si' : 'no'} coincide con el enviado`);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestCompareFactor().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=twoFactorCompareValue.js.map