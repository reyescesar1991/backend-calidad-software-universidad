import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { configureDependenciesRoleConfig } from '../../core/config/dependenciesRoleConfig/dependencies';
import { objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { RoleConfigService } from '../../services/roleConfig/roleConfig.service';
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';


initializeTestEnvironment();


const runTestFindRolesByConfigRoles = async () => {

    try {


        await configureDependenciesRoleConfig();
        await configureDependenciesRoles();


        const roleConfigService = container.resolve(RoleConfigService);

        const result = await roleConfigService.findRolesByConfigRoles();

        console.log("📄 Roles encontrados por configuracion de rol: ", result);
        

    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);
        
    } finally {

        disconnectMongo();
    }
}

runTestFindRolesByConfigRoles().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});

