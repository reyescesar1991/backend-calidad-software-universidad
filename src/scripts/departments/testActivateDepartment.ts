import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { configureDependenciesHeadquarters } from '../../core/config/dependenciesHeadquarters/dependencies';
import { LocationService } from '../../services/locationService/Location.service';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';


initializeTestEnvironment();


const runTestActivateDepartment = async () => {


    try {

        await configureDependenciesHeadquarters();

        await configureDependenciesDepartments();

        const idDepartment = objectIdSchema.parse("682e325a174576bd98f15671");
          
        const locationService = container.resolve(LocationService);

        const result = await locationService.activateDepartment(idDepartment);

        console.log("📄 Departamento activado por ID:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestActivateDepartment().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});