import "reflect-metadata";
import { container } from "tsyringe";
import "../../../core/config/dependenciesSubroutes/dependencies"; 
import { disconnectMongo, initializeTestEnvironment } from "../../../core/utils/connectDb";
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies";
import { FilterOptions, RouteFilterKeys } from "../../../core/types";
import { MenuService } from "../../../services/menu/Menu.service";


initializeTestEnvironment();

const runTestSearchFilterRoute = async () => {

    try {

        await configureDependencies();

        const filter : FilterOptions<RouteFilterKeys> = {

            path : '/test/route',
        }

        const routeService = container.resolve(MenuService);

        const result = await routeService.searchRoutesByFilters(filter);

        console.log("📄 Rutas encontradas por el filtro:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestSearchFilterRoute().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});

