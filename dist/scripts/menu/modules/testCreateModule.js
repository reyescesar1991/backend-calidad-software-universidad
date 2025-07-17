"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../../core/config/dependenciesSubroutes/dependencies");
const tsyringe_1 = require("tsyringe");
const uuid_1 = require("uuid");
const dependencies_1 = require("../../../core/config/dependenciesRoutes/dependencies");
const connectDb_1 = require("../../../core/utils/connectDb");
const Menu_service_1 = require("../../../services/menu/Menu.service");
const runTestCreateModule = async () => {
    try {
        await (0, dependencies_1.configureDependencies)();
        const uuid = (0, uuid_1.v4)().substring(0, 8);
        const dataModule = {
            id: `module_test_${uuid}`,
            title: `module_test_${uuid}`,
            active: true,
        };
        const moduleService = tsyringe_1.container.resolve(Menu_service_1.MenuService);
        const result = await moduleService.createModule(dataModule);
        console.log("📄 Módulo creadao:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestCreateModule().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testCreateModule.js.map