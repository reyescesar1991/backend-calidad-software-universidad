import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; // Importa las dependencias
import { container } from 'tsyringe';
import { disconnectMongo, initializeTestEnvironment } from "../../../core/utils/connectDb";
import { objectIdSchema, SubrouteUpdateDto } from "../../../validations";
import { MenuService } from "../../../services/menu/Menu.service";
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies";


initializeTestEnvironment();


const runTestUpdateSubroute = async () => {


    try {

        await configureDependencies();

        const idSubroute = objectIdSchema.parse("6813fd7cabd772a2b5494eb6");

        const updatedData : SubrouteUpdateDto = {

            mainRoute : "route_test_5f7ee8a4"
        }

        const subrouteService = container.resolve(MenuService);

        const result = await subrouteService.updateSubroute(idSubroute, updatedData);

        console.log("📄 Subruta actualizada:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally{

        disconnectMongo();
    }

}

runTestUpdateSubroute().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});