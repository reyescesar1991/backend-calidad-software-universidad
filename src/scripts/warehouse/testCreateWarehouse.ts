import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { objectIdSchema, WarehouseDto } from '../../validations';
import { container } from 'tsyringe';
import { configureDependenciesHeadquarters } from '../../core/config/dependenciesHeadquarters/dependencies';
import { LocationService } from '../../services/locationService/Location.service';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';
import { configureWarehouseDependencies } from '../../core/config/dependenciesWarehouses/dependencies';



initializeTestEnvironment();


const runTestCreateWarehouse = async () => {


    try {

        await configureDependenciesHeadquarters();

        await configureDependenciesDepartments();

        await configureWarehouseDependencies();

        const dataWarehouse : WarehouseDto = {

            idWarehouse : "ALM-Car-001",
            idHeadquarter : objectIdSchema.parse("67e3494794aef1393cd0256f"),
            name : "Almacen test",
            address : "address test",
            city : "City test",
            state : "State test",
            country : "Country test",
            capacity : 300,
            currentCapacity : 2,
            unitsPerBox : 15,
            boxesPerPallet : 60,
            isActive : true,
            contactPerson : "test person",
            phoneNumber : "02121234567",
            email : "emailtest@gmail.com"
        };
      
        const locationService = container.resolve(LocationService);

        const result = await locationService.createWarehouse(dataWarehouse);

        console.log("📄 Almacén creado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestCreateWarehouse().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});