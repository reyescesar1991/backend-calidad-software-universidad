import "reflect-metadata";
import "../../../core/config/dependenciesSubroutes/dependencies"; 
import { container } from "tsyringe";
import {v4 as uuidv4} from 'uuid';
import { configureDependencies } from "../../../core/config/dependenciesRoutes/dependencies";
import { disconnectMongo } from "../../../core/utils/connectDb"
import { ModuleDto } from "../../../validations";
import { MenuService } from "../../../services/menu/Menu.service";


const runTestCreateModule = async () => {

    try {

        await configureDependencies();

        const uuid = uuidv4().substring(0,8);

        const dataModule : ModuleDto = {

            id : `module_test_${uuid}`,
            title : `module_test_${uuid}`,
            active : true,
        }

        const moduleService = container.resolve(MenuService);

        const result = await moduleService.createModule(dataModule);

        console.log("📄 Módulo creadao:", result);       
        
    } catch (error) {
        
        console.error("❌ Error:", error.message);
        process.exit(1); 

    } finally {

        disconnectMongo();
    }
};

runTestCreateModule().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});