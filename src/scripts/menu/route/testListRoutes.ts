import "reflect-metadata";
import { container } from "tsyringe";
import "../../../core/config/dependenciesSubroutes/dependencies"; 
import { disconnectMongo, initializeTestEnvironment } from "../../../core/utils/connectDb";
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies";
import { MenuService } from "../../../services/menu/Menu.service";

initializeTestEnvironment();

const runTestListRoutes = async () => {

    try {

        await configureDependencies();

        const routeService = container.resolve(MenuService);

        const result = await routeService.listRoutes();

        console.log("📄 Rutas registradas:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);
        
    } finally {

        disconnectMongo();
    }
}

runTestListRoutes().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});