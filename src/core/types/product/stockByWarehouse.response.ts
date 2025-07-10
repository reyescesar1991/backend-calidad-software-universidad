import mongoose from "mongoose";

export interface IStockByWarehouseResponse{

    warehouseId : mongoose.Schema.Types.ObjectId;
    warehouseCustomId : string;
    quantity : number;
}