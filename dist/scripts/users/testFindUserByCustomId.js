"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const dependencies_1 = require("../../core/config/dependenciesUsers/dependencies");
const connectDb_1 = require("../../core/utils/connectDb");
const user_service_1 = require("../../services/userService/user.service");
const dependencies_2 = require("../../core/config/dependenciesRoles/dependencies");
const dependencies_3 = require("../../core/config/dependenciesRoleConfig/dependencies");
const dependencies_4 = require("../../core/config/dependenciesDepartments/dependencies");
const dependencies_5 = require("../../core/config/dependenciesTwoFactorUser/dependencies");
const dependencies_6 = require("../../core/config/dependenciesRoutes/dependencies");
(0, connectDb_1.initializeTestEnvironment)();
const runTestFindUserByCustomId = async () => {
    try {
        await (0, dependencies_2.configureDependenciesRoles)();
        await (0, dependencies_1.configureUserDependencies)();
        await (0, dependencies_3.configureDependenciesRoleConfig)();
        await (0, dependencies_4.configureDependenciesDepartments)();
        await (0, dependencies_5.configureDependenciesTwoFactorUser)();
        await (0, dependencies_6.configureDependencies)();
        const idUser = "USER9999";
        const userService = tsyringe_1.container.resolve(user_service_1.UserService);
        const result = await userService.findUserByCustomId(idUser);
        console.log("📄 Usuario encontrado por ID custom:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestFindUserByCustomId().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFindUserByCustomId.js.map