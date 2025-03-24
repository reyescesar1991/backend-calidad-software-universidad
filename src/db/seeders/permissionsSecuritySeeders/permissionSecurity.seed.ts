import * as dotenv from 'dotenv';
import {resolve} from 'path';
import mongoose from "mongoose";
import { IPermissionSecurity } from '../../../core/types';
import { PermissionSecurityDto, permissionSecurityZodSchema } from '../../../validations';
import { PermissionSecurityModel } from '../../models';


dotenv.config({ path: resolve(process.cwd(), ".env") });

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';

console.log(CONNECTION_STRING);


if (!CONNECTION_STRING) {
  console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
  process.exit(1); 
}


mongoose.set('bufferTimeoutMS', 30000);

const seedPermissionsSecurity = async () => {


    try {
        
        if(mongoose.connection.readyState !== 1){

            console.log('Conectando a la base de datos...');
            await mongoose.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }

        const permissionsSecurityToSeed : Array<IPermissionSecurity> = [

            {id : 'force_password_reset' , label : 'Forzar cambio de contraseña en próximo inicio de sesión' , can: false, permission: 'forzar_cambio_contraseña'},
            {id : 'two_factor_auth', label : 'Autenticación de dos factores', can: false, permission: 'autenticacion_factor'},
            {id : 'account_lock', label : 'Bloquear cuenta temporalmente', can: false, permission : 'bloquear_cuenta_temporalmente'},
        ]

        const validPermissionsSecurity: PermissionSecurityDto[] = [];
        const invalidPermissionsSecurity: any[] = [];

        for(const permission of permissionsSecurityToSeed){

            try {
                const validPermissionSecurity = permissionSecurityZodSchema.parse(permission) as PermissionSecurityDto;
                validPermissionsSecurity.push(validPermissionSecurity);
            } catch (error) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidPermissionsSecurity.push(permission);
            }
        }

        console.log(validPermissionsSecurity);


        if(invalidPermissionsSecurity.length > 0){

            console.warn('Los siguientes permisos no pasaron la validación y no se insertarán:', invalidPermissionsSecurity);
        }

        if(validPermissionsSecurity.length > 0){

            try {
                
                const count = await PermissionSecurityModel.countDocuments();
                console.log(`Encontrados ${count} permisos de seguridad existentes`);

                const deleteResult = await PermissionSecurityModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} permisos de seguridad existentes`);

                const insertResult = await PermissionSecurityModel.insertMany(validPermissionsSecurity);
                console.log(`Insertados ${insertResult.length} permisos de seguridad correctamente`);

            } catch (error) {
                console.error('Error al insertar permisos de seguridad en la base de datos:', error);
            }
        }
        else{

            console.log("No hay permisos válidos para insertar");
        }
        

    } catch (error) {
        console.error('Error durante el proceso de seed:', error);
    } finally{

        // Si deseas cerrar la conexión después de ejecutar el seed
        await mongoose.connection.close();
        console.log('Conexión a la base de datos cerrada');
    }

}


seedPermissionsSecurity().then(() => {
    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
})

