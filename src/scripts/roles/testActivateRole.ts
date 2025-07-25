import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import "../../core/config/dependenciesPermissions/dependencies";
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';
import { objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { RoleService } from '../../services/role/Role.service';
import { runAllDependencies } from '../../core/config/configureAllDependencies';


initializeTestEnvironment();


const runTestActivateRole = async () => {


    try {

        await runAllDependencies();

        const idRole = objectIdSchema.parse("67f7f5ff4f0b312a2319fc59");

        const roleService = container.resolve(RoleService);

        const result = await roleService.activateRole(idRole);

        console.log("📄 Role activado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }
}

runTestActivateRole().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});