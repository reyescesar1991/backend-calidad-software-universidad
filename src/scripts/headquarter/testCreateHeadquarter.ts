import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { HeadquarterDto, objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { configureDependenciesHeadquarters } from '../../core/config/dependenciesHeadquarters/dependencies';
import { LocationService } from '../../services/locationService/Location.service';


initializeTestEnvironment();


const runTestCreateHeadquarter = async () => {


    try {

        await configureDependenciesHeadquarters();

        const headquarter : HeadquarterDto = {
            "idHeadquarter": "id_test_4",
            "label": "Almacén Central test",
            "name": "Deposito Principal test",
            "address": "Zona Industrial, Galpón 3, test",
            "geoLocation": {
              "city": "Caracas",
              "state": "Distrito Capital",
              "zipCode": "1020"
            },
            "phoneNumber": "02127778881",
            "email": "almacenTestttt@logistica.net",
            "isActive": false
          }

          console.log(headquarter);
          

        const locationService = container.resolve(LocationService);

        const result = await locationService.createHeadquarter(headquarter);

        console.log("📄 Sucursal creada:", result);
        
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