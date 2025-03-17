import * as dovtenv from 'dotenv';
import mongoose from 'mongoose';
import {resolve} from 'path';
import { IModuleType } from '../../../core/types';


dovtenv.config({path: resolve(process.cwd(), '.env')});

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';

console.log(CONNECTION_STRING);

if(!CONNECTION_STRING){
    console.error("ERROR: CONNECTION_STRING no esta definada en las variables de entorno");
    process.exit(1);
}

mongoose.set('bufferTimeoutMS', 30000);

const seedModules = async () => {

    try {
        
        if(mongoose.connection.readyState !== 1){

            console.log("Conectando a la base de datos...");
            await mongoose.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }

        
        const modulesToSeed : Array<IModuleType> = [

            {id: 'principal', title: 'Principal', routes: []}
        ]

        

    } catch (error) {
        
    }
}