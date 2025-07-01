import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; // Importa las dependencias
import { container } from 'tsyringe';
import { disconnectMongo, initializeTestEnvironment } from "../../../core/utils/connectDb";
import { objectIdSchema } from "../../../validations";
import { MenuService } from "../../../services/menu/Menu.service";
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies";


initializeTestEnvironment();

const runTestActiveSubroute = async () => {


    try {

        await configureDependencies();

        const idSubroute = objectIdSchema.parse("67d8d1d0fd39f39f4e30ff0d");

        const subrouteService = container.resolve(MenuService);

        const result = await subrouteService.activeSubroute(idSubroute);

        console.log("📄 Subruta actualizada y activada:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }

}

runTestActiveSubroute().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});