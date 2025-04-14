import "reflect-metadata";
import { container } from 'tsyringe';
import "../../core/config/dependenciesPermissions/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { objectIdSchema, UpdatePermissionDto } from "../../validations";
import { PermissionService } from "../../services/permission";


initializeTestEnvironment();

const runTestUpdatePermission = async () => {


    try {

        const idPermission = objectIdSchema.parse("67f94b58ce9b9cd946bc47f4");

        const data : UpdatePermissionDto = {

            isActive : true,
            can: false,
        }

        const permissionService = container.resolve(PermissionService);
        const result = await permissionService.updatePermission(idPermission, data);
        console.log("📄 Permiso actualizado:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally{

        disconnectMongo();
    }
}

runTestUpdatePermission().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});