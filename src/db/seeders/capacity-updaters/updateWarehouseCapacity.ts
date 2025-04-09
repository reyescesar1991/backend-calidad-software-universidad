import * as dotenv from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';
import { ProductModel, WarehouseModel } from '../../models';


dotenv.config({ path: resolve(process.cwd(), ".env") });

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';

console.log(CONNECTION_STRING);

if (!CONNECTION_STRING) {
    console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
    process.exit(1);
}

const updateWarehouseCapacity = async () => {


    try {

        if (mongoose.connection.readyState !== 1) {

            console.log("Conectando a la base de datos...");
            await mongoose.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }

        const warehouses = await WarehouseModel.find({});

        console.log(warehouses);

        for (const warehouse of warehouses) {

            console.log(warehouse._id);


            const total = await ProductModel.aggregate([

                {$unwind : "$warehouseStock"},
                {$match : {"warehouseStock.warehouseId" : warehouse._id}},
                {$group : {_id : null, total : {$sum: "$warehouseStock.quantity"}}},
            ]);

            console.log(total);

            await WarehouseModel.updateOne(

                {_id: warehouse._id},
                {$set : {currentCapacity: total[0]?.total || 0}},
            );
        }
        console.log("Capacidades actualizadas!");


    } catch (error) {

    } finally{

        await mongoose.disconnect();
    }
};


updateWarehouseCapacity().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
        console.error('Error durante el proceso de seed:', error);
    });