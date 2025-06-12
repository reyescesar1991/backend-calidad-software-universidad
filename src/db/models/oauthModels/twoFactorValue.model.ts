import mongoose, { model, Schema } from "mongoose";

export interface TwoFactorValueUserDocument extends Document {

    _id : mongoose.Types.ObjectId;
    userId: string;
    value : string,
    method : string,
    expiresAt : Date,
};

export const twoFactorUserValueSchema = new Schema<TwoFactorValueUserDocument>({

    userId : {type: String, required: true, unique: true},
    value : {type: String, required: true, unique: true},
    method : {type: String, required: true, enum: ["sms", "email"], default: "email"},
    expiresAt : {type: Date, required: false, default: 0},
} , {timestamps: true});

twoFactorUserValueSchema.index({expiresAt : 1}, {expireAfterSeconds: 0});

export const TwoFactorUserValueModel = model<TwoFactorValueUserDocument>("TwoFactorValueUser" , twoFactorUserValueSchema);