import "reflect-metadata";
import { container } from 'tsyringe';
import "../../core/config/dependenciesPermissionsSecurity/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { objectIdSchema } from "../../validations";
import { PermissionSecurityService } from "../../services/permissionSecurity";


initializeTestEnvironment();

const runTestTogglePermissionSecurity = async () => {

    try {

        const idPermission = objectIdSchema.parse("68015e34a346525ca31786cd");

        const permissionSecurityService = container.resolve(PermissionSecurityService);

        const result = await permissionSecurityService.togglePermissionSecurityCan(idPermission);

        console.log(`Permiso de seguridad ahora ${result.isActive === true ? "activado" : "desactivado"}`, result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);
        
    } finally{

        disconnectMongo();
    }

}

runTestTogglePermissionSecurity().then(() => {

    console.log('Proceso de seed completo');
})
    .catch((error) => {
        console.error('Error durante el proceso de seed:', error);
    });