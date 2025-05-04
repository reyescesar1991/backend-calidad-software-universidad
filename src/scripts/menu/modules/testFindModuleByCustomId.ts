import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; 
import { container } from "tsyringe";
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies";
import { MenuService } from "../../../services/menu/Menu.service";
import { disconnectMongo } from "../../../core/utils/connectDb";


const runTestFindModuleByCustomId = async () => {

    try {

        await configureDependencies();

        const customIdModule : string = "general-reportsssss";

        const moduleService = container.resolve(MenuService);

        const result = await moduleService.findModuleByCustomId(customIdModule);

        console.log("📄 Módulo encontrado:", result);
        
    } catch (error) {
        
        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestFindModuleByCustomId().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});