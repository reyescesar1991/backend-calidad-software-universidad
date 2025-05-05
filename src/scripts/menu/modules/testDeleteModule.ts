import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; 
import { container } from "tsyringe";
import { disconnectMongo } from "../../../core/utils/connectDb";
import { objectIdSchema } from "../../../validations";
import { MenuService } from "../../../services/menu/Menu.service";
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies";


const runTestDeleteModule = async () => {

    try {

        await configureDependencies();

        const idModule = objectIdSchema.parse("6818d0a4244b1d0dd622cbbc");

        const moduleService = container.resolve(MenuService);

        const result = await moduleService.deleteModule(idModule);

        console.log("📄 Módulo desactivado:", result); 
        
    } catch (error) {
        
        console.error("❌ Error:", error.message);
        process.exit(1); 

    } finally {

        disconnectMongo();
    }
}

runTestDeleteModule().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});