import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import {resolve} from 'path';
import { RoleDto, roleSchema } from '../../../validations';
import { RoleModel } from '../../models';

// Carga las variables de entorno explícitamente para el seeder
// Process.cwd carga la ruta /backend-calidad y luego la une con .env para traer el URI
dotenv.config({ path: resolve(process.cwd(), ".env") });

// Ahora usa la variable de entorno, con un fallback para desarrollo local
const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';

console.log(CONNECTION_STRING);


if (!CONNECTION_STRING) {
  console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
  process.exit(1);
}


mongoose.set('bufferTimeoutMS', 30000);

const seedRoles = async () => {

    try {
        

        if(mongoose.connection.readyState !== 1){

            console.log('Conectando a la base de datos...');
            await mongoose.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
            
        }


        const rolesToSeed  = [

            {idRole: '01' , label : 'Empleado de Almacén', name : 'Empleado de Almacen', description : 'Trabaja en almacenes', isActive : false, isDefault : true, permissions : [
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba51"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba54"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba52"),
            ]},
            {idRole: '02' , label : 'Supervisor de Inventario', name : 'Supervisor de Inventario', description : 'Supervisa inventarios', isActive : false, isDefault : false, permissions : [
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba51"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba54"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba52"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba58"), //reportes
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba59"), //reportes
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba5a"), //reportes

            ]},
            {idRole: '03' , label : 'Gestor de Inventario', name : 'Gestor de Inventario', description : 'Gestiona el inventario', isActive : false, isDefault : false, permissions : [
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba51"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba54"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba52"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba58"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba59"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba5a"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba53"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba55"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba56"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba57"),

            ]},
            {idRole: '04' , label : 'Administrador', name : 'Administrador', description : 'Administrador general', isActive : false, isDefault : false, permissions : [

                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba51"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba54"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba52"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba58"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba59"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba5a"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba53"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba55"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba56"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba57"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba5b"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba5c"),
                new mongoose.Types.ObjectId("67f7f3a2c8e38dcebedeba5d"),
            ],

            permissionsSecurity : [

                new mongoose.Types.ObjectId("67f7f5b8c9604dfe14db3d51"),
                new mongoose.Types.ObjectId("67f7f5b8c9604dfe14db3d52"),
                new mongoose.Types.ObjectId("67f7f5b8c9604dfe14db3d53"),
            ]
        },
        ]


        const validRoles: RoleDto[] = [];
        const invalidRoles: any[] = [];

        for(const role of rolesToSeed){

            try {
                const validateRole = roleSchema.parse(role);
                validRoles.push(validateRole);

            } catch (error : any) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidRoles.push(role);
            }
        }

        console.log(validRoles);
        

        if(invalidRoles.length > 0){

            console.warn('Los siguientes roles no pasaron la validación y no se insertarán:', invalidRoles);
        }

        if(validRoles.length > 0){

            try {
                const count = await RoleModel.countDocuments();
                console.log(`Encontrados ${count} roles existentes`);

                const deleteResult = await RoleModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} roles existentes`);

                const insertResult = await RoleModel.insertMany(validRoles);
                console.log(`Insertados ${insertResult.length} permisos correctamente`);
            } catch (error) {
                console.error('Error al insertar permisos en la base de datos:', error);
            }
        }
        else{

            console.log("No hay permisos válidos para insertar");
        }


        // Obtener los ObjectIds del rol
// const rol = await RoleModel.findOne({ idRole: "02" });
// const permisosIds = rol?.permissions || [];

// // Consultar los permisos asociados
// const permisos = await PermissionModel.find({
//   _id: { $in: permisosIds },
// });

// // Extraer labels
// const labels = permisos.map((p) => p.label);
// console.log(labels);


    } catch (error) {
        console.error('Error durante el proceso de seed:', error);
    }
    finally{

        await mongoose.connection.close();
        console.log('Conexión a la base de datos cerrada');
    }

}

seedRoles().then(() => {

    console.log('Proceso de seed completo');
    // Comenta estas líneas si no quieres cerrar la conexión automáticamente
    // return mongoose.connection.close();
})
.catch((error) => {

    console.error('Error durante el proceso de seed:', error);
    // return mongoose.connection.close();
})