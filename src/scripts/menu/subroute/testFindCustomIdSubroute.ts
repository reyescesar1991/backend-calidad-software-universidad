import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; // Importa las dependencias
import { container } from 'tsyringe';
import { disconnectMongo, initializeTestEnvironment } from "../../../core/utils/connectDb";
import { MenuService } from "../../../services/menu/Menu.service";

initializeTestEnvironment();

const runTestFindCustomIdSubroute = async () => {

    try {

        const customId = "Subroute-Test-1c049fba";

        const subrouteService = container.resolve(MenuService);

        const result = await subrouteService.findSubrouteByCustomId(customId);

        console.log(`📄 Subruta encontrada asociada al Id ${customId}: `, result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }

}

runTestFindCustomIdSubroute().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});