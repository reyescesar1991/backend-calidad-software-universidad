import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; // Importa las dependencias
import {v4 as uuidv4} from 'uuid';
import { container } from 'tsyringe';
import { disconnectMongo } from "../../../core/utils/connectDb";
import { RouteDto } from "../../../validations";
import { MenuService } from "../../../services/menu/Menu.service";
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies";


const runTestCreateRoute = async () => {

    try {

        await configureDependencies();

        const uuid = uuidv4().substring(0,8);

        const route : RouteDto = {

            id : `route_test_${uuid}`,
            idModule : 'module_test_29303cc5',
            name : `route_test_${uuid}`,
            path : "/test/route",
            icon : "icon-test",
            active : true,
            subroutes : []
        }

        console.log(route);
        
        const routeService = container.resolve(MenuService);

        const result = await routeService.createRoute(route);

        console.log("📄 Ruta creada:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally{

        disconnectMongo();
    }

}

runTestCreateRoute().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});