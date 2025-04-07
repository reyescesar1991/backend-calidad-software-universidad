import mongoose from "mongoose";

export interface IWarehouseType{
    idWarehouse: string;
    idHeadquarter : mongoose.Types.ObjectId;
    name: string; 
    code?: string; 
    address?: string; 
    city?: string; 
    state?: string; 
    zipCode?: string; 
    country?: string; 
    capacity?: number; 
    currentOccupancy?: number; 
    isActive?: boolean; 
    openingHours?: string; 
    contactPerson?: string; 
    phoneNumber?: string; 
    email?: string; 
    notes?: string; 
}