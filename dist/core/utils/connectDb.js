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
exports.disconnectMongo = exports.initializeTestEnvironment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const path_1 = require("path");
// Cargar variables de entorno
dotenv.config({ path: (0, path_1.resolve)(process.cwd(), ".env") });
// Constantes reutilizables
const CONNECTION_STRING = process.env.CONNECTION_STRING;
/**
 * Inicializa las dependencias y la conexión a MongoDB.
 * Úsalo al inicio de cada script de test.
 */
const initializeTestEnvironment = async () => {
    try {
        // Conexión a MongoDB
        if (mongoose_1.default.connection.readyState !== 1) {
            console.log("🔗 Conectando a MongoDB...");
            console.log("Url de conexion: ", CONNECTION_STRING);
            await mongoose_1.default.connect(CONNECTION_STRING);
            console.log('✅ Conexión exitosa');
        }
    }
    catch (error) {
        console.error("❌ Error al inicializar el entorno:", error);
        process.exit(1);
    }
};
exports.initializeTestEnvironment = initializeTestEnvironment;
const disconnectMongo = async () => {
    await mongoose_1.default.connection.close();
    console.log('🔗 Conexión a la base de datos cerrada');
};
exports.disconnectMongo = disconnectMongo;
//# sourceMappingURL=connectDb.js.map