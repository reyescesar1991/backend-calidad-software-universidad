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
const validations_1 = require("../../../validations");
const models_1 = require("../../models");
const enums_1 = require("../../../core/enums");
dotenv.config({ path: (0, path_1.resolve)(process.cwd(), ".env") });
const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';
console.log(CONNECTION_STRING);
if (!CONNECTION_STRING) {
    console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
    process.exit(1);
}
mongoose_1.default.set('bufferTimeoutMS', 30000);
const seedCategoryProducts = async () => {
    try {
        if (mongoose_1.default.connection.readyState !== 1) {
            console.log("Conectando a la base de datos...");
            await mongoose_1.default.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }
        const categoriesProductsToSeed = [
            { idCategory: enums_1.CategoryProductEnum.FRUTAS, label: 'Frutas', name: 'Frutas', slug: 'frutas' },
            { idCategory: enums_1.CategoryProductEnum.VERDURAS, label: 'Verduras', name: 'Verduras', slug: 'verduras' },
            { idCategory: enums_1.CategoryProductEnum.LACTEOS, label: 'Lacteos', name: 'Lacteos', slug: 'lacteos' },
            { idCategory: enums_1.CategoryProductEnum.CARNES, label: 'Carnes', name: 'Carnes', slug: 'carnes' },
            { idCategory: enums_1.CategoryProductEnum.PANADERIA, label: 'Panaderia', name: 'Panaderia', slug: 'panaderia' },
            { idCategory: enums_1.CategoryProductEnum.BEBIDAS, label: 'Bebidas', name: 'Bebidas', slug: 'bebidas' },
            { idCategory: enums_1.CategoryProductEnum.CONGELADOS, label: 'Congelados', name: 'Congelados', slug: 'congelados' },
            { idCategory: enums_1.CategoryProductEnum.ENLATADOS, label: 'Enlatados', name: 'Enlatados', slug: 'enlatados' },
            { idCategory: enums_1.CategoryProductEnum.LIMPIEZA, label: 'Limpieza', name: 'Limpieza', slug: 'limpieza' },
            { idCategory: enums_1.CategoryProductEnum.OTROS, label: 'Otros', name: 'Otros', slug: 'otros' },
        ];
        const validCategoriesProducts = [];
        const invalidCategoriesProducts = [];
        for (const category of categoriesProductsToSeed) {
            try {
                const validCategory = validations_1.categoryProductZodSchema.parse(category);
                validCategoriesProducts.push(validCategory);
            }
            catch (error) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidCategoriesProducts.push(category);
            }
        }
        console.log(validCategoriesProducts);
        if (invalidCategoriesProducts.length > 0) {
            console.warn('Las siguientes categorias no pasaron la validación y no se insertarán:', invalidCategoriesProducts);
        }
        if (validCategoriesProducts.length > 0) {
            try {
                const count = await models_1.CategoryProductModel.countDocuments();
                console.log(`Encontradas ${count} categorias existentes`);
                const deleteResult = await models_1.CategoryProductModel.deleteMany({});
                console.log(`Eliminadas ${deleteResult.deletedCount} categorias existentes`);
                const insertResult = await models_1.CategoryProductModel.insertMany(validCategoriesProducts);
                console.log(`Insertadas ${insertResult.length} categorias correctamente`);
            }
            catch (error) {
                console.error('Error al insertar categorias en la base de datos:', error);
            }
        }
        else {
            console.log("No hay categorias válidas para insertar");
        }
    }
    catch (error) {
        console.error("❌ Error:", error.message);
        process.exit(1);
    }
    finally {
        await mongoose_1.default.disconnect();
    }
};
seedCategoryProducts().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=categoryProduct.seed.js.map