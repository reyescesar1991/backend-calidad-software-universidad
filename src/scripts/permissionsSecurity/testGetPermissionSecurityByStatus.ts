import "reflect-metadata";
import { container } from 'tsyringe';
import "../../core/config/dependenciesPermissionsSecurity/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { PermissionSecurityService } from "../../services/permissionSecurity";


initializeTestEnvironment();


const runTestGetPermissionsSecurityByStatus = async () => {

    try {

        const isActive : boolean = true;

        const permissionSecurityService = container.resolve(PermissionSecurityService);

        const result = await permissionSecurityService.getPermissionsSecurityByStatus(isActive);

        console.log(`📄 Permisos de seguridad con el estatus ${isActive ? "activo" : "desactivado"}`, result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);
        
    } finally{

        disconnectMongo();
    }

}

runTestGetPermissionsSecurityByStatus().then(() => {

    console.log('Proceso de seed completo');
})
    .catch((error) => {
        console.error('Error durante el proceso de seed:', error);
    });