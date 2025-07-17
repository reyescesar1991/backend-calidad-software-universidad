"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const connectDb_1 = require("../../../core/utils/connectDb");
const dependencies_1 = require("../../../core/config/dependenciesUsers/dependencies");
const dependencies_2 = require("../../../core/config/dependenciesSecurityAudit/dependencies");
const dependencies_3 = require("../../../core/config/dependenciesRoleConfig/dependencies");
const dependencies_4 = require("../../../core/config/dependenciesRoles/dependencies");
const dependencies_5 = require("../../../core/config/dependenciesDepartments/dependencies");
const dependencies_6 = require("../../../core/config/dependenciesTwoFactorUser/dependencies");
const dependencies_7 = require("../../../core/config/dependenciesJwt/dependencies");
const OAuth_service_1 = require("../../../services/oauthService/OAuth.service");
const dependencies_8 = require("../../../core/config/dependenciesOAuth/dependencies");
const dependencies_9 = require("../../../core/config/dependenciesTwoFactorValue/dependencies");
const dependencies_10 = require("../../../core/config/dependenciesSessionManagement/dependencies");
(0, connectDb_1.initializeTestEnvironment)();
const runTestLoginUser = async () => {
    try {
        await (0, dependencies_1.configureUserDependencies)();
        await (0, dependencies_2.configureSecurityAuditDependencies)();
        await (0, dependencies_3.configureDependenciesRoleConfig)();
        await (0, dependencies_4.configureDependenciesRoles)();
        await (0, dependencies_5.configureDependenciesDepartments)();
        await (0, dependencies_6.configureDependenciesTwoFactorUser)();
        await (0, dependencies_7.configureJwtDependencies)();
        await (0, dependencies_8.configureOAuthDependencies)();
        await (0, dependencies_6.configureDependenciesTwoFactorUser)();
        await (0, dependencies_9.configureDependenciesTwoFactorValueUser)();
        await (0, dependencies_10.configureSessionManagementDependencies)();
        const oauthService = tsyringe_1.container.resolve(OAuth_service_1.OAuthService);
        const idUser = "testUser";
        const password = "Hola123%34";
        const result = await oauthService.loginUser({ username: idUser, password: password });
        console.log("📄 Login realizado con exito: ", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestLoginUser().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=TestLoginUser.js.map