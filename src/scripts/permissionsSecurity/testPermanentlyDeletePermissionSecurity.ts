import "reflect-metadata";
import { container } from 'tsyringe';
import "../../core/config/dependenciesPermissionsSecurity/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { objectIdSchema } from "../../validations";
import { PermissionSecurityService } from "../../services/permissionSecurity";


initializeTestEnvironment();


const runTestPermanentlyDeletePermissionSecurity = async () => {

    try {

        const idPermission = objectIdSchema.parse("67f7f5b8c9604dfe14db3d51");

        const permissionSecurityService = container.resolve(PermissionSecurityService);

        const result = await permissionSecurityService.permanentlyDeletePermissionSecurity(idPermission);

        console.log("📄 Permiso de seguridad eliminado por id:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);
        
    } finally{

        disconnectMongo();
    }

}

runTestPermanentlyDeletePermissionSecurity().then(() => {

    console.log('Proceso de seed completo');
})
    .catch((error) => {
        console.error('Error durante el proceso de seed:', error);
    });