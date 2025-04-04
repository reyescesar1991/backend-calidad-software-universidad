import * as dotenv from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';
import { IRoleConfigType } from '../../../core/types';
import { RoleConfigDto, roleConfigSchemaZod } from '../../../validations';
import { RoleConfigModel } from '../../models';



dotenv.config({ path: resolve(process.cwd(), ".env") });

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';

console.log(CONNECTION_STRING);


if (!CONNECTION_STRING) {
    console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
    process.exit(1);
}

const seedRoleConfig = async () => {


    try {


        if (mongoose.connection.readyState !== 1) {

            console.log('Conectando a la base de datos...');
            await mongoose.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }

        const roleConfigToSeed: Array<IRoleConfigType> = [

            {
                rolID: new mongoose.Types.ObjectId("67e97e656da3a23c453b6b1d"),
                maxLoginAttempts: 3,
                rolName : "Empleado de Almacen"
            },
            {
                rolID: new mongoose.Types.ObjectId("67e97e656da3a23c453b6b1e"),
                maxLoginAttempts: 3,
                rolName : "Supervisor de Inventario"
            },
            {
                rolID: new mongoose.Types.ObjectId("67e97e656da3a23c453b6b1f"),
                maxLoginAttempts: 3,
                rolName : "Gestor de Inventario"
            },
            {
                rolID: new mongoose.Types.ObjectId("67e97e656da3a23c453b6b20"),
                maxLoginAttempts: 5,
                rolName : "Administrador"
            },
        ];

        const validRolesConfig: RoleConfigDto[] = [];
        const invalidRolesConfig: any[] = [];

        for (const roleConfig of roleConfigToSeed) {

            try {

                const validRoleConfig = roleConfigSchemaZod.parse(roleConfig);
                validRolesConfig.push(validRoleConfig);

            } catch (error) {

                console.error('Error de validación en el seeder:', error.issues);
                invalidRolesConfig.push(roleConfig);
            }
        }

        if (invalidRolesConfig.length > 0) {

            console.warn('Las siguientes configuraciones de rol no pasaron la validación y no se insertarán:', invalidRolesConfig);
        }

        if (validRolesConfig.length > 0) {

            try {

                const count = await RoleConfigModel.countDocuments({});
                console.log(`Encontradas ${count} configuraciones de rol existentes`);

                const deleteResult = await RoleConfigModel.deleteMany({});
                console.log(`Eliminadas ${deleteResult.deletedCount} configuraciones de rol existentes`);

                const insertResult = await RoleConfigModel.insertMany(validRolesConfig);
                console.log(`Insertadas ${insertResult.length} configuraciones de rol correctamente`);

            } catch (error) {
                console.error('Error al insertar configuraciones de rol en la base de datos:', error);
            }

        } else {

            console.log("No hay configuraciones de rol válidas para insertar");
        }


    } catch (error) {
        console.error('Error durante el proceso de seed:', error);
    } finally {

        await mongoose.connection.close();
        console.log('Conexión a la base de datos cerrada');
    }

}

seedRoleConfig().then(() => {

    console.log('Proceso de seed completo');
})
    .catch((error) => {

        console.error('Error durante el proceso de seed:', error);
    })