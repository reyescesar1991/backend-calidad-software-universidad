import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; // Importa las dependencias
import { container } from 'tsyringe';
import { disconnectMongo, initializeTestEnvironment } from "../../../core/utils/connectDb";
import { MenuService } from "../../../services/menu/Menu.service";


initializeTestEnvironment();


const runTestFindSubrouteByMainRoute = async () => {


    try {

        const mainRoute = "products";

        const subrouteService = container.resolve(MenuService);

        const result = await subrouteService.searchSubroutesByMainRoute(mainRoute);

        console.log(`📄 Subrutas encontradas asociada a la ruta principal ${mainRoute}: `, result);
        
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally{

        disconnectMongo();
    }
}

runTestFindSubrouteByMainRoute().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});