import * as dotenv from 'dotenv';
import {resolve} from 'path';
import mongoose from 'mongoose';
import { ISupplierType } from '../../../core/types';

dotenv.config({ path: resolve(process.cwd(), ".env") });

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';

console.log(CONNECTION_STRING);


if (!CONNECTION_STRING) {
  console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
  process.exit(1);
}


mongoose.set('bufferTimeoutMS', 30000);


const seedSuppliers = async () => {

    console.log('Proceso de seed completo');

    try {
        
        if(mongoose.connection.readyState !== 1){

            console.log('Conectando a la base de datos...');
            await mongoose.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }

        // const suppliersToSeed : Array<ISupplierType> = [

        //     {}
        // ]


    } catch (error) {
        
    }
}

seedSuppliers().then(() => {
    console.log('Proceso de seed completo');

})
.catch((error) => {

    console.error('Error durante el proceso de seed:', error);
})