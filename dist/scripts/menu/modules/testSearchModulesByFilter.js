"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
require("../../../core/config/dependenciesSubroutes/dependencies");
const dependencies_1 = require("../../../core/config/dependenciesRoutes/dependencies");
const connectDb_1 = require("../../../core/utils/connectDb");
const Menu_service_1 = require("../../../services/menu/Menu.service");
const runTestSearchModulesByFilter = async () => {
    try {
        await (0, dependencies_1.configureDependencies)();
        const filter = {
            "id": "general-reports",
            "active": false
        };
        const menuService = tsyringe_1.container.resolve(Menu_service_1.MenuService);
        const result = await menuService.searchModuleByFilter(filter);
        console.log("📄 Módulos encontradas con el filtro:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestSearchModulesByFilter().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testSearchModulesByFilter.js.map