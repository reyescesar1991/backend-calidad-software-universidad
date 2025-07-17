"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../../core/config/dependenciesSubroutes/dependencies"); // Importa las dependencias
const uuid_1 = require("uuid");
const tsyringe_1 = require("tsyringe");
const connectDb_1 = require("../../../core/utils/connectDb");
const Menu_service_1 = require("../../../services/menu/Menu.service");
const dependencies_1 = require("../../../core/config/dependenciesRoutes/dependencies");
(0, connectDb_1.initializeTestEnvironment)();
const runTestCreateSubroute = async () => {
    try {
        await (0, dependencies_1.configureDependencies)();
        const uniqueId = (0, uuid_1.v4)().substring(0, 8);
        const data = {
            id: `Subroute-Test-bfe78107`,
            name: "Subroute Name",
            path: "/moduletest/routetest/subroutetest",
            active: true,
            permissionKey: "subroute_test",
            mainRoute: "route_test_0f266ab2"
        };
        const subrouteService = tsyringe_1.container.resolve(Menu_service_1.MenuService);
        const result = await subrouteService.createSubroute(data);
        console.log("📄 Subruta creada:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestCreateSubroute().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testCreateSubroute.js.map