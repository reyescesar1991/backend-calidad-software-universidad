import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { DepartmentDto, objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { configureDependenciesHeadquarters } from '../../core/config/dependenciesHeadquarters/dependencies';
import { LocationService } from '../../services/locationService/Location.service';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';
import { configureWarehouseDependencies } from '../../core/config/dependenciesWarehouses/dependencies';


initializeTestEnvironment();


const runTestCreateDepartment = async () => {


    try {

        await configureDependenciesHeadquarters();

        await configureDependenciesDepartments();

        await configureWarehouseDependencies();

        const idDepartment : DepartmentDto = {

            idDepartment : "RRHH06",
            label : "Recursos Humanos",
            name : "Recursos Humanos",
            description : "recursos humanos",
            headquartersId : objectIdSchema.parse("682a620888424f4918faf669"),
            headquartersName : "id_test_3",
            isActive : false
        };
          
        const locationService = container.resolve(LocationService);

        const result = await locationService.createDepartment(idDepartment);

        console.log("📄 Departamento creado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestCreateDepartment().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});