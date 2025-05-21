import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { container } from 'tsyringe';
import { configureDependenciesHeadquarters } from '../../core/config/dependenciesHeadquarters/dependencies';
import { LocationService } from '../../services/locationService/Location.service';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';


initializeTestEnvironment();


const runTestFindByCustomIdHeadquarter = async () => {


    try {

        await configureDependenciesHeadquarters();

        await configureDependenciesDepartments();

        const customIdHeadquarter : string = "id_test_3";
          
        const locationService = container.resolve(LocationService);

        const result = await locationService.findHeadquarterByCustomId(customIdHeadquarter);

        console.log("📄 Sucursal encontrada por custom ID:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestFindByCustomIdHeadquarter().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});