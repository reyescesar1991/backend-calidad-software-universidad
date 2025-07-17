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
const path_1 = require("path");
const mongoose_1 = __importDefault(require("mongoose"));
const maps_1 = require("../../../core/maps");
const validations_1 = require("../../../validations");
const models_1 = require("../../models");
dotenv.config({ path: (0, path_1.resolve)(process.cwd(), ".env") });
const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';
console.log(CONNECTION_STRING);
if (!CONNECTION_STRING) {
    console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
    process.exit(1);
}
const warehouseSeed = async () => {
    try {
        if (mongoose_1.default.connection.readyState !== 1) {
            console.log('Conectando a la base de datos...');
            await mongoose_1.default.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }
        const warehouseToSeed = [
            {
                idWarehouse: `ALM-${maps_1.cityMap.get("Caracas")}-001`,
                idHeadquarter: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd0256f"),
                name: "Almacén Principal Caracas",
                address: "Avenida Principal, Caracas",
                city: "Caracas",
                state: "Distrito Capital",
                country: "Venezuela",
                capacity: 150,
                currentCapacity: 0,
                isActive: true,
                contactPerson: "Juan Pérez",
                phoneNumber: "02125551234",
                email: "almacen.caracas@example.com",
                notes: "Almacén central de la capital.",
            },
            {
                idWarehouse: `ALM-${maps_1.cityMap.get("Barquisimeto")}-002`,
                idHeadquarter: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02572"),
                name: "Almacén Oeste Barquisimeto",
                address: "Calle 42 con Carrera 15, Barquisimeto",
                city: "Barquisimeto",
                state: "Lara",
                country: "Venezuela",
                capacity: 120,
                currentCapacity: 0,
                isActive: true,
                contactPerson: "María Rodríguez",
                phoneNumber: "02125555678",
                email: "almacen.barquisimeto@example.com",
                notes: "Almacén para la zona oeste de la ciudad.",
            },
            {
                idWarehouse: `ALM-${maps_1.cityMap.get("Valencia")}-003`,
                idHeadquarter: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02570"),
                name: "Almacén Industrial Valencia",
                address: "Zona Industrial Norte, Valencia",
                city: "Valencia",
                state: "Carabobo",
                country: "Venezuela",
                capacity: 200,
                currentCapacity: 0,
                isActive: true,
                contactPerson: "Carlos López",
                phoneNumber: "02125559012",
                email: "almacen.valencia@example.com",
                notes: "Almacén para productos industriales.",
            },
            {
                idWarehouse: `ALM-${maps_1.cityMap.get("Maracaibo")}-004`,
                idHeadquarter: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02571"),
                name: "Almacén Sur Maracaibo",
                address: "Avenida Don Manuel Belloso, Maracaibo",
                city: "Maracaibo",
                state: "Zulia",
                country: "Venezuela",
                capacity: 180,
                currentCapacity: 0,
                isActive: true,
                contactPerson: "Sofía Vargas",
                phoneNumber: "02125553456",
                email: "almacen.maracaibo@example.com",
                notes: "Almacén ubicado en la zona sur.",
            },
        ];
        const validWarehouses = [];
        const invalidWarehouses = [];
        console.log(warehouseToSeed);
        for (const warehouse of warehouseToSeed) {
            try {
                const validWarehouse = validations_1.warehouseSchemaZod.parse(warehouse);
                validWarehouses.push(validWarehouse);
            }
            catch (error) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidWarehouses.push(warehouse);
            }
        }
        if (invalidWarehouses.length > 0) {
            console.warn('Los siguientes almacenes no pasaron la validación y no se insertarán:', invalidWarehouses);
        }
        if (validWarehouses.length > 0) {
            try {
                const count = await models_1.WarehouseModel.countDocuments({});
                console.log(`Encontrados ${count} almacenes existentes`);
                const deleteResult = await models_1.WarehouseModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} almacenes existentes`);
                const insertResult = await models_1.WarehouseModel.insertMany(validWarehouses);
                console.log(`Insertados ${insertResult.length} almacenes correctamente`);
            }
            catch (error) {
                console.error('Error al insertar almacenes en la base de datos:', error);
            }
        }
        else {
            console.log("No hay almacenes válidos para insertar");
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
warehouseSeed().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=warehouse.seed.js.map