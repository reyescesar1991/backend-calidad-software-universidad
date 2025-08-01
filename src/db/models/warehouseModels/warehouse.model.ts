import { model, Schema } from "mongoose";
import mongoose from "mongoose";

export interface WarehouseDocument extends Document {

    _id: mongoose.Types.ObjectId;
    idWarehouse : string,
    idHeadquarter : mongoose.Types.ObjectId;
    name : string;
    address : string;
    city : string;
    state : string;
    country : string;
    currentCapacity : number;
    capacity : number;
    unitsPerBox : number;
    boxesPerPallet : number;
    isActive : boolean;
    contactPerson : string;
    phoneNumber : string;
    email : string;
    notes : string;
};

export const warehouseSchema = new Schema<WarehouseDocument>({

    idWarehouse : {type: String, unique: true, required: true},
    idHeadquarter : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Headquarter",
        required: true
    },
    name : {type: String, required: true, unique: true},
    address : {type: String, required: true, unique: true},
    city : {type: String, required: true},
    state : {type: String, required: true},
    country : {type: String, required: true, default: "Ven"},
    currentCapacity : {type: Number, required: true, min : 0},
    capacity : {type: Number, required: true,},
    unitsPerBox : {type: Number, required: false, default: 12}, 
    boxesPerPallet : {type: Number, required: false, default: 50},
    isActive : {type: Boolean, required: false, default: true},
    contactPerson : {type: String, required: true, unique: true},
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