"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
require("../../../core/config/dependenciesSubroutes/dependencies");
const connectDb_1 = require("../../../core/utils/connectDb");
const dependencies_1 = require("../../../core/config/dependenciesRoutes/dependencies");
const Menu_service_1 = require("../../../services/menu/Menu.service");
(0, connectDb_1.initializeTestEnvironment)();
const runTestListRoutes = async () => {
    try {
        await (0, dependencies_1.configureDependencies)();
        const routeService = tsyringe_1.container.resolve(Menu_service_1.MenuService);
        const result = await routeService.listRoutes();
        console.log("📄 Rutas registradas:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestListRoutes().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testListRoutes.js.map