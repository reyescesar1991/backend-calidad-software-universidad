import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; // Importa las dependencias
import { container } from 'tsyringe';
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../../core/utils/connectDb";
import { objectIdSchema } from "../../../validations";
import { MenuService } from "../../../services/menu/Menu.service";



initializeTestEnvironment();

const runTestDeletePermanentlySubroutes = async () => {

    try {

        await configureDependencies();

        const idSubroute = objectIdSchema.parse("6813fd7cabd772a2b5494eb6");

        const subrouteService = container.resolve(MenuService);

        const result = await subrouteService.deletePermanentlySubroute(idSubroute);

        console.log("📄 Subruta eliminada permanentemente: ", result);
        
    } catch (error) {
        
        console.error("❌ Error:", error.message);
        process.exit(1); 

    } finally {

        disconnectMongo();
    }
}

runTestDeletePermanentlySubroutes().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});