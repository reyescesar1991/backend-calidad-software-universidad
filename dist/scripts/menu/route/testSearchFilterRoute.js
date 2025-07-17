"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
require("../../../core/config/dependenciesSubroutes/dependencies");
const connectDb_1 = require("../../../core/utils/connectDb");
const dependencies_1 = require("../../../core/config/dependenciesRoutes/dependencies");
const Menu_service_1 = require("../../../services/menu/Menu.service");
(0, connectDb_1.initializeTestEnvironment)();
const runTestSearchFilterRoute = async () => {
    try {
        await (0, dependencies_1.configureDependencies)();
        const filter = {
            path: '/test/route',
        };
        const routeService = tsyringe_1.container.resolve(Menu_service_1.MenuService);
        const result = await routeService.searchRoutesByFilters(filter);
        console.log("📄 Rutas encontradas por el filtro:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestSearchFilterRoute().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testSearchFilterRoute.js.map