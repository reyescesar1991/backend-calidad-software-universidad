import "reflect-metadata";
import { container } from 'tsyringe';
import "../../../core/config/dependenciesSubroutes/dependencies"; 
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies"
import { disconnectMongo } from "../../../core/utils/connectDb";
import { objectIdSchema, RouteUpdateDto } from "../../../validations";
import { MenuService } from "../../../services/menu/Menu.service";


const runTestUpdateRoute = async () => {

    try {

        await configureDependencies();

        const idRoute = objectIdSchema.parse("680af64a04ba7b16208126f8");

        const dataRoute : RouteUpdateDto = {

            // name : "test-1",
            // path : "/path/test/test",
            // icon : "icon-test-test",
            // active : true,
            idModule : "home",
        }

        const routeService = container.resolve(MenuService);

        const result = await routeService.updateRouteById(idRoute, dataRoute);

        console.log("📄 Ruta actualizada:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestUpdateRoute().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});