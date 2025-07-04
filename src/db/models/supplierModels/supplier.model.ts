import mongoose, { model, Schema } from "mongoose";

export interface SupplierDocument extends Document { 

    _id: mongoose.Types.ObjectId;
    id: string,
    name: string,
    tradeName: string,
    contactPerson: string,
    phoneNumber: string,
    email: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
    taxId: string,
    businessRegistrationNumber: string,
    paymentTerm: mongoose.Types.ObjectId;
    isActive: boolean,
    notes: string,
}

export const supplierSchema = new Schema<SupplierDocument>({

    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    tradeName: { type: String, required: true, unique: true },
    contactPerson: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    taxId: { type: String, required: true, unique: true },
    businessRegistrationNumber: { type: String, required: true, unique: true },
    paymentTerm: {
        type: Schema.Types.ObjectId,
        ref: "PaymentTerm", // 👈 Referencia a la colección
        required: true
    },
    isActive: { type: Boolean, required: false, default: true },
    notes: { type: String, required: false },
}, {timestamps : true, versionKey: false});

export const SupplierModel = model<SupplierDocument>("Supplier", supplierSchema);