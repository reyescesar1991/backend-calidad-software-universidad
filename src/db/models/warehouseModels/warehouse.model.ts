import { model, Schema } from "mongoose";
import { IWarehouseType } from "../../../core/types";
import mongoose from "mongoose";

export interface WarehouseDocument extends Document, IWarehouseType {};

export const warehouseSchema = new Schema({

    idWarehouse : {type: String, unique: true, required: true},
    idHeadquarter : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Headquarter",
        required: true
    },
    name : {type: String, required: true},
    address : {type: String, required: true, unique: true},
    city : {type: String, required: true},
    state : {type: String, required: true},
    country : {type: String, required: true, default: "Ven"},
    capacity : {type: Number, required: true},
    isActive : {type: Boolean, required: false, default: true},
    contactPerson : {type: String, required: true},
    phoneNumber : {type: String, required: true, unique: true},
    email : {type: String, required: true, unique: true},
    notes : {type: String, required: false},

}, {timestamps: true});

// Índice para consultas por sede (idHeadquarter)
warehouseSchema.index({ idHeadquarter: 1 }); // 1 = orden ascendente

// Índice compuesto: ciudad + estado (para filtros geográficos)
warehouseSchema.index({ city: 1, state: 1 });

// Índice para capacidad (si haces consultas de rango: >, <, between)
warehouseSchema.index({ capacity: 1 });

// Índice compuesto: sede + capacidad (ej: "almacenes en sede X con capacidad > 1000")
warehouseSchema.index({ idHeadquarter: 1, capacity: 1 });

// Índice para isActive (si filtran por estado activo/inactivo frecuentemente)
warehouseSchema.index({ isActive: 1 });

// Índice para createdAt (si ordenas por fecha de creación)
warehouseSchema.index({ createdAt: -1 }); // -1 = orden descendente

// Índice de texto para búsquedas en name y notes (opcional)
warehouseSchema.index({ name: "text", notes: "text" });

export const WarehouseModel = model<WarehouseDocument>("Warehouse" , warehouseSchema);