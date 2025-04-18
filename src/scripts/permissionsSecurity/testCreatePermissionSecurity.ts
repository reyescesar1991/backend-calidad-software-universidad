import "reflect-metadata";
import { container } from 'tsyringe';
import "../../core/config/dependenciesPermissionsSecurity/dependencies";
import { v4 as uuidv4 } from 'uuid';
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { IPermissionSecurity } from "../../core/types";
import { PermissionSecurityService } from "../../services/permissionSecurity";


initializeTestEnvironment();

const runTestCreatePermissionSecurity = async () => {

    try {

        const uniqueId = uuidv4().substring(0, 8);
        const testPermission: IPermissionSecurity = {

            label: `Test Label ${uniqueId}`,
            permission: `test_permission_${uniqueId}`,
            can: true,
            id : `test_permission_${uniqueId}`
        }

        const permissionSecurityService = container.resolve(PermissionSecurityService);
        const result = await permissionSecurityService.createPermissionSecurity(testPermission);
        console.log("📄 Permiso de seguridad creado:", result);


    } catch (error) {

        console.error("❌ Error:", error.message);
        process.exit(1);

    } finally {

        disconnectMongo();
    }

}

runTestCreatePermissionSecurity().then(() => {

    console.log('Proceso de seed completo');
})
    .catch((error) => {
        console.error('Error durante el proceso de seed:', error);
    });