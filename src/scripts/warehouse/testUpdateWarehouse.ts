import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { objectIdSchema, UpdateWarehouseDto, WarehouseDto } from '../../validations';
import { container } from 'tsyringe';
import { configureDependenciesHeadquarters } from '../../core/config/dependenciesHeadquarters/dependencies';
import { LocationService } from '../../services/locationService/Location.service';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';
import { configureWarehouseDependencies } from '../../core/config/dependenciesWarehouses/dependencies';



initializeTestEnvironment();


const runTestUpdateWarehouse = async () => {


    try {

        await configureDependenciesHeadquarters();

        await configureDependenciesDepartments();

        await configureWarehouseDependencies();

        const idWarehouse = objectIdSchema.parse("6866da34d4c12d5c02d3edd3");

        const dataWarehouse : UpdateWarehouseDto = {

            // name : "Almacen test test",
            // address : "address test test",
            // city : "City test test",
            // state : "State test test",
            // contactPerson : "test person test",
            phoneNumber : "021298765543",
            // email : "emailtestalmacen88@gmail.com"
        };
      
        const locationService = container.resolve(LocationService);

        const result = await locationService.updateWarehouse(idWarehouse, dataWarehouse);

        console.log("📄 Almacén actualizado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestUpdateWarehouse().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});