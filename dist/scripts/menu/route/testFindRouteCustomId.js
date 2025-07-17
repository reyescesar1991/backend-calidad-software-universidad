"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
require("../../../core/config/dependenciesSubroutes/dependencies");
const dependencies_1 = require("../../../core/config/dependenciesRoutes/dependencies");
const connectDb_1 = require("../../../core/utils/connectDb");
const Menu_service_1 = require("../../../services/menu/Menu.service");
(0, connectDb_1.initializeTestEnvironment)();
const runTestFindRouteByCustomId = async () => {
    try {
        await (0, dependencies_1.configureDependencies)();
        const customId = "route_test_0f266ab2";
        const routeService = tsyringe_1.container.resolve(Menu_service_1.MenuService);
        const result = await routeService.findRouteByCustomId(customId);
        console.log("📄 Ruta encontrada:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestFindRouteByCustomId().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFindRouteCustomId.js.map