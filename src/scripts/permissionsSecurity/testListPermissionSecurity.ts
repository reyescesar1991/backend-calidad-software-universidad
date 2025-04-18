import "reflect-metadata";
import { container } from 'tsyringe';
import "../../core/config/dependenciesPermissionsSecurity/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { PermissionSecurityService } from "../../services/permissionSecurity";


initializeTestEnvironment();


const runTestListPermissionSecurity = async () => {

    try {

        const permissionSecurityService = container.resolve(PermissionSecurityService);

        const result = await permissionSecurityService.listPermissionsSecurity();

        console.log("📄 Permisos de seguridad encontrados:", result);
        
    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);
        
    } finally{

        disconnectMongo();
    }


}

runTestListPermissionSecurity().then(() => {

    console.log('Proceso de seed completo');
})
    .catch((error) => {
        console.error('Error durante el proceso de seed:', error);
    });