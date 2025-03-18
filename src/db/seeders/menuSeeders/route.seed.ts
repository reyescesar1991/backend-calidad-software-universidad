import * as dovtenv from 'dotenv';
import mongoose from 'mongoose';
import {resolve} from 'path';
import { IRouteType } from '../../../core/types';
import { RouteDto, routeSchemaZod } from '../../../validations';
import { RouteModel, SubrouteModel } from '../../models';


dovtenv.config({path: resolve(process.cwd(), '.env')});

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';

console.log(CONNECTION_STRING);

if(!CONNECTION_STRING){
    console.error("ERROR: CONNECTION_STRING no esta definada en las variables de entorno");
    process.exit(1);
}

mongoose.set('bufferTimeoutMS', 30000);

const seedRoutes = async () => {

    try {
        
        if(mongoose.connection.readyState !== 1){

            console.log("Conectando a la base de datos...");
            await mongoose.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }


        const existingSubRoutes = await SubrouteModel.find({});
        if(existingSubRoutes.length === 0){
            throw new Error("❌ No hay subrutas en la base de datos. Ejecuta primero el seed de subrutas.");
        }

        
        const routesToSeed : Array<IRouteType> = [

            {id: 'home', name: 'Inicio', path: '/dashBoard/inicio', icon:'home-icon', active: true, subroutes : []},
            {id: 'products', name: 'Productos', path: '/dashBoard/productos', icon: 'products-icon', active: false, subroutes : []},
            {id: 'inventory-management', name: 'Gestión de Stock', path: '/dashBoard/inventario', icon: 'inventory-icon', active: false, subroutes: []},
            {id: 'general-reports', name: 'Reportes', path: '/dashBoard/reportes', icon: 'reports-icon', active: false, subroutes: []},
            {id: 'users', name: 'Usuarios', path: '/dashBoard/usuarios', icon: 'users-icon', active: false, subroutes: []},

        ]


        const routesWithSubroutes = routesToSeed.map((route) => {

            const subroutes = existingSubRoutes.filter((subroute) => subroute.mainRoute === route.id);

            if(!subroutes){
                throw new Error(`❌ Subrutas no encontrada para ruta "${route.id}"`);
            }

            // console.log(`Subrutas de ${route.id}"`, subroutes);

            const idSubRoutes = subroutes.map((subroute) => subroute._id);

            // console.log(`Subrutas de ${route.id}"`, idSubRoutes);

            return{

                ...route,
                subroutes : idSubRoutes,
            }
            
        });

        console.log(`Rutas con subrutas`, routesWithSubroutes);

        const validRoutes: RouteDto[] = [];
        const invalidRoutes: any[] = [];

        // for(const route of routesToSeed){

        //    try {
            
        //     const validRoute = routeSchemaZod.parse(route) as RouteDto;
        //     validRoutes.push(validRoute); 

        //    } catch (error) {
            
        //     console.error('Error de validación en el seeder:', error.issues);
        //     invalidRoutes.push(route);
            
        //    } 
        // }

        // if (invalidRoutes.length > 0) {
        //     console.warn('Los siguientes rutas no pasaron la validación y no se insertarán:', invalidRoutes);
        // }

        // if(validRoutes.length > 0){

        //     try {
                
        //         const count = await RouteModel.countDocuments();
        //         console.log(`Encontradas ${count} rutas existentes`);

        //         const deleteResult = await RouteModel.deleteMany({});
        //         console.log(`Eliminadas ${deleteResult.deletedCount} rutas existentes`);

        //         const insertResult = await RouteModel.insertMany(validRoutes, {ordered:false});
        //         console.log(`Insertadas ${insertResult.length} rutas correctamente`);

        //     } catch (error) {
        //         console.error('Error al insertar rutas en la base de datos:', error);
        //     }
        // }else{

        //     console.log("No hay rutas válidas para insertar");
        // }
        

    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }finally {

        await mongoose.disconnect();
    }
    
}

seedRoutes()
  .then(() => {

    console.log('Proceso de seed completo');
  })
  .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
  });
