import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import {resolve} from 'path';
import { IProductType } from '../../../core/types';
import { CurrencyEnum, UnitMeasureEnum } from '../../../core/enums';

dotenv.config({ path: resolve(process.cwd(), ".env") });

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';

console.log(CONNECTION_STRING);


if (!CONNECTION_STRING) {
    console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
    process.exit(1);
}

const productSeed = async () => {


    try {
        

        if(mongoose.connection.readyState !== 1){

            console.log('Conectando a la base de datos...');
            await mongoose.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }

        const productsToSeed : Array<IProductType> = [
            {
                idProduct: "PROD000001",
                name: "Manzana Roja",
                description: "Manzana roja fresca y crujiente.",
                sku: `FRU-MANZANAINC-12345678`,
                barcode: "12345678",
                categoryId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
                supplierId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
                brand: "Manzana Inc.",
                purchasePrice: 0.50,
                sellingPrice: 1.00,
                currency: CurrencyEnum.DOLARES,
                stockQuantity: 100,
                minimumStockLevel: 20,
                maximumStockLevel: 200,
                unitOfMeasure: UnitMeasureEnum.KILOGRAMO,
                imageUrl: "https://example.com/images/manzana.jpg",
                updatedAt: new Date(),
                isActive: true,
                notes: "Producto de temporada.",
                warehouseId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
              },
              {
                idProduct: "PROD000002",
                name: "Leche Entera",
                description: "Leche entera pasteurizada.",
                sku: `LAC-LACTEOSSA-87654321`,
                barcode: "87654321",
                categoryId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
                supplierId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
                brand: "Lacteos SA",
                purchasePrice: 1.00,
                sellingPrice: 1.50,
                currency: CurrencyEnum.DOLARES,
                stockQuantity: 50,
                minimumStockLevel: 10,
                maximumStockLevel: 100,
                unitOfMeasure: UnitMeasureEnum.LITRO,
                updatedAt: new Date(),
                isActive: true,
                warehouseId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
              },
              {
                idProduct: "PROD000003",
                name: "Pan Integral",
                description: "Pan integral recién horneado.",
                sku: `PAN-PANADERIAELMAIZ-11223344`,
                barcode: "11223344",
                categoryId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
                supplierId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
                brand: "Panadería El Maíz",
                purchasePrice: 0.75,
                sellingPrice: 1.25,
                currency: CurrencyEnum.DOLARES,
                stockQuantity: 75,
                minimumStockLevel: 15,
                maximumStockLevel: 150,
                unitOfMeasure: UnitMeasureEnum.UNIDAD,
                updatedAt: new Date(),
                isActive: true,
                warehouseId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
              },
              {
                idProduct: "PROD000004",
                name: "Filete de Res",
                description: "Filete de res de primera calidad.",
                sku: `CAR-CARNESDELNORTE-99887766`,
                barcode: "99887766",
                categoryId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
                supplierId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
                brand: "Carnes del Norte",
                purchasePrice: 8.00,
                sellingPrice: 12.00,
                currency: CurrencyEnum.DOLARES,
                stockQuantity: 30,
                minimumStockLevel: 5,
                maximumStockLevel: 60,
                unitOfMeasure: UnitMeasureEnum.KILOGRAMO,
                updatedAt: new Date(),
                isActive: true,
                warehouseId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
              },
              {
                idProduct: "PROD000005",
                name: "Agua Mineral",
                description: "Botella de agua mineral natural.",
                sku: `BEB-AGUAPURA-55667788`,
                barcode: "55667788",
                categoryId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
                supplierId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
                brand: "Agua Pura",
                purchasePrice: 0.30,
                sellingPrice: 0.75,
                currency: CurrencyEnum.DOLARES,
                stockQuantity: 200,
                minimumStockLevel: 40,
                maximumStockLevel: 400,
                unitOfMeasure: UnitMeasureEnum.UNIDAD,
                updatedAt: new Date(),
                isActive: true,
                warehouseId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
              },
              {
                idProduct: "PROD000006",
                name: "Detergente Líquido",
                description: "Detergente líquido para ropa.",
                sku: `LIM-LIMPIEZATOTAL-22334455`,
                barcode: "22334455",
                categoryId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
                supplierId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
                brand: "Limpieza Total",
                purchasePrice: 2.00,
                sellingPrice: 3.50,
                currency: CurrencyEnum.DOLARES,
                stockQuantity: 60,
                minimumStockLevel: 12,
                maximumStockLevel: 120,
                unitOfMeasure: UnitMeasureEnum.LITRO,
                updatedAt: new Date(),
                isActive: true,
                warehouseId: new mongoose.Types.ObjectId("67e3494794aef1393cd0256f"),
              },
        ]


    } catch (error) {
        
    }


};

productSeed().then(() => {

    console.log('Proceso de seed completo');
})
.catch((error) => {

    console.error('Error durante el proceso de seed:', error);
});