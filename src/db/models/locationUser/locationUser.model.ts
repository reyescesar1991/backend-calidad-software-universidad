import mongoose, { Schema } from "mongoose";

export interface LocationUserDocument extends Document {

    _id: mongoose.Types.ObjectId;
    departmentId: mongoose.Types.ObjectId;
    headquarterId: mongoose.Types.ObjectId;
    warehouseId: mongoose.Types.ObjectId;
    userId: string;
}

export const locationUserSchema = new Schema<LocationUserDocument>({

    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    headquarterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Headquarter",
        required: true
    },
    warehouseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    }

});

export const LocationUserModel = mongoose.model<LocationUserDocument>("LocationUser", locationUserSchema);

export default LocationUserModel;