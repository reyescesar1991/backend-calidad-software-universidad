import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; 
import { container } from "tsyringe";
import { disconnectMongo } from "../../../core/utils/connectDb";
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies";
import { ModuleUpdateDto, objectIdSchema } from "../../../validations";
import { MenuService } from "../../../services/menu/Menu.service";


const runTestUpdateModule = async () => {


    try {

        await configureDependencies();

        const idModule = objectIdSchema.parse("6818d0a4244b1d0dd622cbbc");

        const moduleUpdated : ModuleUpdateDto = {

            title : "Test Module update"
        }

        const moduleService = container.resolve(MenuService);

        const result = await moduleService.updateModule(idModule, moduleUpdated);

        console.log("📄 Módulo actualizado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestUpdateModule().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});