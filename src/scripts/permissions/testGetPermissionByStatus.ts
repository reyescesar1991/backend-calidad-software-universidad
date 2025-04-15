import "reflect-metadata";
import { container } from 'tsyringe';
import "../../core/config/dependenciesPermissions/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { PermissionService } from "../../services/permission";


initializeTestEnvironment();


const runTestGetPermissionByStatus = async () => {

    try {

        const valueIsActive = false;

        const permissionService = container.resolve(PermissionService);

        const result = await permissionService.getPermissionsByStatus(valueIsActive);

        console.log("📄 Permisos encontrados por estatus:", result);

        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally{

        disconnectMongo();
    }
}


runTestGetPermissionByStatus().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});