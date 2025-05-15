import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { configureDependenciesRoleConfig } from '../../core/config/dependenciesRoleConfig/dependencies';
import { objectIdSchema, RoleConfigDto, UpdateRoleConfigDto } from '../../validations';
import { container } from 'tsyringe';
import { RoleConfigService } from '../../services/roleConfig/roleConfig.service';
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';


initializeTestEnvironment();


const runTestUpdateRoleConfig = async () => {

    try {

        await configureDependenciesRoleConfig();

        await configureDependenciesRoles();

        const idConfigRole = objectIdSchema.parse("68263fc7f016933bfed2ec24");

        const rolConfig : UpdateRoleConfigDto = {

            maxLoginAttempts : 2,
            rolName : "Test rol name config"
        }

        const roleConfigService = container.resolve(RoleConfigService);

        const result = await roleConfigService.updateConfigRole(idConfigRole, rolConfig);

        console.log("📄 Configuración de Role encontrada y actualizada:", result);
        

    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);
        
    } finally {

        disconnectMongo();
    }
}

runTestUpdateRoleConfig().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});

