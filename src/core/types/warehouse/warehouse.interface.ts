import mongoose from "mongoose";

export interface IWarehouseType{
    idWarehouse: string;
    idHeadquarter : mongoose.Types.ObjectId;
    name: string; 
    address: string; 
    city: string; 
    state: string; 
    country: string; 
    capacity: number; 
    isActive?: boolean; 
    contactPerson: string; 
    phoneNumber: string; 
    email: string; 
    notes?: string; 
}