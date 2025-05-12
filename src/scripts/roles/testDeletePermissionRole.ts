import 'reflect-metadata';
import "../../core/config/dependenciesPermissions/dependencies";
import { configureDependenciesRoles } from "../../core/config/dependenciesRoles/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { container } from 'tsyringe';
import { RoleService } from '../../services/role/Role.service';

initializeTestEnvironment();

const runTestDeletePermissionRole = async () => {

    try {

        await configureDependenciesRoles();

        const roleId : string = "06";
        const permissionId : string = 'ver_listar_productos';

        const roleService = container.resolve(RoleService);

        const result = await roleService.deletePermissionRole(roleId, permissionId);

        console.log("📄 Permisos del rol actualizados:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }

}

runTestDeletePermissionRole().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});