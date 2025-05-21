import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { configureDependenciesHeadquarters } from '../../core/config/dependenciesHeadquarters/dependencies';
import { LocationService } from '../../services/locationService/Location.service';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';
import { DepartmentConfigFilterKeys, FilterOptions } from '../../core/types';


initializeTestEnvironment();


const runTestSearchDepartmentByFilter = async () => {


    try {

        await configureDependenciesHeadquarters();

        await configureDependenciesDepartments();

        const filterDepartment : FilterOptions<DepartmentConfigFilterKeys> = {

            // idDepartment : "VNT06",
            // label : "Ventas"
            // name : "Ventas"
            // headquartersName : "BAR-DP-04",
            // isActive : false
        };
          
        const locationService = container.resolve(LocationService);

        const result = await locationService.searchDepartmentByFilter(filterDepartment);

        console.log("📄 Departamentos encontrados por el filtro:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestSearchDepartmentByFilter().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});