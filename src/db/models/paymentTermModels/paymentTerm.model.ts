import mongoose, { model, Schema } from "mongoose";

export interface PaymentTermDocument extends Document {

    _id: mongoose.Types.ObjectId;
    id : string,
    name : string,
    description : string,
    daysToPay : number,
    discount : number,
    isActive : boolean,
};

export const paymentTermSchema = new Schema<PaymentTermDocument>({

    id : {type: String, required: true, unique: true},
    name : {type: String, required: true},
    description : {type: String, required: true},
    daysToPay : {type: Number, required: true},
    discount : {type: Number, required: false},
    isActive : {type: Boolean, required: true, default: true},
})

export const PaymentTermModel = model<PaymentTermDocument>("PaymentTerm" , paymentTermSchema);