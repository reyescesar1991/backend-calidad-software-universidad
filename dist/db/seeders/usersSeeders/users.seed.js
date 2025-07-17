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
const seedUsers = async () => {
    try {
        if (mongoose_1.default.connection.readyState !== 1) {
            console.log('Conectando a la base de datos...');
            await mongoose_1.default.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }
        const usersToSeed = [
            {
                idUser: "USER0011",
                rol: new mongoose_1.default.Types.ObjectId("67f7f5ff4f0b312a2319fc56"), // ID aleatorio para el rol
                name: "Ricardo",
                lastName: "Pérez",
                codeCountry: "58",
                phoneNumber: "04121234567",
                email: "ricardo.perez@gmail.com",
                password: "Contraseña.01",
                username: "rperez",
                status: enums_1.StatusUserEnum.ACTIVE,
                hasTwoFactor: true,
                lastLogin: "2025-04-04T10:00:00Z",
                department: new mongoose_1.default.Types.ObjectId("67eead413bf36442a108d304"), // ID aleatorio para el departamento
                roleConfig: new mongoose_1.default.Types.ObjectId("67f7f643b65f69c72667597e"), // ID aleatorio para la configuración del rol
                passwordHistory: ["oldPasswordHash1", "previousPasswordHash"],
            },
            {
                idUser: "USER0022",
                rol: new mongoose_1.default.Types.ObjectId("67f7f5ff4f0b312a2319fc57"), // Otro ID aleatorio para el rol
                name: "Mariana",
                lastName: "Gómez",
                codeCountry: "58",
                phoneNumber: "04149876543",
                email: "mariana.gomez@gmail.com",
                password: "Contraseña.02",
                username: "mgomez",
                status: enums_1.StatusUserEnum.PENDING,
                hasTwoFactor: false,
                department: new mongoose_1.default.Types.ObjectId("67eead413bf36442a108d301"), // Otro ID aleatorio para el departamento
                roleConfig: new mongoose_1.default.Types.ObjectId("67f7f643b65f69c72667597f"), // Otro ID aleatorio para la configuración del rol
            },
            {
                idUser: "USER0033",
                rol: new mongoose_1.default.Types.ObjectId("67f7f5ff4f0b312a2319fc58"),
                name: "José",
                lastName: "Ramírez",
                codeCountry: "58",
                phoneNumber: "04245551212",
                email: "jose.ramirez@gmail.com",
                password: "Contraseña.03",
                username: "jramirez",
                status: enums_1.StatusUserEnum.ACTIVE,
                hasTwoFactor: false,
                lastLogin: "2025-04-03T15:30:00Z",
                department: new mongoose_1.default.Types.ObjectId("67eead413bf36442a108d301"),
                roleConfig: new mongoose_1.default.Types.ObjectId("67f7f643b65f69c726675980"),
                passwordHistory: ["pass123", "securePass"],
            },
            {
                idUser: "USER0044",
                rol: new mongoose_1.default.Types.ObjectId("67f7f5ff4f0b312a2319fc59"),
                name: "Isabella",
                lastName: "Fernández",
                codeCountry: "58",
                phoneNumber: "04161119988",
                email: "isabella.fernandez@gmail.com",
                password: "Contraseña.04",
                username: "ifernandez",
                status: enums_1.StatusUserEnum.ACTIVE,
                hasTwoFactor: true,
                lastLogin: "2025-03-28T09:45:00Z",
                department: new mongoose_1.default.Types.ObjectId("67eead413bf36442a108d301"),
                roleConfig: new mongoose_1.default.Types.ObjectId("67f7f643b65f69c726675981"),
                passwordHistory: ["password", "mypassword"],
            },
        ];
        const validUsers = [];
        const invalidUsers = [];
        for (const user of usersToSeed) {
            try {
                const validUser = validations_1.userSchemaZod.parse(user);
                validUsers.push(validUser);
            }
            catch (error) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidUsers.push(user);
            }
        }
        if (invalidUsers.length > 0) {
            console.warn('Los siguientes factores no pasaron la validación y no se insertarán:', invalidUsers);
        }
        if (validUsers.length > 0) {
            try {
                const count = await models_1.UserModel.countDocuments({});
                console.log(`Encontrados ${count} usuarios existentes`);
                const deleteResult = await models_1.UserModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} usuarios existentes`);
                const insertResult = await models_1.UserModel.insertMany(validUsers);
                console.log(`Insertados ${insertResult.length} usuarios correctamente`);
            }
            catch (error) {
                console.error('Error al insertar usuarios en la base de datos:', error);
            }
        }
        else {
            console.log("No hay usuarios válidos para insertar");
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
seedUsers().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=users.seed.js.map