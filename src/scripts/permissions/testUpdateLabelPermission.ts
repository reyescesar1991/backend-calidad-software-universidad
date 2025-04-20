import "reflect-metadata";
import { container } from 'tsyringe';
import "../../core/config/dependenciesPermissions/dependencies";
import { disconnectMongo, initializeTestEnvironment } from "../../core/utils/connectDb";
import { objectIdSchema } from "../../validations";
import { PermissionService } from "../../services/permission";

initializeTestEnvironment();

const runTestUpdateLabelPermission = async () => {

    try {
        
        const idPermission = objectIdSchema.parse("67feaf2eddf80c5ae50f8f2a");

        const permissionService = container.resolve(PermissionService);

        const result = await permissionService.updateLabelPermission(idPermission, "Test Label 2c90893b");

        console.log("📄 Permiso etiqueta actualizada:", result);

    } catch (error) {
        
        console.error("❌ Error:", error.message);
        process.exit(1); 

    } finally {

        disconnectMongo();
    }
}

runTestUpdateLabelPermission().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});