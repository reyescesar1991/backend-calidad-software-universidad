import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { container } from 'tsyringe';
import { LocationService } from '../../services/locationService/Location.service';
import { runAllDependencies } from '../../core/config/configureAllDependencies';
import { objectIdSchema } from '../../validations';


initializeTestEnvironment();


const runTestLocationUser = async () => {


    try {

        await runAllDependencies();
          
        const locationService = container.resolve(LocationService);

        const idDepartment = objectIdSchema.parse("67eead413bf36442a108d306");

        const result = await locationService.buildLocationUser(idDepartment);

        console.log("📄 Locacion del usuario construida en base a su departamento:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestLocationUser().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});