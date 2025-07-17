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
const seedDepartment = async () => {
    try {
        if (mongoose_1.default.connection.readyState !== 1) {
            console.log("Conectando a la base de datos...");
            await mongoose_1.default.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }
        const departmentToSeed = [
            {
                idDepartment: 'ADM01',
                label: enums_1.CompanyDepartmentEnum.ADMINISTRACION,
                name: enums_1.CompanyDepartmentEnum.ADMINISTRACION,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd0256f"),
                headquartersName: "CAR-HQ-01"
            },
            {
                idDepartment: 'CMP01',
                label: enums_1.CompanyDepartmentEnum.COMPRAS,
                name: enums_1.CompanyDepartmentEnum.COMPRAS,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd0256f"),
                headquartersName: "CAR-HQ-01"
            },
            {
                idDepartment: 'VNT01',
                label: enums_1.CompanyDepartmentEnum.VENTAS,
                name: enums_1.CompanyDepartmentEnum.VENTAS,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd0256f"),
                headquartersName: "CAR-HQ-01"
            },
            {
                idDepartment: 'ALM01',
                label: enums_1.CompanyDepartmentEnum.ALMACEN,
                name: enums_1.CompanyDepartmentEnum.ALMACEN,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd0256f"),
                headquartersName: "CAR-HQ-01"
            },
            {
                idDepartment: 'RRHH01',
                label: enums_1.CompanyDepartmentEnum.RECURSOS_HUMANOS,
                name: enums_1.CompanyDepartmentEnum.RECURSOS_HUMANOS,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd0256f"),
                headquartersName: "CAR-HQ-01"
            },
            {
                idDepartment: 'ADM02',
                label: enums_1.CompanyDepartmentEnum.ADMINISTRACION,
                name: enums_1.CompanyDepartmentEnum.ADMINISTRACION,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02570"),
                headquartersName: "VAL-BR-02"
            },
            {
                idDepartment: 'CMP02',
                label: enums_1.CompanyDepartmentEnum.COMPRAS,
                name: enums_1.CompanyDepartmentEnum.COMPRAS,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02570"),
                headquartersName: "VAL-BR-02"
            },
            {
                idDepartment: 'VNT02',
                label: enums_1.CompanyDepartmentEnum.VENTAS,
                name: enums_1.CompanyDepartmentEnum.VENTAS,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02570"),
                headquartersName: "VAL-BR-02"
            },
            {
                idDepartment: 'ALM02',
                label: enums_1.CompanyDepartmentEnum.ALMACEN,
                name: enums_1.CompanyDepartmentEnum.ALMACEN,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02570"),
                headquartersName: "VAL-BR-02"
            },
            {
                idDepartment: 'RRHH02',
                label: enums_1.CompanyDepartmentEnum.RECURSOS_HUMANOS,
                name: enums_1.CompanyDepartmentEnum.RECURSOS_HUMANOS,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02570"),
                headquartersName: "VAL-BR-02",
                isActive: false,
            },
            {
                idDepartment: 'ADM03',
                label: enums_1.CompanyDepartmentEnum.ADMINISTRACION,
                name: enums_1.CompanyDepartmentEnum.ADMINISTRACION,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02571"),
                headquartersName: "MAR-AG-03"
            },
            {
                idDepartment: 'CMP03',
                label: enums_1.CompanyDepartmentEnum.COMPRAS,
                name: enums_1.CompanyDepartmentEnum.COMPRAS,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02571"),
                headquartersName: "MAR-AG-03"
            },
            {
                idDepartment: 'VNT03',
                label: enums_1.CompanyDepartmentEnum.VENTAS,
                name: enums_1.CompanyDepartmentEnum.VENTAS,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02571"),
                headquartersName: "MAR-AG-03"
            },
            {
                idDepartment: 'ALM03',
                label: enums_1.CompanyDepartmentEnum.ALMACEN,
                name: enums_1.CompanyDepartmentEnum.ALMACEN,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02571"),
                headquartersName: "MAR-AG-03"
            },
            {
                idDepartment: 'RRHH03',
                label: enums_1.CompanyDepartmentEnum.RECURSOS_HUMANOS,
                name: enums_1.CompanyDepartmentEnum.RECURSOS_HUMANOS,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02571"),
                headquartersName: "MAR-AG-03",
                isActive: false,
            },
            {
                idDepartment: 'ADM04',
                label: enums_1.CompanyDepartmentEnum.ADMINISTRACION,
                name: enums_1.CompanyDepartmentEnum.ADMINISTRACION,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02572"),
                headquartersName: "BAR-DP-04"
            },
            {
                idDepartment: 'CMP04',
                label: enums_1.CompanyDepartmentEnum.COMPRAS,
                name: enums_1.CompanyDepartmentEnum.COMPRAS,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02572"),
                headquartersName: "BAR-DP-04"
            },
            {
                idDepartment: 'VNT04',
                label: enums_1.CompanyDepartmentEnum.VENTAS,
                name: enums_1.CompanyDepartmentEnum.VENTAS,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02572"),
                headquartersName: "BAR-DP-04"
            },
            {
                idDepartment: 'ALM04',
                label: enums_1.CompanyDepartmentEnum.ALMACEN,
                name: enums_1.CompanyDepartmentEnum.ALMACEN,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02572"),
                headquartersName: "BAR-DP-04"
            },
            {
                idDepartment: 'RRHH04',
                label: enums_1.CompanyDepartmentEnum.RECURSOS_HUMANOS,
                name: enums_1.CompanyDepartmentEnum.RECURSOS_HUMANOS,
                headquartersId: new mongoose_1.default.Types.ObjectId("67e3494794aef1393cd02572"),
                headquartersName: "BAR-DP-04",
            },
        ];
        const validDepartments = [];
        const invalidDepartments = [];
        for (const department of departmentToSeed) {
            try {
                const validDepartment = validations_1.departmentSchemaZod.parse(department);
                validDepartments.push(validDepartment);
            }
            catch (error) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidDepartments.push(department);
            }
        }
        if (invalidDepartments.length > 0) {
            console.warn('Las siguientes sedes no pasaron la validación y no se insertarán:', invalidDepartments);
        }
        if (validDepartments.length > 0) {
            try {
                const count = await models_1.DepartmentModel.countDocuments({});
                console.log(`Encontrados ${count} departamentos existentes`);
                const deleteResult = await models_1.DepartmentModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} departamentos existentes`);
                const insertResult = await models_1.DepartmentModel.insertMany(validDepartments);
                console.log(`Insertados ${insertResult.length} departamentos correctamente`);
            }
            catch (error) {
                console.error('Error al insertar departamentos en la base de datos:', error);
            }
        }
        else {
            console.log("No hay departamentos válidos para insertar");
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
seedDepartment().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=department.seed.js.map