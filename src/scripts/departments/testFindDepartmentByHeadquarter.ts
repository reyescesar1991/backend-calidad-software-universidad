import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { container } from 'tsyringe';
import { configureDependenciesHeadquarters } from '../../core/config/dependenciesHeadquarters/dependencies';
import { LocationService } from '../../services/locationService/Location.service';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';
import { objectIdSchema } from '../../validations';


initializeTestEnvironment();


const runTestFindByHeadquarterDepartment = async () => {


    try {

        await configureDependenciesHeadquarters();

        await configureDependenciesDepartments();

        const idHeadquarter = objectIdSchema.parse("67e3494794aef1393cd02572");
          
        const locationService = container.resolve(LocationService);

        const result = await locationService.findDepartmentsByHeadquarter(idHeadquarter);

        console.log(`📄 Sucursales encontradas en la sucursal con ID ${idHeadquarter}:`, result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestFindByHeadquarterDepartment().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});