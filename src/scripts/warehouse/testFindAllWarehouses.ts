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


const runTestAllWarehouses = async () => {


    try {

        await configureDependenciesHeadquarters();

        await configureDependenciesDepartments();

        await configureWarehouseDependencies();
      
        const locationService = container.resolve(LocationService);

        const result = await locationService.findAllWarehouses();

        console.log("📄 Almacenes encontrados:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestAllWarehouses().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});