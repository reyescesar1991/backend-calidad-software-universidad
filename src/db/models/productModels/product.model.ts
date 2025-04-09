import { model, Schema } from "mongoose";
import { IProductType } from "../../../core/types";
import mongoose from "mongoose";
import { CurrencyEnum, UnitMeasureEnum } from "../../../core/enums";

export interface ProductDocument extends Document, IProductType{};

export const productSchema = new Schema({

    idProduct : {type: String, required: true, unique: true},
    name : {type: String, required: true, unique: true},
    description : {type: String, required: false},
    sku: {type: String, required: true, unique: true},
    barcode : {type: String, required: true, unique: true},
    categoryId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CategoryProduct",
        required: true
    },
    supplierId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },
    brand : {type: String, required: true},
    purchasePrice : {type: Number, required: true},
    sellingPrice : {type: Number, required: true},
    currency : {type: String, required: true, default: CurrencyEnum.DOLARES},
    stockQuantity : {type: Number, required: true},
    minimumStockLevel : {type: Number, required: true},
    maximumStockLevel : {type: Number, required: true},
    unitOfMeasure : {type: String, required: true, default: UnitMeasureEnum.KILOGRAMO},
    imageUrl : {type: String, required: false},
    updatedAt : {type: Date, required: false, default: Date.now()},
    isActive : {type: Boolean, required: false, default: true},
    notes : {type: String, required: false},
    warehouseId : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true
    }],

}, {timestamps: true});

export const ProductModel = model<ProductDocument>("Product", productSchema);