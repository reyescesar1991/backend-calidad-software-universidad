import "reflect-metadata";
import { container } from 'tsyringe';
import "../../core/config/dependenciesPermissions/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { PermissionService } from "../../services/permission";
import { objectIdSchema } from "../../validations";


initializeTestEnvironment();

const runTestFindByIDPermission = async () => {


    try {
        
        const idPermission = objectIdSchema.parse("67f94b58ce9b9cd946bc47f4");
        const permissionService = container.resolve(PermissionService);
        const result = await permissionService.getPermissionById(idPermission);
        console.log("📄 Permiso encontrado por id:", result);

    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1); 
    } finally{

        disconnectMongo();
    }
}

runTestFindByIDPermission().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});