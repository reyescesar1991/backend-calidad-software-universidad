import { model, Schema } from "mongoose";
import mongoose from "mongoose";
import { CurrencyEnum, UnitMeasureEnum } from "../../../core/enums";

export interface ProductDocument extends Document {

  _id: mongoose.Schema.Types.ObjectId;
  idProduct: string,
  name: string,
  description: string,
  sku: string,
  barcode: string,
  categoryId: mongoose.Schema.Types.ObjectId;
  supplierId: mongoose.Schema.Types.ObjectId;
  brand: string,
  purchasePrice: number,
  sellingPrice: number,
  currency: CurrencyEnum,
  minimumStockLevel: number,
  maximumStockLevel: number,
  unitOfMeasure: UnitMeasureEnum,
  imageUrl: string,
  updatedAt: Date,
  isActive: boolean,
  notes: string,
};

export const productSchema = new Schema({

  idProduct: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  sku: { type: String, required: true, unique: true },
  barcode: { type: String, required: true, unique: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CategoryProduct",
    required: true
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true
  },
  brand: { type: String, required: true },
  purchasePrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  currency: { type: String, required: true, default: CurrencyEnum.DOLARES },
  minimumStockLevel: { type: Number, required: true },
  maximumStockLevel: { type: Number, required: true },
  unitOfMeasure: { type: String, required: true, default: UnitMeasureEnum.UNIDAD },
  imageUrl: { type: String, required: false },
  updatedAt: { type: Date, required: false, default: new Date(Date.now()) },
  isActive: { type: Boolean, required: false, default: true },
  notes: { type: String, required: false },

}, { timestamps: true });

productSchema.index({ categoryId: 1 });
productSchema.index({ supplierId: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ categoryId: 1, isActive: 1 });
productSchema.index({ supplierId: 1, isActive: 1 });
productSchema.index({ name: "text", description: "text" });
productSchema.index({ updatedAt: -1 }); // Los más recientes primero

export const ProductModel = model<ProductDocument>("Product", productSchema);