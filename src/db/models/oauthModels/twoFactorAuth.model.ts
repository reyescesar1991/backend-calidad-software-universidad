import { model, Schema } from "mongoose";
import { ITwoFactorAuthType } from "../../../core/types";

export interface TwoFactorAuthDocument extends Document, ITwoFactorAuthType {};

export const twoFactorAuthSchema = new Schema<TwoFactorAuthDocument>({

    method : {type: String, enum: ["sms", "email"], required: true, unique: true},
    isEnabled : {type: Boolean, required: true, default: false},
    quantityUsers : {type: Number, required: false, default: 0},
} , {timestamps: true});

export const TwoFactorAuthModel = model<TwoFactorAuthDocument>("TwoFactorAuth" , twoFactorAuthSchema);