"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../../core/config/dependenciesSubroutes/dependencies"); // Importa las dependencias
const tsyringe_1 = require("tsyringe");
const connectDb_1 = require("../../../core/utils/connectDb");
const validations_1 = require("../../../validations");
const Menu_service_1 = require("../../../services/menu/Menu.service");
const dependencies_1 = require("../../../core/config/dependenciesRoutes/dependencies");
(0, connectDb_1.initializeTestEnvironment)();
const runTestActiveSubroute = async () => {
    try {
        await (0, dependencies_1.configureDependencies)();
        const idSubroute = validations_1.objectIdSchema.parse("67d8d1d0fd39f39f4e30ff0f");
        const subrouteService = tsyringe_1.container.resolve(Menu_service_1.MenuService);
        const result = await subrouteService.activeSubroute(idSubroute);
        console.log("📄 Subruta actualizada y activada:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestActiveSubroute().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testActiveSubroute.js.map