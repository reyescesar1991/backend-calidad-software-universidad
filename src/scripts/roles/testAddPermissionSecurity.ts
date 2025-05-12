import 'reflect-metadata';
import "../../core/config/dependenciesPermissions/dependencies";
import "../../core/config/dependenciesPermissionsSecurity/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { configureDependenciesRoles } from '../../core/config/dependenciesRoles/dependencies';
import { container } from 'tsyringe';
import { RoleService } from '../../services/role/Role.service';

initializeTestEnvironment();

const runTestAddPermissionSecurityRole = async () => {

    try {

        await configureDependenciesRoles();

        const idRole : string = '06';
        const idPermissionSecurity : string = 'force_password_reset';

        const roleService = container.resolve(RoleService);

        const result = await roleService.addPermissionSecurityRole(idRole, idPermissionSecurity);

        console.log("📄 Permiso de seguridad actualizados:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);  

        
    } finally {

        disconnectMongo();
    }
}

runTestAddPermissionSecurityRole().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});