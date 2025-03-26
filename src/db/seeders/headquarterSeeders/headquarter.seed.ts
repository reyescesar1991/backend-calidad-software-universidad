import * as dotenv from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';
import { IHeadquarters } from '../../../core/types';
import { HeadquarterDto, headquarterSchemaZod } from '../../../validations';
import { HeadquartersModel } from '../../models';


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

const seedHeadquarter = async () =>  {


    try {
        

        if(mongoose.connection.readyState !== 1){

            console.log('Conectando a la base de datos...');
            await mongoose.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }


        const headquartersToSeed : Array<IHeadquarters> = [

            {
                idHeadquarter: 'CAR-HQ-01',
                label: 'Sede Principal Caracas',
                name: 'Oficina Central Metropolitana',
                address: 'Avenida Francisco de Miranda, Torre XYZ, Chacao',
                city: 'Caracas',
                state: 'Distrito Capital',
                zipCode: '1060',
                country: 'Venezuela',
                phoneNumber: '02122013456',
                email: 'caracas.principal@example.com',
                isActive: true,
              },
              {
                idHeadquarter: 'VAL-BR-02',
                label: 'Sucursal Valencia Norte',
                name: 'Centro de Operaciones Valencia',
                address: 'Avenida Bolívar Norte, Centro Comercial ABC, Local 15',
                city: 'Valencia',
                state: 'Carabobo',
                zipCode: '2001',
                country: 'Venezuela',
                phoneNumber: '02123057890',
                email: 'valencia.norte@example.com',
                isActive: true,
              },
              {
                idHeadquarter: 'MAR-AG-03',
                label: 'Agencia Maracaibo Centro',
                name: 'Unidad de Servicio Maracaibo',
                address: 'Avenida 5 de Julio, Edificio Plaza, Piso 2',
                city: 'Maracaibo',
                state: 'Zulia',
                zipCode: '4002',
                country: 'Venezuela',
                phoneNumber: '02124091234',
                email: 'maracaibo.centro@example.com',
                isActive: true,
              },
              {
                idHeadquarter: 'BAR-DP-04',
                label: 'Depósito Barquisimeto Industrial',
                name: 'Centro de Distribución Barquisimeto',
                address: 'Zona Industrial I, Calle Principal, Galpón 7',
                city: 'Barquisimeto',
                state: 'Lara',
                zipCode: '3002',
                country: 'Venezuela',
                phoneNumber: '02125035678',
                email: 'barquisimeto.industrial@example.com',
                isActive: false,
              }, 
        ]


        const validHeadquarters : HeadquarterDto[] = [];
        const invalidHeadquarters : any[] = [];

        for(const headquarter of headquartersToSeed){

            try {
                
                const validHeadquarter = headquarterSchemaZod.parse(headquarter) as HeadquarterDto;
                validHeadquarters.push(validHeadquarter);

            } catch (error) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidHeadquarters.push(headquarter);
            }
        }

        if(invalidHeadquarters.length > 0){

            console.warn('Las siguientes sedes no pasaron la validación y no se insertarán:', invalidHeadquarters);
        }

        if(validHeadquarters.length > 0){

            try {
                
                const count = await HeadquartersModel.countDocuments();
                console.log(`Encontradas ${count} sedes existentes`);

                const deleteResult = await HeadquartersModel.deleteMany({});
                console.log(`Eliminadas ${deleteResult.deletedCount} sedes existentes`);

                const insertResult = await HeadquartersModel.insertMany(validHeadquarters);
                console.log(`Insertadas ${insertResult.length} sedes correctamente`);

            } catch (error) {
                console.error('Error al insertar sedes en la base de datos:', error);
            }
        }
        else{

            console.log("No hay sedes válidas para insertar");
        }


    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    } finally{

        await mongoose.disconnect();
    }

}

seedHeadquarter().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {

    console.error('Error durante el proceso de seed:', error);
})