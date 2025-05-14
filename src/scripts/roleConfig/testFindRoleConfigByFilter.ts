import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { configureDependenciesRoleConfig } from '../../core/config/dependenciesRoleConfig/dependencies';
import { objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { RoleConfigService } from '../../services/roleConfig/roleConfig.service';
import { FilterOptions, RoleConfigFilterKeys } from '../../core/types';


initializeTestEnvironment();


const runTestFindRoleConfigByFilter = async () => {

    try {

        await configureDependenciesRoleConfig();

        const rolConfigFilter : FilterOptions<RoleConfigFilterKeys> = {

            maxLoginAttempts : 5
        };

        const roleConfigService = container.resolve(RoleConfigService);

        const result = await roleConfigService.searchConfigRoleByFilter(rolConfigFilter);

        console.log("📄 Configuración de Role encontrada por filtro:", result);
        

    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);
        
    } finally {

        disconnectMongo();
    }
}

runTestFindRoleConfigByFilter().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});

