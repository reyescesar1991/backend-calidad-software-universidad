import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { configureDependenciesHeadquarters } from '../../core/config/dependenciesHeadquarters/dependencies';
import { LocationService } from '../../services/locationService/Location.service';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';
import { configureWarehouseDependencies } from '../../core/config/dependenciesWarehouses/dependencies';


initializeTestEnvironment();


const runTestGetCurrentCapacityWarehouse = async () => {


    try {

        await configureDependenciesHeadquarters();

        await configureDependenciesDepartments();

        await configureWarehouseDependencies();

        const idWarehouse = objectIdSchema.parse("6866da34d4c12d5c02d3edd3");
      
        const locationService = container.resolve(LocationService);

        const result = await locationService.getCurrentCapacityWarehouse(idWarehouse);

        console.log("📄 Capacidad actual de uso del Almacén en pallets:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestGetCurrentCapacityWarehouse().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});