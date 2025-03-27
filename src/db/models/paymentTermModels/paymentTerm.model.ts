import { model, Schema } from "mongoose";
import { IPaymentTermType } from "../../../core/types";

export interface PaymentTermDocument extends Document, IPaymentTermType {};

export const paymentTermSchema = new Schema<PaymentTermDocument>({

    id : {type: String, required: true, unique: true},
    name : {type: String, required: true},
    description : {type: String, required: true},
    daysToPay : {type: Number, required: true},
    discount : {type: Number, required: false},
    isActive : {type: Boolean, required: true, default: true},
})

export const PaymentTermModel = model<PaymentTermDocument>("PaymentTerm" , paymentTermSchema);