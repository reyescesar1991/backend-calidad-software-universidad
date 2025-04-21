import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; // Importa las dependencias
import { container } from 'tsyringe';
import { disconnectMongo, initializeTestEnvironment } from "../../../core/utils/connectDb";
import { FilterOptions, SubrouteFilterKeys } from "../../../core/types";
import { MenuService } from "../../../services/menu/Menu.service";
import { SubrouteModel } from "../../../db/models";

initializeTestEnvironment();


const runTestSearchSubroutesByFilters = async () => {

    try {

        const filter : FilterOptions<SubrouteFilterKeys> = {

            mainRoute : "products"
        }

        const subrouteService = container.resolve(MenuService);

        const result = await subrouteService.searchSubroutesByFilters(filter);

        console.log("📄 Subrutas encontradas por el filtro:", result);
        
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }

}


runTestSearchSubroutesByFilters().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});