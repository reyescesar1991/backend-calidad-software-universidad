"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../../core/config/dependenciesSubroutes/dependencies"); // Importa las dependencias
const tsyringe_1 = require("tsyringe");
const connectDb_1 = require("../../../core/utils/connectDb");
const validations_1 = require("../../../validations");
const Menu_service_1 = require("../../../services/menu/Menu.service");
(0, connectDb_1.initializeTestEnvironment)();
const runTestDeleteSubroute = async () => {
    try {
        const idSubroute = validations_1.objectIdSchema.parse("6803f5ddd734053d607c363f");
        const subrouteService = tsyringe_1.container.resolve(Menu_service_1.MenuService);
        const result = await subrouteService.deleteSubroute(idSubroute);
        console.log("📄 Subruta actualizada y desactivada:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestDeleteSubroute().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testDeleteSubroute.js.map