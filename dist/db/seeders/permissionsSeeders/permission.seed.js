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
const models_1 = require("../../models");
const validations_1 = require("../../../validations");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const path_1 = require("path");
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
const seedPermissions = async () => {
    try {
        // Conectar a la base de datos si no está conectado
        if (mongoose_1.default.connection.readyState !== 1) {
            console.log('Conectando a la base de datos...');
            await mongoose_1.default.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }
        const permissionsToSeed = [
            { label: 'Listar Productos', permission: 'ver_listar_productos', can: false },
            { label: 'Registrar producto', permission: 'registrar_producto', can: false },
            { label: 'Modificar producto', permission: 'modificar_producto', can: false },
            { label: 'Buscar producto', permission: 'buscar_producto', can: false },
            { label: 'Agregar inventario', permission: 'agregar_inventario', can: false },
            { label: 'Registrar venta', permission: 'registrar_venta', can: false },
            { label: 'Ajustar producto', permission: 'ajustar_producto', can: false },
            { label: 'Estado general', permission: 'reporte_estado_general', can: false },
            { label: 'Bajo stock', permission: 'reporte_bajo_stock', can: false },
            { label: 'Valor total inventario', permission: 'reporte_valor_total_inventario', can: false },
            { label: 'Crear usuario', permission: 'crear_usuario', can: false },
            { label: 'Modificar usuario', permission: 'modificar_usuario', can: false },
            { label: 'Listar usuario', permission: 'listar_usuarios', can: false },
        ];
        const validPermissions = [];
        const invalidPermissions = [];
        for (const permissionData of permissionsToSeed) {
            try {
                const validatedPermission = validations_1.createPermissionSchemaZod.parse(permissionData);
                validPermissions.push(validatedPermission);
            }
            catch (error) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidPermissions.push(permissionData);
            }
        }
        if (invalidPermissions.length > 0) {
            console.warn('Los siguientes permisos no pasaron la validación y no se insertarán:', invalidPermissions);
        }
        if (validPermissions.length > 0) {
            try {
                // Primero, verifica si hay permisos en la colección
                const count = await models_1.PermissionModel.countDocuments();
                console.log(`Encontrados ${count} permisos existentes`);
                // Elimina los permisos existentes
                const deleteResult = await models_1.PermissionModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} permisos existentes`);
                // Inserta los nuevos permisos
                const insertResult = await models_1.PermissionModel.insertMany(validPermissions, { ordered: false });
                console.log(`Insertados ${insertResult.length} permisos correctamente`);
            }
            catch (error) {
                console.error('Error al insertar permisos en la base de datos:', error);
            }
        }
        else {
            console.log("No hay permisos válidos para insertar");
        }
    }
    catch (error) {
        console.error('Error durante el proceso de seed:', error);
    }
    finally {
        // Si deseas cerrar la conexión después de ejecutar el seed
        await mongoose_1.default.connection.close();
        console.log('Conexión a la base de datos cerrada');
    }
};
// Ejecuta la función y maneja excepciones
seedPermissions()
    .then(() => {
    console.log('Proceso de seed completo');
    // Comenta estas líneas si no quieres cerrar la conexión automáticamente
    // return mongoose.connection.close();
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
    // return mongoose.connection.close();
});
//# sourceMappingURL=permission.seed.js.map