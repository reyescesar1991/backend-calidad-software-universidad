import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { configureDependenciesRoleConfig } from '../../core/config/dependenciesRoleConfig/dependencies';
import { objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { RoleConfigService } from '../../services/roleConfig/roleConfig.service';
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';
import { runAllDependencies } from '../../core/config/configureAllDependencies';


initializeTestEnvironment();


const runTestRoleConfigGetRole = async () => {

    try {


        await configureDependenciesRoleConfig();
        await configureDependenciesRoles();

        const rolConfigId = objectIdSchema.parse("67f7f643b65f69c726675981");

        const roleConfigService = container.resolve(RoleConfigService);

        const result = await roleConfigService.findRoleConfigWithRole(rolConfigId);

        console.log("📄 Rol encontrado por configuracion de rol: ", result);
        

    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);
        
    } finally {

        disconnectMongo();
    }
}

runTestRoleConfigGetRole().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});

