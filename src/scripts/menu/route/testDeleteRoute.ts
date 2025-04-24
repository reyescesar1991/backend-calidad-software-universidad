import "reflect-metadata";
import { container } from 'tsyringe';
import "../../../core/config/dependenciesSubroutes/dependencies"; 
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies"
import { disconnectMongo } from "../../../core/utils/connectDb";
import { objectIdSchema } from "../../../validations";
import { MenuService } from "../../../services/menu/Menu.service";


const runTestDeleteRoute = async () => {

    try {
        
        await configureDependencies();

        const idRoute = objectIdSchema.parse("680a9041e339144d4594c82a");

        const routeService = container.resolve(MenuService);

        const result = await routeService.deleteRoute(idRoute);

        console.log("📄 Ruta desactivada:", result);

    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestDeleteRoute().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});

