import 'reflect-metadata';
import "../../core/config/dependenciesPermissions/dependencies";
import { disconnectMongo, initializeTestEnvironment } from '../../core/utils/connectDb';
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';
import { container } from 'tsyringe';
import { RoleService } from '../../services/role/Role.service';


initializeTestEnvironment();

const runTestAddPermissionRole = async () => {

    try {

        await configureDependenciesRoles();

        const idRole : string = '06';
        const permissionKey : string = 'modificar_producto';

        const roleService = container.resolve(RoleService);

        const result = await roleService.addPermissionRole(idRole, permissionKey);

        console.log("📄 Permisos del rol actualizados:", result);

        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestAddPermissionRole().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});