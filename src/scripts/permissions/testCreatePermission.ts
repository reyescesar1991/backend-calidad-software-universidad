import "reflect-metadata";
import "../../core/config/dependenciesPermissions/dependencies"; // Importa las dependencias
import * as dotenv from 'dotenv';
import {resolve} from 'path';
import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import { IPermissionType } from '../../core/types';
import { container } from 'tsyringe';
import { PermissionService } from "../../services/permission/Permission.service";



dotenv.config({ path: resolve(process.cwd(), ".env") });

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';

console.log(CONNECTION_STRING);

if (!CONNECTION_STRING) {
    console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
    process.exit(1);
}

const runTestCreatePermission =  async () => {

    try {

        if(mongoose.connection.readyState !== 1){

            console.log("Conectando a la base de datos...");
            await mongoose.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }

        const uniqueId = uuidv4().substring(0,8);
        const testPermission : IPermissionType = {

            label : `Test Label ${uniqueId}`,
            permission : `test_permission_${uniqueId}`,
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