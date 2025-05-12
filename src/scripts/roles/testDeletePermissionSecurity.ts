import 'reflect-metadata';
import "../../core/config/dependenciesPermissions/dependencies";
import "../../core/config/dependenciesPermissionsSecurity/dependencies";
import { configureDependenciesRoles } from "../../core/config/dependenciesRoles/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { container } from 'tsyringe';
import { RoleService } from '../../services/role/Role.service';


initializeTestEnvironment();

const runTestDeletePermissionSecurityRole = async () => {

    try {

        await configureDependenciesRoles();

        const roleId : string = "06";
        const permissionId : string = 'force_password_reset';

        const roleService = container.resolve(RoleService);

        const result = await roleService.deletePermissionSecurityRole(roleId, permissionId);

        console.log("📄 Permisos de seguridad del rol actualizados:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  
        
    } finally {

        disconnectMongo();
    }

}

runTestDeletePermissionSecurityRole().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});