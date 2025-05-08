import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';
import { objectIdSchema } from '../../validations';
import { container } from 'tsyringe';
import { RoleService } from '../../services/role/Role.service';


initializeTestEnvironment();


const runTestActivateRole = async () => {


    try {

        await configureDependenciesRoles();

        const idRole = objectIdSchema.parse("681cbf83983a4218cb3de111");

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