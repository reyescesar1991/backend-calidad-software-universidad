import * as dotenv from 'dotenv';
import {resolve} from 'path';
import mongoose from 'mongoose';
import { IPaymentTermType } from '../../../core/types';
import { PaymentTermDto, paymentTermSchemaZod } from '../../../validations';
import { PaymentTermModel } from '../../models';

dotenv.config({ path: resolve(process.cwd(), ".env") });

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';

console.log(CONNECTION_STRING);


if (!CONNECTION_STRING) {
  console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
  process.exit(1);
}

const paymentTermsSeed = async () => {


    try {
        
        if(mongoose.connection.readyState !== 1){

            console.log('Conectando a la base de datos...');
            await mongoose.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }


        const paymentTermsToSeed : Array<IPaymentTermType> = [

            {
                id: 'CONTADO',
                name: 'Contado',
                description: 'Pago inmediato al momento de la compra o recepción del servicio.',
                daysToPay: 0,
                discount: 0,
                isActive: true,
              },
              {
                id: 'CREDITO30',
                name: 'Crédito 30 días',
                description: 'El pago debe realizarse dentro de los 30 días siguientes a la fecha de la factura.',
                daysToPay: 30,
                discount: 0,
                isActive: true,
              },
              {
                id: 'CREDITO60',
                name: 'Crédito 60 días',
                description: 'El pago debe realizarse dentro de los 60 días siguientes a la fecha de la factura.',
                daysToPay: 60,
                discount: 0,
                isActive: true,
              },
              {
                id: 'PAGO_CONTRA_ENTREGA',
                name: 'Pago Contra Entrega',
                description: 'El pago se realiza al momento de recibir los productos o la finalización del servicio.',
                daysToPay: 0,
                discount: 0,
                isActive: true,
              },
              {
                id: 'PRONTO_PAGO_10',
                name: 'Pronto Pago 10 días (2% Descuento)',
                description: 'Se ofrece un descuento del 2% si el pago se realiza dentro de los 10 días siguientes a la fecha de la factura.',
                daysToPay: 10,
                discount: 2,
                isActive: true,
              },
              {
                id: 'CREDITO45',
                name: 'Crédito 45 días',
                description: 'El pago debe realizarse dentro de los 45 días siguientes a la fecha de la factura.',
                daysToPay: 45,
                isActive: true,
              },
        ]

        const validPaymentTerms : PaymentTermDto[] = [];
        const invalidPaymentTerms : any[] = [];

        for(const paymentTerm of paymentTermsToSeed){

            try {
                
                const validPaymentTerm = paymentTermSchemaZod.parse(paymentTerm);
                validPaymentTerms.push(validPaymentTerm);
                

            } catch (error) {

                console.error('Error de validación en el seeder:', error.issues);
                invalidPaymentTerms.push(paymentTerm);
                
            }
        }

        if(invalidPaymentTerms.length > 0){

            console.warn('Los siguientes términos de pago no pasaron la validación y no se insertarán:', invalidPaymentTerms);
        }

        if(validPaymentTerms.length > 0){

            try {
                
                const count = await PaymentTermModel.countDocuments();
                console.log(`Encontrados ${count} términos de pago existentes`);

                const deleteResult = await PaymentTermModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} términos de pago existentes`);

                const insertResult = await PaymentTermModel.insertMany(validPaymentTerms);
                console.log(`Insertados ${insertResult.length} términos de pago correctamente`);

            } catch (error) {
                console.error('Error al insertar términos de pago en la base de datos:', error);
            }
        }
        else{

            console.log("No hay términos de pago válidos para insertar");
        }


    } catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    } finally {

        await mongoose.disconnect();
    }


}

paymentTermsSeed().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {

    console.error('Error durante el proceso de seed:', error);
});