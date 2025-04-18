import "reflect-metadata";
import { container } from 'tsyringe';
import "../../core/config/dependenciesPermissionsSecurity/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { objectIdSchema } from "../../validations";
import { PermissionSecurityService } from "../../services/permissionSecurity";

initializeTestEnvironment();

const runTestFindPermissionSecurityById = async () => {

    try {

        const permissionId = objectIdSchema.parse("68015e34a346525ca31786cd");

        const permissionSecurityService = container.resolve(PermissionSecurityService);

        const result = await permissionSecurityService.findPermissionSecurityById(permissionId);

        console.log("📄 Permiso de seguridad encontrado:", result);

        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);
        
    } finally{

        disconnectMongo();
    }

}

runTestFindPermissionSecurityById().then(() => {

    console.log('Proceso de seed completo');
})
    .catch((error) => {
        console.error('Error durante el proceso de seed:', error);
    });