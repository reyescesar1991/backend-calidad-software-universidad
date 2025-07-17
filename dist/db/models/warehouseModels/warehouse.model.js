"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseModel = exports.warehouseSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
;
exports.warehouseSchema = new mongoose_1.Schema({
    idWarehouse: { type: String, unique: true, required: true },
    idHeadquarter: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "Headquarter",
        required: true
    },
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true, default: "Ven" },
    currentCapacity: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, },
    unitsPerBox: { type: Number, required: false, default: 12 },
    boxesPerPallet: { type: Number, required: false, default: 50 },
    isActive: { type: Boolean, required: false, default: true },
    contactPerson: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    notes: { type: String, required: false },
}, { timestamps: true });
// Índice para consultas por sede (idHeadquarter)
exports.warehouseSchema.index({ idHeadquarter: 1 }); // 1 = orden ascendente
// Índice compuesto: ciudad + estado (para filtros geográficos)
exports.warehouseSchema.index({ city: 1, state: 1 });
// Índice para capacidad (si haces consultas de rango: >, <, between)
exports.warehouseSchema.index({ capacity: 1 });
// Índice compuesto: sede + capacidad (ej: "almacenes en sede X con capacidad > 1000")
exports.warehouseSchema.index({ idHeadquarter: 1, capacity: 1 });
// Índice para isActive (si filtran por estado activo/inactivo frecuentemente)
exports.warehouseSchema.index({ isActive: 1 });
// Índice para createdAt (si ordenas por fecha de creación)
exports.warehouseSchema.index({ createdAt: -1 }); // -1 = orden descendente
// Índice de texto para búsquedas en name y notes (opcional)
exports.warehouseSchema.index({ name: "text", notes: "text" });
exports.WarehouseModel = (0, mongoose_1.model)("Warehouse", exports.warehouseSchema);
//# sourceMappingURL=warehouse.model.js.map