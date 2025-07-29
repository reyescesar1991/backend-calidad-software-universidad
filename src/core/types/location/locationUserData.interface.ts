import mongoose from "mongoose";

export interface LocationUserData{

    departmentId : mongoose.Types.ObjectId;
    headquarterId : mongoose.Types.ObjectId;
    warehouseId : mongoose.Types.ObjectId;
}