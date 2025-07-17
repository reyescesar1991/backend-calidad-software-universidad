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
const dovtenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = require("path");
const models_1 = require("../../models");
const menu_validation_1 = require("../../../validations/menuValidators/menu.validation");
dovtenv.config({ path: (0, path_1.resolve)(process.cwd(), '.env') });
const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';
console.log(CONNECTION_STRING);
if (!CONNECTION_STRING) {
    console.error("ERROR: CONNECTION_STRING no esta definada en las variables de entorno");
    process.exit(1);
}
mongoose_1.default.set('bufferTimeoutMS', 30000);
const seedModules = async () => {
    try {
        if (mongoose_1.default.connection.readyState !== 1) {
            console.log("Conectando a la base de datos...");
            await mongoose_1.default.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }
        const existingRoutes = await models_1.RouteModel.find({});
        if (existingRoutes.length === 0) {
            throw new Error("❌ No hay rutas en la base de datos. Ejecuta primero el seed de routes.");
        }
        const modulesToSeed = [
            { id: 'home', title: 'Principal', routes: [] },
            { id: 'products', title: 'Productos', routes: [] },
            { id: 'inventory-management', title: 'Inventario', routes: [] },
            { id: 'general-reports', title: 'Reportes', routes: [] },
            { id: 'users', title: 'Administración', routes: [] },
        ];
        const modulesWithRoutes = modulesToSeed.map((module) => {
            const routes = existingRoutes.filter((route) => module.id === route.id);
            if (!routes) {
                throw new Error(`❌ Rutas no encontradas para el modulo "${module.id}"`);
            }
            const idRoutes = routes.map((route) => route._id);
            return {
                ...module,
                routes: idRoutes,
            };
        });
        console.log("Modulos con rutas asociadas: ", modulesWithRoutes);
        const validModules = [];
        const invalidModules = [];
        for (const module of modulesWithRoutes) {
            try {
                const validModule = menu_validation_1.moduleSchemaZod.parse(module);
                validModules.push(validModule);
            }
            catch (error) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidModules.push(module);
            }
        }
        console.log("Modulos validados con zod:", validModules);
        if (invalidModules.length > 0) {
            console.warn('Los siguientes rutas no pasaron la validación y no se insertarán:', invalidModules);
        }
        if (validModules.length > 0) {
            try {
                const count = await models_1.ModuleModel.countDocuments();
                console.log(`Encontrados ${count} modulos existentes`);
                const deleteResult = await models_1.ModuleModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} modulos existentes`);
                const insertResult = await models_1.ModuleModel.insertMany(validModules, { ordered: false });
                console.log(`Insertados ${insertResult.length} modulos correctamente`);
            }
            catch (error) {
                console.error('Error al insertar modulos en la base de datos:', error);
            }
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
seedModules().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=module.seed.js.map