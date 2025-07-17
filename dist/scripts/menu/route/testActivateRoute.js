"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
require("../../../core/config/dependenciesSubroutes/dependencies");
const dependencies_1 = require("../../../core/config/dependenciesRoutes/dependencies");
const connectDb_1 = require("../../../core/utils/connectDb");
const validations_1 = require("../../../validations");
const Menu_service_1 = require("../../../services/menu/Menu.service");
(0, connectDb_1.initializeTestEnvironment)();
const runTestActivateRoute = async () => {
    try {
        await (0, dependencies_1.configureDependencies)();
        const idRoute = validations_1.objectIdSchema.parse("6803e79829528d9d98373608");
        const routeService = tsyringe_1.container.resolve(Menu_service_1.MenuService);
        const result = await routeService.activateRoute(idRoute);
        console.log("📄 Ruta ahora activa:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        console.error("❌ Error:", error.code);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestActivateRoute().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testActivateRoute.js.map