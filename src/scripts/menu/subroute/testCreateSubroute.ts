import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; // Importa las dependencias
import {v4 as uuidv4} from 'uuid';
import { container } from 'tsyringe';
import { disconnectMongo, initializeTestEnvironment } from "../../../core/utils/connectDb";
import { SubrouteDto } from "../../../validations";
import { MenuService } from "../../../services/menu/Menu.service";
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies";


initializeTestEnvironment();


const runTestCreateSubroute = async () => {

    try {

        await configureDependencies();

        const uniqueId = uuidv4().substring(0,8);
        const data : SubrouteDto = {

            id : `Subroute-Test-${uniqueId}`,
            name : "Subroute Name",
            path : "/moduletest/routetest/subroutetest",
            active : true,
            permissionKey : "subroute_test",
            mainRoute : "route_test_0f266ab2"
        }

        const subrouteService = container.resolve(MenuService);

        const result = await subrouteService.createSubroute(data);

        console.log("📄 Subruta creada:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally{

        disconnectMongo();
    }

}

runTestCreateSubroute().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});