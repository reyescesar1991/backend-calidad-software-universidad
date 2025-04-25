import "reflect-metadata";
import { container } from "tsyringe";
import "../../../core/config/dependenciesSubroutes/dependencies"; 
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies"
import { disconnectMongo } from "../../../core/utils/connectDb";
import { objectIdSchema } from "../../../validations";
import { MenuService } from "../../../services/menu/Menu.service";



const runTestGetSubroutesWithRoutes = async () => {


    try {
        
        await configureDependencies();

        const idRoute = objectIdSchema.parse("67d9c6bb2d01e9062cb0e583");

        const routeService = container.resolve(MenuService);

        const result = await routeService.getSubroutesWithIdRoute(idRoute);

        console.log("📄 Subrutas encontradas en la ruta enviada:", result);

    } catch (error) {
        
        console.error("❌ Error:", error.message);
        console.error("❌ Error:", error.code);
        process.exit(1); 

    } finally {

        disconnectMongo();
    }
}

runTestGetSubroutesWithRoutes().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});