"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
require("../../core/config/dependenciesPermissions/dependencies");
const validations_1 = require("../../validations");
const tsyringe_1 = require("tsyringe");
const dependencies_1 = require("../../core/config/dependenciesHeadquarters/dependencies");
const Location_service_1 = require("../../services/locationService/Location.service");
const dependencies_2 = require("../../core/config/dependenciesDepartments/dependencies");
const dependencies_3 = require("../../core/config/dependenciesWarehouses/dependencies");
(0, connectDb_1.initializeTestEnvironment)();
const runTestAddCurrentCapacityWarehouse = async () => {
    try {
        await (0, dependencies_1.configureDependenciesHeadquarters)();
        await (0, dependencies_2.configureDependenciesDepartments)();
        await (0, dependencies_3.configureWarehouseDependencies)();
        const idWarehouse = validations_1.objectIdSchema.parse("6866da34d4c12d5c02d3edd3");
        const quantityBoxes = 300;
        const locationService = tsyringe_1.container.resolve(Location_service_1.LocationService);
        const result = await locationService.addCurrentCapacityWarehousePerBox(idWarehouse, quantityBoxes);
        console.log(`📄 Se han agregado ${quantityBoxes} al almacen:`, result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestAddCurrentCapacityWarehouse().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testAddCurrentCapacityWarehouse.js.map