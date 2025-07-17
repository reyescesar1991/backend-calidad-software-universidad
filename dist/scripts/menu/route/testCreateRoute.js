"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../../core/config/dependenciesSubroutes/dependencies"); // Importa las dependencias
const uuid_1 = require("uuid");
const tsyringe_1 = require("tsyringe");
const connectDb_1 = require("../../../core/utils/connectDb");
const Menu_service_1 = require("../../../services/menu/Menu.service");
const dependencies_1 = require("../../../core/config/dependenciesRoutes/dependencies");
const runTestCreateRoute = async () => {
    try {
        await (0, dependencies_1.configureDependencies)();
        const uuid = (0, uuid_1.v4)().substring(0, 8);
        const route = {
            id: `route_test_${uuid}`,
            idModule: 'module_test_29303cc5',
            name: `route_test_${uuid}`,
            path: "/test/route",
            icon: "icon-test",
            active: true,
            subroutes: []
        };
        console.log(route);
        const routeService = tsyringe_1.container.resolve(Menu_service_1.MenuService);
        const result = await routeService.createRoute(route);
        console.log("📄 Ruta creada:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestCreateRoute().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testCreateRoute.js.map