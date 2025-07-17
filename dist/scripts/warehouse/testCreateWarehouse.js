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
const runTestCreateWarehouse = async () => {
    try {
        await (0, dependencies_1.configureDependenciesHeadquarters)();
        await (0, dependencies_2.configureDependenciesDepartments)();
        await (0, dependencies_3.configureWarehouseDependencies)();
        const dataWarehouse = {
            idWarehouse: "ALM-Car-001",
            idHeadquarter: validations_1.objectIdSchema.parse("67e3494794aef1393cd0256f"),
            name: "Almacen test",
            address: "address test",
            city: "City test",
            state: "State test",
            country: "Country test",
            capacity: 300,
            currentCapacity: 2,
            unitsPerBox: 15,
            boxesPerPallet: 60,
            isActive: true,
            contactPerson: "test person",
            phoneNumber: "02121234567",
            email: "emailtest@gmail.com"
        };
        const locationService = tsyringe_1.container.resolve(Location_service_1.LocationService);
        const result = await locationService.createWarehouse(dataWarehouse);
        console.log("📄 Almacén creado:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestCreateWarehouse().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testCreateWarehouse.js.map