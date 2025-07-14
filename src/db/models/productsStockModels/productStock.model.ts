import mongoose, { model, Schema } from "mongoose";


export interface ProductStockDocument extends Document{

    _id: mongoose.Schema.Types.ObjectId;
    productId : mongoose.Schema.Types.ObjectId;
    productCustomId : string;
    warehouseId: mongoose.Schema.Types.ObjectId;
    warehouseCustomId : string;
    quantity : number;
    statusInWarehouse : boolean;
}

export const productStockSchema = new Schema<ProductStockDocument>({

    productId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    productCustomId : {

        type : String, required: true
    },
    warehouseId : {
type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true
    },
    warehouseCustomId : {type : String, required: true},
    quantity : {type : Number, min : 0, required: true, default : 0},
    statusInWarehouse : {type: Boolean, default: true}

}, { timestamps: true, versionKey: false },);

// AÑADE ESTA LÍNEA DESPUÉS DE DEFINIR EL ESQUEMA
productStockSchema.index({ productId: 1, warehouseId: 1 }, { unique: true });

export const ProductStockModel = model<ProductStockDocument>("ProductStock" , productStockSchema);