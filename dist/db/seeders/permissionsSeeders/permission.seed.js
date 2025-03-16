"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const validations_1 = require("../../../validations");
const mongoose_1 = __importDefault(require("mongoose"));
// Configuración de la conexión a MongoDB con un tiempo de espera mayor
mongoose_1.default.set('bufferTimeoutMS', 30000); // Aumenta el tiempo de espera a 30 segundos
// URL de conexión a la base de datos (ajusta según tu configuración)
const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos';
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
            // Elimino el duplicado de "Buscar producto"
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
        // await mongoose.connection.close();
        // console.log('Conexión a la base de datos cerrada');
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