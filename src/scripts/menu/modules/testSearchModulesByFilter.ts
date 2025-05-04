import "reflect-metadata";
import { container } from "tsyringe";
import "../../../core/config/dependenciesSubroutes/dependencies"; 
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies";
import { FilterOptions, ModuleFilterKeys } from "../../../core/types";
import { disconnectMongo } from "../../../core/utils/connectDb"
import { MenuService } from "../../../services/menu/Menu.service";



const runTestSearchModulesByFilter = async () => {


    try {

        await configureDependencies();

        const filter : FilterOptions<ModuleFilterKeys> = {

            "id" : "general-reports",
            "active" : false
            
        }

        const menuService = container.resolve(MenuService);

        const result = await menuService.searchModuleByFilter(filter);

        console.log("📄 Módulos encontradas con el filtro:", result);
        
    } catch (error) {
        
        console.error("❌ Error:", error.message);
        process.exit(1); 

    } finally {

        disconnectMongo();
    }
}

runTestSearchModulesByFilter().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});