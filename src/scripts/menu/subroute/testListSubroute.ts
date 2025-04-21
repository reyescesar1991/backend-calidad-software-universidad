import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; // Importa las dependencias
import { container } from 'tsyringe';
import { disconnectMongo, initializeTestEnvironment } from "../../../core/utils/connectDb";
import { MenuService } from "../../../services/menu/Menu.service";

initializeTestEnvironment();

const runTestListSubroutes = async () => {

    try {

        const subrouteService = container.resolve(MenuService);

        const result = await subrouteService.listSubroutes();

        console.log("📄 Subrutas registradas:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally{

        disconnectMongo();
    }

}

runTestListSubroutes().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});