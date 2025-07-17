"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const dependencies_1 = require("../../core/config/dependenciesUsers/dependencies");
const connectDb_1 = require("../../core/utils/connectDb");
const dependencies_2 = require("../../core/config/dependenciesSessionManagement/dependencies");
const oauthService_1 = require("../../services/oauthService");
const dependencies_3 = require("../../core/config/dependenciesJwt/dependencies");
const dependencies_4 = require("../../core/config/dependenciesRoleConfig/dependencies");
const dependencies_5 = require("../../core/config/dependenciesRoles/dependencies");
const dependencies_6 = require("../../core/config/dependenciesDepartments/dependencies");
const dependencies_7 = require("../../core/config/dependenciesTwoFactorUser/dependencies");
const uuid_1 = require("uuid");
(0, connectDb_1.initializeTestEnvironment)();
const runTestCreateSessionUser = async () => {
    try {
        await (0, dependencies_5.configureDependenciesRoles)();
        await (0, dependencies_4.configureDependenciesRoleConfig)();
        await (0, dependencies_1.configureUserDependencies)();
        await (0, dependencies_2.configureSessionManagementDependencies)();
        await (0, dependencies_3.configureJwtDependencies)();
        await (0, dependencies_6.configureDependenciesDepartments)();
        await (0, dependencies_7.configureDependenciesTwoFactorUser)();
        const jwtService = tsyringe_1.container.resolve(oauthService_1.TokenService);
        const dataUser = {
            userId: "USER0011",
            token: jwtService.generateToken({
                userId: "USER0011",
                role: "01",
                jti: (0, uuid_1.v4)(),
            }),
            userAgent: "web",
            ipAddress: "192.123.4.123",
        };
        const sessionManagementService = tsyringe_1.container.resolve(oauthService_1.SessionManagamentService);
        const result = await sessionManagementService.createSessionUser(dataUser);
        console.log("📄 Sesión de Usuario creada:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestCreateSessionUser().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testCreateSessionUser.js.map