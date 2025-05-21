import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { objectIdSchema, UpdateHeadquarterDto } from '../../validations';
import { container } from 'tsyringe';
import { configureDependenciesHeadquarters } from '../../core/config/dependenciesHeadquarters/dependencies';
import { LocationService } from '../../services/locationService/Location.service';
import { configureDependenciesDepartments } from '../../core/config/dependenciesDepartments/dependencies';


initializeTestEnvironment();


const runTestCreateHeadquarter = async () => {


    try {

        await configureDependenciesHeadquarters();

        await configureDependenciesDepartments();

        const idHeadquarter = objectIdSchema.parse("682a620888424f4918faf669");

        const headquarter : UpdateHeadquarterDto = {
            // "label": "Almacén Central test test test",
            // "name": "Deposito Principal test test test",
            // "phoneNumber": "02127778882",
            "email": "almacenTestttttTestttt@logistica.net",
          }

          console.log(headquarter);
          

        const locationService = container.resolve(LocationService);

        const result = await locationService.updateHeadquarter(idHeadquarter, headquarter);

        console.log("📄 Sucursal actualizada:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestCreateHeadquarter().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});