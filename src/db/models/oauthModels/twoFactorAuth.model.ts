import mongoose, { model, Schema } from "mongoose";

export interface TwoFactorAuthDocument extends Document {

    _id : mongoose.Types.ObjectId;
    method : string,
    isEnabled : boolean,
    quantityUsers : number,
};

export const twoFactorAuthSchema = new Schema<TwoFactorAuthDocument>({

    //TODO: Eliminar test de aca
    method : {type: String, enum: ["sms", "email", "test", "test2"], required: true, unique: true},
    isEnabled : {type: Boolean, required: true, default: false},
    quantityUsers : {type: Number, required: false, default: 0},
} , {timestamps: true});

export const TwoFactorAuthModel = model<TwoFactorAuthDocument>("TwoFactorAuth" , twoFactorAuthSchema);