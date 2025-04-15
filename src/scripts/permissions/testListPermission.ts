import "reflect-metadata";
import { container } from 'tsyringe';
import "../../core/config/dependenciesPermissions/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { PermissionService } from "../../services/permission";


initializeTestEnvironment();

const runTestListPermissions = async () => {


    try {

        const permissionService = container.resolve(PermissionService);

        const result = await permissionService.listPermissions();

        console.log("📄 Permisos encontrados:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        disconnectMongo();
    }
}

runTestListPermissions().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});