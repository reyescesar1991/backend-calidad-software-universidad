import "reflect-metadata";
import { container } from 'tsyringe';
import "../../core/config/dependenciesPermissionsSecurity/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { objectIdSchema, UpdatePermissionSecurityDto } from "../../validations";
import { PermissionSecurityService } from "../../services/permissionSecurity";


initializeTestEnvironment();

const runTestUpdatePermissionSecurity = async () => {

    try {

        const idPermission = objectIdSchema.parse("68015e34a346525ca31786cd");

        const updatePermissionSecurity : UpdatePermissionSecurityDto = {

            can: true,
            isActive : true,
            label : "Test Permission Security Label 2",
            
        }

        const permissionSecurityService = container.resolve(PermissionSecurityService);

        const result = await permissionSecurityService.updatePermissionSecurity(idPermission, updatePermissionSecurity);

        console.log("📄 Permiso de seguridad encontrado y actualizado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);
        
    } finally{

        disconnectMongo();
    }

}

runTestUpdatePermissionSecurity().then(() => {

    console.log('Proceso de seed completo');
})
    .catch((error) => {
        console.error('Error durante el proceso de seed:', error);
    });

