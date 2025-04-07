import mongoose from "mongoose";

export interface IBuyProduct{
    idBuyProduct: string;
    purchaseDate: Date;
    purchaseNumber: string;
    batchNumber: string;
    productId: mongoose.Types.ObjectId; 
    quantity: number; 
    unitPrice: number; 
    supplierId: mongoose.Types.ObjectId; 
    warehouseId: mongoose.Types.ObjectId; 
    totalAmount: number; 
    currency?: string; 
    taxAmount?: number; 
    discountAmount?: number; 
    createdBy?: string; 
    notes?: string; 
  }