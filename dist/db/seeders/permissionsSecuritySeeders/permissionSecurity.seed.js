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
dotenv.config({ path: (0, path_1.resolve)(process.cwd(), ".env") });
const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/tu_base_de_datos_desarrollo';
console.log(CONNECTION_STRING);
if (!CONNECTION_STRING) {
    console.error('ERROR: CONNECTION_STRING no está definida en las variables de entorno');
    process.exit(1);
}
mongoose_1.default.set('bufferTimeoutMS', 30000);
const seedPermissionsSecurity = async () => {
    try {
        if (mongoose_1.default.connection.readyState !== 1) {
            console.log('Conectando a la base de datos...');
            await mongoose_1.default.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }
        const permissionsSecurityToSeed = [
            { id: 'force_password_reset', label: 'Forzar cambio de contraseña en próximo inicio de sesión', can: false, permission: 'forzar_cambio_contraseña' },
            { id: 'two_factor_auth', label: 'Autenticación de dos factores', can: false, permission: 'autenticacion_factor' },
            { id: 'account_lock', label: 'Bloquear cuenta temporalmente', can: false, permission: 'bloquear_cuenta_temporalmente' },
        ];
        const validPermissionsSecurity = [];
        const invalidPermissionsSecurity = [];
        for (const permission of permissionsSecurityToSeed) {
            try {
                const validPermissionSecurity = validations_1.permissionSecurityZodSchema.parse(permission);
                validPermissionsSecurity.push(validPermissionSecurity);
            }
            catch (error) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidPermissionsSecurity.push(permission);
            }
        }
        console.log(validPermissionsSecurity);
        if (invalidPermissionsSecurity.length > 0) {
            console.warn('Los siguientes permisos no pasaron la validación y no se insertarán:', invalidPermissionsSecurity);
        }
        if (validPermissionsSecurity.length > 0) {
            try {
                const count = await models_1.PermissionSecurityModel.countDocuments();
                console.log(`Encontrados ${count} permisos de seguridad existentes`);
                const deleteResult = await models_1.PermissionSecurityModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} permisos de seguridad existentes`);
                const insertResult = await models_1.PermissionSecurityModel.insertMany(validPermissionsSecurity);
                console.log(`Insertados ${insertResult.length} permisos de seguridad correctamente`);
            }
            catch (error) {
                console.error('Error al insertar permisos de seguridad en la base de datos:', error);
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
seedPermissionsSecurity().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=permissionSecurity.seed.js.map