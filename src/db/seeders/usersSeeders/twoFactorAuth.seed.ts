import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import {resolve} from 'path';
import { ITwoFactorAuthType } from '../../../core/types';
import { TwoFactorAuthDto, twoFactorAuthSchemaZod } from '../../../validations';
import { TwoFactorAuthModel } from '../../models';

dotenv.config({ path: resolve(process.cwd(), ".env") });

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';

console.log(CONNECTION_STRING);


if (!CONNECTION_STRING) {
  console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
  process.exit(1);
}


mongoose.set('bufferTimeoutMS', 30000);

const seedTwoFactorAuth = async () => {

    try {
        

        if(mongoose.connection.readyState !== 1){

            console.log('Conectando a la base de datos...');
            await mongoose.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }

        const twoFactorAuthToSeed : Array<ITwoFactorAuthType> = [

            {method : 'sms' , isEnabled : true, quantityUsers : 0},
            {method : 'email', isEnabled : true, quantityUsers : 0},
        ];

        const validsTwoFactorAuth : TwoFactorAuthDto[] = [];
        const invalidTwoFactorAuth : any[] = [];

        for(const twoFactor of twoFactorAuthToSeed){

            try {
                
                const validTwoFactor = twoFactorAuthSchemaZod.parse(twoFactor);
                validsTwoFactorAuth.push(validTwoFactor);

            } catch (error) {
                
                console.error('Error de validación en el seeder:', error.issues);
                invalidTwoFactorAuth.push(twoFactor);
            }
        }

        if(invalidTwoFactorAuth.length > 0){

            console.warn('Los siguientes factores no pasaron la validación y no se insertarán:', invalidTwoFactorAuth);
        }

        if(validsTwoFactorAuth.length > 0){

            try {
                
                const count = await TwoFactorAuthModel.countDocuments();
                console.log(`Encontrados ${count} factores existentes`);

                const deleteResult = await TwoFactorAuthModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} factores existentes`);

                const insertResult = await TwoFactorAuthModel.insertMany(validsTwoFactorAuth);
                console.log(`Insertados ${insertResult.length} factores correctamente`);

            } catch (error) {
                console.error('Error al insertar factores de autenticación en la base de datos:', error);
            }
        }
        else{

            console.log("No hay factores de autenticación válidos para insertar");
        }


    } catch (error) {
        console.error('Error durante el proceso de seed:', error);
    } finally {

        await mongoose.connection.close();
        console.log('Conexión a la base de datos cerrada');
    }
};

seedTwoFactorAuth().then(() => {
    console.log('Proceso de seed completo');
})
.catch((error) => {
    console.error('Error durante el proceso de seed:', error);
})