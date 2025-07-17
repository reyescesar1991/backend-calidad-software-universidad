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
const validations_1 = require("../../../validations");
const models_1 = require("../../models");
dovtenv.config({ path: (0, path_1.resolve)(process.cwd(), '.env') });
const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';
console.log(CONNECTION_STRING);
if (!CONNECTION_STRING) {
    console.error("ERROR: CONNECTION_STRING no esta definada en las variables de entorno");
    process.exit(1);
}
mongoose_1.default.set('bufferTimeoutMS', 30000);
const seedRoutes = async () => {
    try {
        if (mongoose_1.default.connection.readyState !== 1) {
            console.log("Conectando a la base de datos...");
            await mongoose_1.default.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }
        const existingSubRoutes = await models_1.SubrouteModel.find({});
        if (existingSubRoutes.length === 0) {
            throw new Error("❌ No hay subrutas en la base de datos. Ejecuta primero el seed de subrutas.");
        }
        const routesToSeed = [
            { id: 'home', name: 'Inicio', path: '/dashBoard/inicio', icon: 'home-icon', active: true, subroutes: [] },
            { id: 'products', name: 'Productos', path: '/dashBoard/productos', icon: 'products-icon', active: false, subroutes: [] },
            { id: 'inventory-management', name: 'Gestión de Stock', path: '/dashBoard/inventario', icon: 'inventory-icon', active: false, subroutes: [] },
            { id: 'general-reports', name: 'Reportes', path: '/dashBoard/reportes', icon: 'reports-icon', active: false, subroutes: [] },
            { id: 'users', name: 'Usuarios', path: '/dashBoard/usuarios', icon: 'users-icon', active: false, subroutes: [] },
        ];
        const routesWithSubroutes = routesToSeed.map((route) => {
            const subroutes = existingSubRoutes.filter((subroute) => subroute.mainRoute === route.id);
            if (!subroutes) {
                throw new Error(`❌ Subrutas no encontrada para ruta "${route.id}"`);
            }
            // console.log(`Subrutas de ${route.id}"`, subroutes);
            const idSubRoutes = subroutes.map((subroute) => subroute._id);
            // console.log(`Subrutas de ${route.id}"`, idSubRoutes);
            return {
                ...route,
                subroutes: idSubRoutes,
            };
        });
        console.log(`Rutas con subrutas`, routesWithSubroutes);
        const validRoutes = [];
        const invalidRoutes = [];
        for (const route of routesWithSubroutes) {
            try {
                const validRoute = validations_1.routeSchemaZod.parse(route);
                validRoutes.push(validRoute);
            }
            catch (error) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidRoutes.push(route);
            }
        }
        console.log("Rutas con subrutas validas:", validRoutes);
        if (invalidRoutes.length > 0) {
            console.warn('Los siguientes rutas no pasaron la validación y no se insertarán:', invalidRoutes);
        }
        if (validRoutes.length > 0) {
            try {
                const count = await models_1.RouteModel.countDocuments();
                console.log(`Encontradas ${count} rutas existentes`);
                const deleteResult = await models_1.RouteModel.deleteMany({});
                console.log(`Eliminadas ${deleteResult.deletedCount} rutas existentes`);
                const insertResult = await models_1.RouteModel.insertMany(validRoutes, { ordered: false });
                console.log(`Insertadas ${insertResult.length} rutas correctamente`);
            }
            catch (error) {
                console.error('Error al insertar rutas en la base de datos:', error);
            }
        }
        else {
            console.log("No hay rutas válidas para insertar");
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
seedRoutes()
    .then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=route.seed.js.map