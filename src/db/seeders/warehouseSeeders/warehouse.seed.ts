import * as dotenv from 'dotenv';
import { resolve } from 'path';
import mongoose from 'mongoose';
import { IWarehouseType } from '../../../core/types';
import { cityMap } from '../../../core/maps';
import { WarehouseDto, warehouseSchemaZod } from '../../../validations';
import { WarehouseModel } from '../../models';

dotenv.config({ path: resolve(process.cwd(), ".env") });

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';

console.log(CONNECTION_STRING);


if (!CONNECTION_STRING) {
  console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
  process.exit(1);
}

const warehouseSeed = async () => {


  try {

    if (mongoose.connection.readyState !== 1) {

      console.log('Conectando a la base de datos...');
      await mongoose.connect(CONNECTION_STRING);
      console.log('Conexión a la base de datos establecida correctamente');
    }

    const warehouseToSeed: Array<IWarehouseType> = [

      {
        idWarehouse: `ALM-${cityMap.get("Caracas")}-001`,
        idHeadquarter: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
        name: "Almacén Principal Caracas",
        address: "Avenida Principal, Caracas",
        city: "Caracas",
        state: "Distrito Capital",
        country: "Venezuela",
        capacity: 150,
        isActive: true,
        contactPerson: "Juan Pérez",
        phoneNumber: "02125551234",
        email: "almacen.caracas@example.com",
        notes: "Almacén central de la capital.",
      },
      {
        idWarehouse: `ALM-${cityMap.get("Barquisimeto")}-002`,
        idHeadquarter: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
        name: "Almacén Oeste Barquisimeto",
        address: "Calle 42 con Carrera 15, Barquisimeto",
        city: "Barquisimeto",
        state: "Lara",
        country: "Venezuela",
        capacity: 120,
        isActive: true,
        contactPerson: "María Rodríguez",
        phoneNumber: "02125555678", // Aunque el código es 0212, para este ejemplo se mantiene
        email: "almacen.barquisimeto@example.com",
        notes: "Almacén para la zona oeste de la ciudad.",
      },
      {
        idWarehouse: `ALM-${cityMap.get("Valencia")}-003`,
        idHeadquarter: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
        name: "Almacén Industrial Valencia",
        address: "Zona Industrial Norte, Valencia",
        city: "Valencia",
        state: "Carabobo",
        country: "Venezuela",
        capacity: 200,
        isActive: true,
        contactPerson: "Carlos López",
        phoneNumber: "02125559012", // Aunque el código es 0212, para este ejemplo se mantiene
        email: "almacen.valencia@example.com",
        notes: "Almacén para productos industriales.",
      },
      {
        idWarehouse: `ALM-${cityMap.get("Maracaibo")}-004`,
        idHeadquarter: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
        name: "Almacén Sur Maracaibo",
        address: "Avenida Don Manuel Belloso, Maracaibo",
        city: "Maracaibo",
        state: "Zulia",
        country: "Venezuela",
        capacity: 180,
        isActive: true,
        contactPerson: "Sofía Vargas",
        phoneNumber: "02125553456", // Aunque el código es 0212, para este ejemplo se mantiene
        email: "almacen.maracaibo@example.com",
        notes: "Almacén ubicado en la zona sur.",
      },
    ]

    const validWarehouses: WarehouseDto[] = [];
    const invalidWarehouses: any[] = [];

    for (const warehouse of warehouseToSeed) {

      try {

        const validWarehouse = warehouseSchemaZod.parse(warehouse);
        validWarehouses.push(validWarehouse);

      } catch (error) {

        console.error('Error de validación en el seeder:', error.issues);
        invalidWarehouses.push(warehouse);

      }
    }

    if (invalidWarehouses.length > 0) {

      console.warn('Los siguientes almacenes no pasaron la validación y no se insertarán:', invalidWarehouses);
    }

    if (validWarehouses.length > 0) {

      try {

        const count = await WarehouseModel.countDocuments({});
        console.log(`Encontrados ${count} almacenes existentes`);

        const deleteResult = await WarehouseModel.deleteMany({});
        console.log(`Eliminados ${deleteResult.deletedCount} almacenes existentes`);

        const insertResult = await WarehouseModel.insertMany(validWarehouses);
        console.log(`Insertados ${insertResult.length} almacenes correctamente`);

      } catch (error) {

        console.error('Error al insertar almacenes en la base de datos:', error);
      }
    }
    else {

      console.log("No hay almacenes válidos para insertar");
    }

  } catch (error) {
    console.error('Error durante el proceso de seed:', error);
  } finally {

    await mongoose.connection.close();
    console.log('Conexión a la base de datos cerrada');
  }

};

warehouseSeed().then(() => {

  console.log('Proceso de seed completo');
})
  .catch((error) => {

    console.error('Error durante el proceso de seed:', error);
  })