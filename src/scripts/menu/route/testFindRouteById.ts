import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; 
import { container } from "tsyringe";
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies"
import { disconnectMongo } from "../../../core/utils/connectDb";
import { objectIdSchema } from "../../../validations";
import { MenuService } from "../../../services/menu/Menu.service";



const runTestFindRouteById = async () => {


    try {

        await configureDependencies();

        const idRoute = objectIdSchema.parse("67d9c6bb2d01e9062cb0e741");

        const routeService = container.resolve(MenuService);

        const result = await routeService.findRouteById(idRoute);

        console.log("📄 Ruta encontrada:", result);

        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestFindRouteById().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});