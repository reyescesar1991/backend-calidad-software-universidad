import "reflect-metadata";
import { container } from 'tsyringe';
import "../../core/config/dependenciesPermissionsSecurity/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { objectIdSchema } from "../../validations";
import { PermissionSecurityService } from "../../services/permissionSecurity";

initializeTestEnvironment();

const runTestUpdateLabelPermissionSecurity = async () => {


    try {

        const idPermission = objectIdSchema.parse("68015e34a346525ca31786cd");

        const permissionSecurityService = container.resolve(PermissionSecurityService);

        const result = await permissionSecurityService.updateLabelPermissionSecurity(idPermission, "");

        console.log("📄 Permiso de seguridad encontrado y etiqueta actualizada:", result);

        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);
        
    } finally{

        disconnectMongo();
    }

}


runTestUpdateLabelPermissionSecurity().then(() => {

    console.log('Proceso de seed completo');
})
    .catch((error) => {
        console.error('Error durante el proceso de seed:', error);
    });

