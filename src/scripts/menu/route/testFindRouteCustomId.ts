
import "reflect-metadata";
import { container } from "tsyringe";
import "../../../core/config/dependenciesSubroutes/dependencies"; 
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../../core/utils/connectDb";
import { MenuService } from "../../../services/menu/Menu.service";


initializeTestEnvironment();


const runTestFindRouteByCustomId = async () => {

    try {
        
        await configureDependencies();

        const customId : string = "route_test_0f266ab2";

        const routeService = container.resolve(MenuService);

        const result = await routeService.findRouteByCustomId(customId);

        console.log("📄 Ruta encontrada:", result);

    } catch (error) {
        
        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestFindRouteByCustomId().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});