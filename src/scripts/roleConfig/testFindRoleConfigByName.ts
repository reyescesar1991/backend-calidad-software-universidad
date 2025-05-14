import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { configureDependenciesRoleConfig } from '../../core/config/dependenciesRoleConfig/dependencies';
import { objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { RoleConfigService } from '../../services/roleConfig/roleConfig.service';


initializeTestEnvironment();


const runTestFindRoleConfigByName = async () => {

    try {

        await configureDependenciesRoleConfig();

        const rolConfigName : string = "Administrador";

        const roleConfigService = container.resolve(RoleConfigService);

        const result = await roleConfigService.findConfigRoleByNameRole(rolConfigName);

        console.log("📄 Configuración de Role encontrada por nombre:", result);
        

    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);
        
    } finally {

        disconnectMongo();
    }
}

runTestFindRoleConfigByName().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});

