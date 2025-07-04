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


const runTestDecreaseCurrentCapacityWarehouse = async () => {


    try {

        await configureDependenciesHeadquarters();

        await configureDependenciesDepartments();

        await configureWarehouseDependencies();

        const idWarehouse = objectIdSchema.parse("6866da34d4c12d5c02d3edd3");

        const quantityBoxes : number = 300;
      
        const locationService = container.resolve(LocationService);

        const result = await locationService.decreaseCurrentCapacityWarehousePerBox(idWarehouse, quantityBoxes);

        console.log(`📄 Se han vendido ${quantityBoxes} del almacen:`, result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestDecreaseCurrentCapacityWarehouse().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});