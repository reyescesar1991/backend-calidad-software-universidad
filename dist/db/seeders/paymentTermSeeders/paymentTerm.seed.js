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
const paymentTermsSeed = async () => {
    try {
        if (mongoose_1.default.connection.readyState !== 1) {
            console.log('Conectando a la base de datos...');
            await mongoose_1.default.connect(CONNECTION_STRING);
            console.log('Conexión a la base de datos establecida correctamente');
        }
        const paymentTermsToSeed = [
            {
                id: 'CONTADO',
                name: 'Contado',
                description: 'Pago inmediato al momento de la compra o recepción del servicio.',
                daysToPay: 0,
                discount: 0,
                isActive: true,
            },
            {
                id: 'CREDITO30',
                name: 'Crédito 30 días',
                description: 'El pago debe realizarse dentro de los 30 días siguientes a la fecha de la factura.',
                daysToPay: 30,
                discount: 0,
                isActive: true,
            },
            {
                id: 'CREDITO60',
                name: 'Crédito 60 días',
                description: 'El pago debe realizarse dentro de los 60 días siguientes a la fecha de la factura.',
                daysToPay: 60,
                discount: 0,
                isActive: true,
            },
            {
                id: 'PAGO_CONTRA_ENTREGA',
                name: 'Pago Contra Entrega',
                description: 'El pago se realiza al momento de recibir los productos o la finalización del servicio.',
                daysToPay: 0,
                discount: 0,
                isActive: true,
            },
            {
                id: 'PRONTO_PAGO_10',
                name: 'Pronto Pago 10 días (2% Descuento)',
                description: 'Se ofrece un descuento del 2% si el pago se realiza dentro de los 10 días siguientes a la fecha de la factura.',
                daysToPay: 10,
                discount: 2,
                isActive: true,
            },
            {
                id: 'CREDITO45',
                name: 'Crédito 45 días',
                description: 'El pago debe realizarse dentro de los 45 días siguientes a la fecha de la factura.',
                daysToPay: 45,
                isActive: true,
            },
        ];
        const validPaymentTerms = [];
        const invalidPaymentTerms = [];
        for (const paymentTerm of paymentTermsToSeed) {
            try {
                const validPaymentTerm = validations_1.paymentTermSchemaZod.parse(paymentTerm);
                validPaymentTerms.push(validPaymentTerm);
            }
            catch (error) {
                console.error('Error de validación en el seeder:', error.issues);
                invalidPaymentTerms.push(paymentTerm);
            }
        }
        if (invalidPaymentTerms.length > 0) {
            console.warn('Los siguientes términos de pago no pasaron la validación y no se insertarán:', invalidPaymentTerms);
        }
        if (validPaymentTerms.length > 0) {
            try {
                const count = await models_1.PaymentTermModel.countDocuments();
                console.log(`Encontrados ${count} términos de pago existentes`);
                const deleteResult = await models_1.PaymentTermModel.deleteMany({});
                console.log(`Eliminados ${deleteResult.deletedCount} términos de pago existentes`);
                const insertResult = await models_1.PaymentTermModel.insertMany(validPaymentTerms);
                console.log(`Insertados ${insertResult.length} términos de pago correctamente`);
            }
            catch (error) {
                console.error('Error al insertar términos de pago en la base de datos:', error);
            }
        }
        else {
            console.log("No hay términos de pago válidos para insertar");
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
paymentTermsSeed().then(() => {
    console.log('Proceso de seed completo');
})
    .catch((error) => {
    console.error('Error durante el proceso de seed:', error);
});
//# sourceMappingURL=paymentTerm.seed.js.map