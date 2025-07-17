"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connectDb_1 = require("../../core/utils/connectDb");
require("../../core/config/dependenciesPermissions/dependencies");
const tsyringe_1 = require("tsyringe");
const dependencies_1 = require("../../core/config/dependenciesHeadquarters/dependencies");
const Location_service_1 = require("../../services/locationService/Location.service");
const dependencies_2 = require("../../core/config/dependenciesDepartments/dependencies");
const dependencies_3 = require("../../core/config/dependenciesWarehouses/dependencies");
(0, connectDb_1.initializeTestEnvironment)();
const runTestCreateHeadquarter = async () => {
    try {
        await (0, dependencies_1.configureDependenciesHeadquarters)();
        await (0, dependencies_2.configureDependenciesDepartments)();
        await (0, dependencies_3.configureWarehouseDependencies)();
        const headquarter = {
            "idHeadquarter": "id_test_4",
            "label": "Almacén Central test",
            "name": "Deposito Principal test",
            "address": "Zona Industrial, Galpón 3, test",
            "geoLocation": {
                "city": "Caracas",
                "state": "Distrito Capital",
                "zipCode": "1020"
            },
            "phoneNumber": "02127778881",
            "email": "almacenTestttt@logistica.net",
            "isActive": false
        };
        console.log(headquarter);
        const locationService = tsyringe_1.container.resolve(Location_service_1.LocationService);
        const result = await locationService.createHeadquarter(headquarter);
        console.log("📄 Sucursal creada:", result);
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        (0, connectDb_1.disconnectMongo)();
    }
};
runTestCreateHeadquarter().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=testCreateHeadquarter.js.map