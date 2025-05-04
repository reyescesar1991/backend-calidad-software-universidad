import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; 
import { container } from "tsyringe";
import { disconnectMongo } from "../../../core/utils/connectDb"
import { objectIdSchema } from "../../../validations";
import { MenuService } from "../../../services/menu/Menu.service";
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies";


const runTestFindModuleById = async () => {

    try {

        await configureDependencies();

        const idModule = objectIdSchema.parse('67d9d3ef7cdabe03598fde24');

        const moduleService = container.resolve(MenuService);

        const result = await moduleService.findModuleById(idModule);

        console.log("📄 Módulo encontrado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestFindModuleById().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});