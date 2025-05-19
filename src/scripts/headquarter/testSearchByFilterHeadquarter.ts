import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { container } from 'tsyringe';
import { configureDependenciesHeadquarters } from '../../core/config/dependenciesHeadquarters/dependencies';
import { LocationService } from '../../services/locationService/Location.service';
import { FilterOptions, HeadquarterConfigFilterKeys } from '../../core/types';


initializeTestEnvironment();


const runTestSearchByFilterHeadquarter = async () => {


    try {

        await configureDependenciesHeadquarters();

        //TODO: Cambiar en base de datos las sucursales de location a geolocation

        const filterHeadquarter : FilterOptions<HeadquarterConfigFilterKeys> = {

            geoLocation : { city: 'Caracas'},
            idHeadquarter : 'id_test_2',
        };
          
        const locationService = container.resolve(LocationService);

        const result = await locationService.searchHeadquarterByFilter(filterHeadquarter);

        console.log("📄 Sucursal encontrada por ID:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestSearchByFilterHeadquarter().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});