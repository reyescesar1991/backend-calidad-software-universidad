import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { configureDependenciesRoleConfig } from '../../core/config/dependenciesRoleConfig/dependencies';
import { objectIdSchema, RoleConfigDto } from '../../validations';
import { container } from 'tsyringe';
import { RoleConfigService } from '../../services/roleConfig/roleConfig.service';
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';


initializeTestEnvironment();


const runTestCreateRoleConfig = async () => {

    try {

        await configureDependenciesRoleConfig();

        await configureDependenciesRoles();

        const rolConfig : RoleConfigDto = {

            rolID : objectIdSchema.parse("681cbf83983a4218cb3de525"),
            maxLoginAttempts : 1,
            isActive : true,
            rolName : "Test rol name config 2"
        }

        const roleConfigService = container.resolve(RoleConfigService);

        const result = await roleConfigService.createConfigRole(rolConfig);

        console.log("📄 Configuración de Role encontrada y activada:", result);
        

    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);
        
    } finally {

        disconnectMongo();
    }
}

runTestCreateRoleConfig().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});

