import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { HeadquarterDto, objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { configureDependenciesHeadquarters } from '../../core/config/dependenciesHeadquarters/dependencies';
import { LocationService } from '../../services/locationService/Location.service';


initializeTestEnvironment();


const runTestFindByIdHeadquarter = async () => {


    try {

        await configureDependenciesHeadquarters();

        const idHeadquarter = objectIdSchema.parse("682a620888424f4918faf669");
          
        const locationService = container.resolve(LocationService);

        const result = await locationService.findHeadquarterById(idHeadquarter);

        console.log("📄 Sucursal encontrada por ID:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestFindByIdHeadquarter().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});