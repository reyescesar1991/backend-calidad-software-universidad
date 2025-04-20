import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; // Importa las dependencias
import { container } from 'tsyringe';
import { disconnectMongo, initializeTestEnvironment } from "../../../core/utils/connectDb";
import { objectIdSchema, SubrouteUpdateDto } from "../../../validations";
import { MenuService } from "../../../services/menu/Menu.service";


initializeTestEnvironment();


const runTestUpdateSubroute = async () => {


    try {

        const idSubroute = objectIdSchema.parse("6803f1e0999a896f15c2ff53");

        const updatedData : SubrouteUpdateDto = {

            path : '/test/update/subroute',
            active : false,
            mainRoute : "home"
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