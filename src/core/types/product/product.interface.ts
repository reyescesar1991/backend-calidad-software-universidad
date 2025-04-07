import mongoose from "mongoose";

export interface IProductType{
    idProduct: string; 
    name: string; 
    description?: string; 
    sku?: string; 
    barcode?: string;
    categoryId: mongoose.Types.ObjectId; 
    supplierId: mongoose.Types.ObjectId; 
    brand?: string; 
    purchasePrice?: number; 
    sellingPrice: number; 
    currency?: string; 
    stockQuantity: number; 
    minimumStockLevel?: number;
    maximumStockLevel?: number; 
    unitOfMeasure?: string; 
    imageUrl?: string; 
    imageUrls?: string[]; 
    updatedAt?: Date;
    isActive?: boolean; 
    notes?: string; 
    warehouseId : mongoose.Types.ObjectId;
  }