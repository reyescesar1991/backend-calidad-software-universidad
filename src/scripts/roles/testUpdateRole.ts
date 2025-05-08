import 'reflect-metadata';
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';
import { objectIdSchema, UpdateRoleDto } from '../../validations';
import { container } from 'tsyringe';
import { RoleService } from '../../services/role/Role.service';

initializeTestEnvironment();

const runTestUpdateRole = async () => {

    try {

        await configureDependenciesRoles();

        const idRole = objectIdSchema.parse("681cbf83983a4218cb3de111")

        const updateData : UpdateRoleDto = {

            idRole : '06',
            name : "Test-rol-update",
            label : "Test-label-update",
            description : "Test-description-update",
        }

        const roleService = container.resolve(RoleService);

        const result = await roleService.updateRole(idRole, updateData);

        console.log("📄 Rol actualizado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestUpdateRole().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});