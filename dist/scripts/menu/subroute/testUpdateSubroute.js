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
const runTestUpdateSubroute = async () => {
    try {
        await (0, dependencies_1.configureDependencies)();
        const idSubroute = validations_1.objectIdSchema.parse("6813fd7cabd772a2b5494eb6");
        const updatedData = {
            mainRoute: "route_test_5f7ee8a4"
        };
        const subrouteService = tsyringe_1.container.resolve(Menu_service_1.MenuService);
        const result = await subrouteService.updateSubroute(idSubroute, updatedData);
        console.log("📄 Subruta actualizada:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestUpdateSubroute().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testUpdateSubroute.js.map