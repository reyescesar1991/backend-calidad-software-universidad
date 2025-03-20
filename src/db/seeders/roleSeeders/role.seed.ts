import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import {resolve} from 'path';
import { IRoleType } from '../../../core/types';
import { RoleDto, roleSchema } from '../../../validations';

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
                new mongoose.Types.ObjectId("67d7372baa28bf0c74d743ea"),
                new mongoose.Types.ObjectId("67d7372baa28bf0c74d743ed"),
                new mongoose.Types.ObjectId("67d7372baa28bf0c74d743ef"),
            ]},
            {idRole: '02' , label : 'Supervisor de Inventario', name : 'Supervisor de Inventario', description : 'Supervisa inventarios', isActive : false, isDefault : false, permissions : [
                new mongoose.Types.ObjectId("67d7372baa28bf0c74d743ea"),
                new mongoose.Types.ObjectId("67d7372baa28bf0c74d743ed"),
                new mongoose.Types.ObjectId("67d7372baa28bf0c74d743ef"),
                new mongoose.Types.ObjectId("67d7372baa28bf0c74d743f2"), //reportes
                new mongoose.Types.ObjectId("67d7372baa28bf0c74d743f3"), //reportes
                new mongoose.Types.ObjectId("67d7372baa28bf0c74d743f1"), //reportes

            ]},
            {idRole: '03' , label : 'Gestor de Inventario', name : 'Gestor de Inventario', description : 'Gestiona el inventario', isActive : false, isDefault : false, permissions : [
                new mongoose.Types.ObjectId("67d7372baa28bf0c74d743ea"),
                new mongoose.Types.ObjectId("67d7372baa28bf0c74d743ed"),
                new mongoose.Types.ObjectId("67d7372baa28bf0c74d743ef"),
            ]},
            {idRole: '04' , label : 'Administrador de Inventario', name : 'Administrador de Inventario', description : 'Administra el inventario', isActive : false, isDefault : false, permissions : []},
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


    } catch (error) {
        
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