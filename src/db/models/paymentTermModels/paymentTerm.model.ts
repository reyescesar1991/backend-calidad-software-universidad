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
    name : {type: String, required: true, unique: true},
    description : {type: String, required: true},
    daysToPay : {type: Number, required: true, min: 1},
    discount : {type: Number, required: false, max : 15},
    isActive : {type: Boolean, required: true, default: true},
})

export const PaymentTermModel = model<PaymentTermDocument>("PaymentTerm" , paymentTermSchema);