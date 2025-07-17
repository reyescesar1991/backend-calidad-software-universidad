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
const path_1 = require("path");
const dotenv = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../../models");
const validations_1 = require("../../../validations");
// Carga las variables de entorno explícitamente para el seeder
// Process.cwd carga la ruta /backend-calidad y luego la une con .env para traer el URI
dotenv.config({ path: (0, path_1.resolve)(process.cwd(), ".env") });
// Ahora usa la variable de entorno, con un fallback para desarrollo local
const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';
console.log(CONNECTION_STRING);
if (!CONNECTION_STRING) {
    console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
    process.exit(1);
}
mongoose_1.default.set('bufferTimeoutMS', 30000);
const seedSubroutes = async () => {
    try {
        if (mongoose_1.default.connection.readyState !== 1) {
            console.log("Conectando a la base de datos...");
            await mongoose_1.default.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }
        //Obtenemos las rutas en bases de datos
        const existingRoutes = await models_1.RouteModel.find({});
        if (existingRoutes.length === 0) {
            throw new Error("❌ No hay permisos en la base de datos. Ejecuta primero el seed de routes.");
        }
        // console.log("Rutas existentes: ", existingRoutes);
        //Obtenemos los permisos en base de datos
        const existingPermissions = await models_1.PermissionModel.find({});
        if (existingPermissions.length === 0) {
            throw new Error("❌ No hay permisos en la base de datos. Ejecuta primero el seed de permisos.");
        }
        const subroutesToSeed = [
            { id: 'products-registry', name: 'Registrar producto', path: '/dashBoard/productos/registrar-producto', active: false, permissionKey: 'registrar_producto', mainRoute: 'products' },
            { id: 'products-modify', name: 'Modificar producto', path: '/dashBoard/productos/modificar-producto', active: false, permissionKey: 'modificar_producto', mainRoute: 'products' },
            { id: 'products-list', name: 'Listado de productos', path: '/dashBoard/productos/lista-productos', active: false, permissionKey: 'ver_listar_productos', mainRoute: 'products' },
            { id: 'products-search', name: 'Buscar producto', path: '/dashBoard/productos/buscar-producto', active: false, permissionKey: 'buscar_producto', mainRoute: 'products' },
            { id: 'inventory-add', name: 'Agregar inventario', path: '/dashBoard/inventario/agregar-inventario', active: false, permissionKey: 'agregar_inventario', mainRoute: 'inventory-management' },
            { id: 'inventory-sales', name: 'Registrar venta', path: '/dashBoard/inventario/registrar-venta', active: false, permissionKey: 'registrar_venta', mainRoute: 'inventory-management' },
            { id: 'inventory-adjust', name: 'Ajustar producto', path: '/dashBoard/inventario/ajustar-producto', active: false, permissionKey: 'ajustar_producto', mainRoute: 'inventory-management' },
            { id: 'report-general', name: 'Estado general', path: '/dashBoard/reportes/reporte-general', active: false, permissionKey: 'reporte_estado_general', mainRoute: 'general-reports' },
            { id: 'report-low-stock', name: 'Bajo stock', path: '/dashBoard/reportes/reporte-bajo-stock', active: false, permissionKey: 'reporte_bajo_stock', mainRoute: 'general-reports' },
            { id: 'report-total-stock', name: 'Valor total inventario', path: '/dashBoard/reportes/reporte-total-stock', active: false, permissionKey: 'reporte_valor_total_inventario', mainRoute: 'general-reports' },
            { id: 'users-create', name: 'Crear usuario', path: '/dashBoard/usuarios/crear-usuario', active: false, permissionKey: 'crear_usuario', mainRoute: 'users' },
            { id: 'users-update', name: 'Modificar usuario', path: '/dashBoard/usuarios/modificar-usuario', active: false, permissionKey: 'modificar_usuario', mainRoute: 'users' },
            { id: 'users-list', name: 'Listar usuarios', path: '/dashBoard/usuarios/listar-usuarios', active: false, permissionKey: 'listar_usuarios', mainRoute: 'users' },
        ];
        // const subroutesWithParent = subroutesToSeed.map((subroute) => {
        //   const parentRoute = existingRoutes.find((route) => route.id === subroute.mainRoute);
        //   if(!parentRoute){
        //     throw new Error(`❌ Ruta padre "${subroute.mainRoute}" no encontrada para subruta "${subroute.id}"`);
        //   }
        //   return {
        //     ...subroute,
        //     parentId : parentRoute._id,
        //   }
        // })
        // console.log("Subrutas ya configuradas: ",subroutesWithParent);
        const requiredPermissions = subroutesToSeed.map(s => s.permissionKey);
        const missingPermissions = requiredPermissions.filter(p => !existingPermissions.some(ep => ep.permission === p));
        if (missingPermissions.length > 0) {
            throw new Error(`❌ Permisos no encontrados: ${missingPermissions.join(", ")}`);
        }
        const validSubroutes = [];
        const invalidSubroutes = [];
        for (const subroute of subroutesToSeed) {
            try {
                const validateSubroute = validations_1.subrouteSchemaZod.parse(subroute);
                validSubroutes.push(validateSubroute);
            }
            catch (error) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidSubroutes.push(subroute);
            }
        }
        if (invalidSubroutes.length > 0) {
            console.warn('Los siguientes subrutas no pasaron la validación y no se insertarán:', invalidSubroutes);
        }
        if (validSubroutes.length > 0) {
            try {
                const count = await models_1.SubrouteModel.countDocuments();
                console.log(`Encontrados ${count} subrutas existentes`);
                const deleteResult = await models_1.SubrouteModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} subrutas existentes`);
                console.log("Routes validas con el Subroute DTO: ", validSubroutes);
                const insertResult = await models_1.SubrouteModel.insertMany(validSubroutes, { ordered: false });
                console.log(`Insertados ${insertResult.length} subrutas correctamente`);
            }
            catch (error) {
                console.error('Error al insertar subrutas en la base de datos:', error);
            }
        }
        else {
            console.log("No hay subrutas válidas para insertar");
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
seedSubroutes()
    .then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=menu.seed.js.map