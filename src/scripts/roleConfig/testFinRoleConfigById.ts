import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { configureDependenciesRoleConfig } from '../../core/config/dependenciesRoleConfig/dependencies';
import { objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { RoleConfigService } from '../../services/roleConfig/roleConfig.service';


initializeTestEnvironment();


const runTestFindRoleConfigById = async () => {

    try {

        await configureDependenciesRoleConfig();

        const rolConfigId = objectIdSchema.parse("67f7f643b65f69c726675981");

        const roleConfigService = container.resolve(RoleConfigService);

        const result = await roleConfigService.findConfigRoleById(rolConfigId);

        console.log("📄 Configuración de Role encontrada:", result);
        

    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);
        
    } finally {

        disconnectMongo();
    }
}

runTestFindRoleConfigById().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});

