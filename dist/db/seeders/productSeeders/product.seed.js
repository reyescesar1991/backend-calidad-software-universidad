"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = require("path");
const enums_1 = require("../../../core/enums");
const validations_1 = require("../../../validations");
const models_1 = require("../../models");
dotenv.config({ path: (0, path_1.resolve)(process.cwd(), ".env") });
const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';
console.log(CONNECTION_STRING);
if (!CONNECTION_STRING) {
    console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
    process.exit(1);
}
const productSeed = async () => {
    try {
        if (mongoose_1.default.connection.readyState !== 1) {
            console.log('Conectando a la base de datos...');
            await mongoose_1.default.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }
        const productsToSeed = [
            {
                idProduct: "PROD000001",
                name: "Manzana Roja",
                description: "Manzana roja fresca y crujiente.",
                sku: `FRU-MANZANAINC-12345678`,
                barcode: "12345678",
                categoryId: new mongoose_1.default.Types.ObjectId("67f53221794205960e288b6a"),
                supplierId: new mongoose_1.default.Types.ObjectId("67e701d40d06e2ab18b4172a"),
                brand: "Manzana Inc.",
                purchasePrice: 0.50,
                sellingPrice: 1.00,
                currency: enums_1.CurrencyEnum.DOLARES,
                minimumStockLevel: 20,
                maximumStockLevel: 200,
                unitOfMeasure: enums_1.UnitMeasureEnum.CAJA,
                imageUrl: "https://example.com/images/manzana.jpg",
                updatedAt: new Date(),
                isActive: true,
                notes: "Producto de temporada.",
                warehouseStock: [
                    {
                        warehouseId: new mongoose_1.default.Types.ObjectId("67f690a03ad8f43e09cec544"),
                        quantity: 2
                    },
                    {
                        warehouseId: new mongoose_1.default.Types.ObjectId("67f690a03ad8f43e09cec545"),
                        quantity: 1
                    }
                ],
            },
            {
                idProduct: "PROD000002",
                name: "Leche Entera",
                description: "Leche entera pasteurizada.",
                sku: `LAC-LACTEOSSA-87654321`,
                barcode: "87654321",
                categoryId: new mongoose_1.default.Types.ObjectId("67f53221794205960e288b6c"),
                supplierId: new mongoose_1.default.Types.ObjectId("67e701d40d06e2ab18b4172b"),
                brand: "Lacteos SA",
                purchasePrice: 1.00,
                sellingPrice: 1.50,
                currency: enums_1.CurrencyEnum.DOLARES,
                minimumStockLevel: 10,
                maximumStockLevel: 100,
                unitOfMeasure: enums_1.UnitMeasureEnum.CAJA,
                updatedAt: new Date(),
                isActive: true,
                warehouseStock: [{
                        warehouseId: new mongoose_1.default.Types.ObjectId("67f690a03ad8f43e09cec546"),
                        quantity: 2
                    }],
            },
            {
                idProduct: "PROD000003",
                name: "Pan Integral",
                description: "Pan integral recién horneado.",
                sku: `PAN-PANADERIAELMAIZ-11223344`,
                barcode: "11223344",
                categoryId: new mongoose_1.default.Types.ObjectId("67f53221794205960e288b6e"),
                supplierId: new mongoose_1.default.Types.ObjectId("67e701d40d06e2ab18b4172f"),
                brand: "Panadería El Maíz",
                purchasePrice: 0.75,
                sellingPrice: 1.25,
                currency: enums_1.CurrencyEnum.DOLARES,
                minimumStockLevel: 15,
                maximumStockLevel: 150,
                unitOfMeasure: enums_1.UnitMeasureEnum.UNIDAD,
                updatedAt: new Date(),
                isActive: true,
                warehouseStock: [{
                        warehouseId: new mongoose_1.default.Types.ObjectId("67f690a03ad8f43e09cec547"),
                        quantity: 3
                    }],
            },
            {
                idProduct: "PROD000004",
                name: "Filete de Res",
                description: "Filete de res de primera calidad.",
                sku: `CAR-CARNESDELNORTE-99887766`,
                barcode: "99887766",
                categoryId: new mongoose_1.default.Types.ObjectId("67f53221794205960e288b6d"),
                supplierId: new mongoose_1.default.Types.ObjectId("67e701d40d06e2ab18b4172d"),
                brand: "Carnes del Norte",
                purchasePrice: 8.00,
                sellingPrice: 12.00,
                currency: enums_1.CurrencyEnum.DOLARES,
                minimumStockLevel: 5,
                maximumStockLevel: 60,
                unitOfMeasure: enums_1.UnitMeasureEnum.CAJA,
                updatedAt: new Date(),
                isActive: true,
                warehouseStock: [
                    {
                        warehouseId: new mongoose_1.default.Types.ObjectId("67f690a03ad8f43e09cec544"),
                        quantity: 2
                    }
                ],
            },
            {
                idProduct: "PROD000005",
                name: "Agua Mineral",
                description: "Botella de agua mineral natural.",
                sku: `BEB-AGUAPURA-55667788`,
                barcode: "55667788",
                categoryId: new mongoose_1.default.Types.ObjectId("67f53221794205960e288b6f"),
                supplierId: new mongoose_1.default.Types.ObjectId("67e701d40d06e2ab18b41730"),
                brand: "Agua Pura",
                purchasePrice: 0.30,
                sellingPrice: 0.75,
                currency: enums_1.CurrencyEnum.DOLARES,
                minimumStockLevel: 40,
                maximumStockLevel: 400,
                unitOfMeasure: enums_1.UnitMeasureEnum.UNIDAD,
                updatedAt: new Date(),
                isActive: true,
                warehouseStock: [
                    {
                        warehouseId: new mongoose_1.default.Types.ObjectId("67f690a03ad8f43e09cec544"),
                        quantity: 2
                    },
                    {
                        warehouseId: new mongoose_1.default.Types.ObjectId("67f690a03ad8f43e09cec547"),
                        quantity: 3
                    }
                ],
            },
            {
                idProduct: "PROD000006",
                name: "Detergente Líquido",
                description: "Detergente líquido para ropa.",
                sku: `LIM-LIMPIEZATOTAL-22334455`,
                barcode: "22334455",
                categoryId: new mongoose_1.default.Types.ObjectId("67f53221794205960e288b72"),
                supplierId: new mongoose_1.default.Types.ObjectId("67e701d40d06e2ab18b41730"),
                brand: "Limpieza Total",
                purchasePrice: 2.00,
                sellingPrice: 3.50,
                currency: enums_1.CurrencyEnum.DOLARES,
                minimumStockLevel: 12,
                maximumStockLevel: 120,
                unitOfMeasure: enums_1.UnitMeasureEnum.UNIDAD,
                updatedAt: new Date(),
                isActive: true,
                warehouseStock: [
                    {
                        warehouseId: new mongoose_1.default.Types.ObjectId("67f690a03ad8f43e09cec545"),
                        quantity: 2
                    },
                    {
                        warehouseId: new mongoose_1.default.Types.ObjectId("67f690a03ad8f43e09cec544"),
                        quantity: 2
                    }
                ],
            },
        ];
        const validProducts = [];
        const invalidProducts = [];
        for (const product of productsToSeed) {
            try {
                const validProduct = validations_1.productSchemaZod.parse(product);
                validProducts.push(validProduct);
            }
            catch (error) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidProducts.push(product);
            }
        }
        if (invalidProducts.length > 0) {
            console.warn('Los siguientes roles no pasaron la validación y no se insertarán:', invalidProducts);
        }
        if (validProducts.length > 0) {
            try {
                const count = await models_1.ProductModel.countDocuments({});
                console.log(`Encontrados ${count} productos existentes`);
                const deleteResult = await models_1.ProductModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} productos existentes`);
                const insertResult = await models_1.ProductModel.insertMany(validProducts);
                console.log(`Insertados ${insertResult.length} productos correctamente`);
            }
            catch (error) {
                console.error('Error al insertar productos en la base de datos:', error);
            }
        }
        else {
            console.log("No hay productos válidos para insertar");
        }
    }
    catch (error) {
        console.error('Error durante el proceso de seed:', error);
    }
    finally {
        await mongoose_1.default.connection.close();
        console.log('Conexión a la base de datos cerrada');
    }
};
productSeed().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=product.seed.js.map