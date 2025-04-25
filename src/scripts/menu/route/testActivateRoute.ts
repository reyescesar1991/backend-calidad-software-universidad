import "reflect-metadata";
import { container } from "tsyringe";
import "../../../core/config/dependenciesSubroutes/dependencies"; 
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies";
import { disconnectMongo } from "../../../core/utils/connectDb"
import { objectIdSchema } from "../../../validations";
import { MenuService } from "../../../services/menu/Menu.service";


const runTestActivateRoute = async () => {

    try {

        await configureDependencies();

        const idRoute = objectIdSchema.parse("680af64a04ba7b16208126f8");

        const routeService = container.resolve(MenuService);

        const result = await routeService.activateRoute(idRoute);

        console.log("📄 Ruta ahora activa:", result);

        
    } catch (error) {

        console.error("❌ Error:", error.message);
        console.error("❌ Error:", error.code);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }

}

runTestActivateRoute().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});

