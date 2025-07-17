"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../../core/config/dependenciesSubroutes/dependencies"); // Importa las dependencias
const tsyringe_1 = require("tsyringe");
const connectDb_1 = require("../../../core/utils/connectDb");
const Menu_service_1 = require("../../../services/menu/Menu.service");
(0, connectDb_1.initializeTestEnvironment)();
const runTestFindSubrouteByMainRoute = async () => {
    try {
        const mainRoute = "products";
        const subrouteService = tsyringe_1.container.resolve(Menu_service_1.MenuService);
        const result = await subrouteService.searchSubroutesByMainRoute(mainRoute);
        console.log(`📄 Subrutas encontradas asociada a la ruta principal ${mainRoute}: `, result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestFindSubrouteByMainRoute().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testFindSubrouteByMainRoute.js.map