import { model, Schema } from "mongoose";
import { ISupplierType } from "../../../core/types";

export interface SupplierDocument extends Document, ISupplierType {}

export const supplierSchema = new Schema<SupplierDocument>({

    id : {type: String, required: true, unique: true},
    name : {type: String, required: true},
    tradeName : {type: String, required: true},
    contactPerson : {type: String, required: true},
    phoneNumber : {type: String, required: true},
    email : {type: String, required: true},
    address : {type: String, required: true},
    city : {type: String, required: true},
    state : {type: String, required: true},
    zipCode : {type: String, required: true},
    country : {type: String, required: true},
    taxId : {type: String, required: true, unique: true},
    businessRegistrationNumber : {type: String, required: true, unique: true},
    paymentTerms : {type: String, required: true},
    isActive : {type: Boolean, required: false, default: true},
    notes : {type: String, required: false},
});

export const SupplierModel = model<SupplierDocument>("Supplier", supplierSchema);