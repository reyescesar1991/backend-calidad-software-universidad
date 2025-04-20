import "reflect-metadata";
import "../../core/config/dependenciesPermissions/dependencies"; // Importa las dependencias
import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import { IPermissionType } from '../../core/types';
import { container } from 'tsyringe';
import { PermissionService } from "../../services/permission/Permission.service";
import { initializeTestEnvironment } from "../../core/utils/connectDb";



initializeTestEnvironment()

const runTestCreatePermission =  async () => {

    try {


        const uniqueId = uuidv4().substring(0,8);
        const testPermission : IPermissionType = {

            label : `Test Label 2c90893b`,
            permission : `test_permission_2c90893b`,
            can: true,
        }

        const permissionService = container.resolve(PermissionService); 
        const result = await permissionService.createPermission(testPermission);
        console.log("📄 Permiso creado:", result);

        
    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1); 
        
    } finally {

        await mongoose.disconnect();
    }
}

runTestCreatePermission().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});