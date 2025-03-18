import * as dovtenv from 'dotenv';
import mongoose from 'mongoose';
import {resolve} from 'path';
import { IModuleType } from '../../../core/types';
import { RouteModel } from '../../models';


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

        const existingRoutes = await RouteModel.find({});
        if(existingRoutes.length === 0){
            throw new Error("❌ No hay rutas en la base de datos. Ejecuta primero el seed de routes.");
        }
        
        const modulesToSeed  = [

            {id: 'home', title: 'Principal', route: {}},
            {id: 'products', title: 'Productos', route: {}},
            {id: 'inventory-management', title: 'Inventario', route: {}},
            {id: 'general-reports', title: 'Reportes', route: {}},
            {id: 'users', title: 'Administración', route: {}},
        ]

        const modulesWithRoutes = modulesToSeed.map((module) => {

            const route = existingRoutes.find((route) => module.id === route.id);

            if(!route){
                throw new Error(`❌ Modulo "${module.id}" no encontrado para ruta "${route.id}"`);
            }

            return{

                ...module,
                route : route._id
            }
        })

        console.log("Modulos con rutas asociadas: ", modulesWithRoutes);
        

        

    } catch (error) {
        
    }
}