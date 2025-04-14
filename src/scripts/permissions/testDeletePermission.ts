import "reflect-metadata";
import { container } from 'tsyringe';
import "../../core/config/dependenciesPermissions/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { objectIdSchema } from "../../validations";
import { PermissionService } from "../../services/permission";


initializeTestEnvironment();

const runTestDeletePermission = async () => {


    try {

        const idPermission = objectIdSchema.parse("67f94b58ce9b9cd946bc47f4");

        const permissionService = container.resolve(PermissionService);

        const result = await permissionService.deletePermission(idPermission);

        console.log("📄 Permiso eliminado logicamente:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally{

        disconnectMongo();
    }
}

runTestDeletePermission().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});