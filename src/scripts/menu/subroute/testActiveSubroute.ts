import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; // Importa las dependencias
import { container } from 'tsyringe';
import { disconnectMongo, initializeTestEnvironment } from "../../../core/utils/connectDb";
import { objectIdSchema } from "../../../validations";
import { MenuService } from "../../../services/menu/Menu.service";


initializeTestEnvironment();

const runTestActiveSubroute = async () => {


    try {

        const idSubroute = objectIdSchema.parse("6803f5ddd734053d607c363f");

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