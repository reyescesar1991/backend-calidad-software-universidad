import * as dovtenv from 'dotenv';
import mongoose from 'mongoose';
import {resolve} from 'path';
import { IModuleType } from '../../../core/types';
import { ModuleModel, RouteModel } from '../../models';
import { ModuleDto, moduleSchemaZod } from '../../../validations/menuValidators/menu.validation';


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
        
        const modulesToSeed : Array<IModuleType> = [

            {id: 'home', title: 'Principal', routes: []},
            {id: 'products', title: 'Productos', routes: []},
            {id: 'inventory-management', title: 'Inventario', routes: []},
            {id: 'general-reports', title: 'Reportes', routes: []},
            {id: 'users', title: 'Administración', routes: []},
        ]

        const modulesWithRoutes = modulesToSeed.map((module) => {

            const routes = existingRoutes.filter((route) => module.id === route.id);

            if(!routes){
                throw new Error(`❌ Rutas no encontradas para el modulo "${module.id}"`);
            }

            const idRoutes = routes.map((route) => route._id);

            return{

                ...module,
                routes: idRoutes,
            }
            
        });

        console.log("Modulos con rutas asociadas: ", modulesWithRoutes);
        

        const validModules: ModuleDto[] = [];
        const invalidModules: any[] = [];

        for(const module of modulesWithRoutes){

            try {
                const validModule = moduleSchemaZod.parse(module) as ModuleDto;
                validModules.push(validModule);
            } catch (error) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidModules.push(module);
            }
        }

        console.log("Modulos validados con zod:", validModules);

        if (invalidModules.length > 0) {
            console.warn('Los siguientes rutas no pasaron la validación y no se insertarán:', invalidModules);
        }

        if(validModules.length > 0){

            try {
                const count = await ModuleModel.countDocuments();
                console.log(`Encontrados ${count} modulos existentes`);

                const deleteResult = await ModuleModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} modulos existentes`);

                const insertResult = await ModuleModel.insertMany(validModules, {ordered:false});
                console.log(`Insertados ${insertResult.length} modulos correctamente`);

            } catch (error) {
                console.error('Error al insertar modulos en la base de datos:', error);
            }
        }
        
        

    } catch (error) {
        
        console.error("❌ Error:", error.message);
        process.exit(1);
    }finally {

        await mongoose.disconnect();
    }
}

seedModules().then(
    () => {

        console.log('Proceso de seed completo');
    }
)
.catch(
    (error) => {
        console.error('Error durante el proceso de seed:', error);
    }
)