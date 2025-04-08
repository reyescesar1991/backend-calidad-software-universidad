import mongoose from "mongoose";
import { CurrencyEnum, UnitMeasureEnum } from "../../enums";

export interface IProductType{
    idProduct: string; 
    name: string; 
    description?: string; 
    sku: string; 
    barcode: string;
    categoryId: mongoose.Types.ObjectId; 
    supplierId: mongoose.Types.ObjectId; 
    brand: string; 
    purchasePrice: number; 
    sellingPrice: number; 
    currency: CurrencyEnum; 
    stockQuantity: number; 
    minimumStockLevel: number;
    maximumStockLevel: number; 
    unitOfMeasure: UnitMeasureEnum; 
    imageUrl?: string;  
    updatedAt?: Date;
    isActive?: boolean; 
    notes?: string; 
    warehouseId : mongoose.Types.ObjectId;
  }