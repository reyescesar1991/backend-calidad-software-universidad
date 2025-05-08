import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';
import { objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { RoleService } from '../../services/role/Role.service';

initializeTestEnvironment();

const runTestSetDefaultRol = async () => {


    try {

        await configureDependenciesRoles();

        const idRole = objectIdSchema.parse("67f7f5ff4f0b312a2319fc56");

        const roleService = container.resolve(RoleService);

        const result = await roleService.setDefaultRoleSystem(idRole);

        console.log("📄 Role seteado como rol por defecto del sistema:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestSetDefaultRol().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});