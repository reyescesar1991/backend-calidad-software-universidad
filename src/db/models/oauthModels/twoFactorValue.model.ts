import mongoose, { model, Schema } from "mongoose";

export interface TwoFactorValueUserDocument extends Document {

    _id : mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    value : string,
    method : mongoose.Schema.Types.ObjectId,
    expiresAt : Date,
};

export const twoFactorUserValueSchema = new Schema<TwoFactorValueUserDocument>({

    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // 👈 Referencia a la colección
        required: true,
        unique : true
    },
    value : {type: String, required: true, unique: true},
    method : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TwoFactorAuth", // 👈 Referencia a la colección
        required: true
    },
    expiresAt : {type: Date, required: false, default: 0},
} , {timestamps: true});

twoFactorUserValueSchema.index({expiresAt : 1}, {expireAfterSeconds: 0});

export const TwoFactorUserValueModel = model<TwoFactorValueUserDocument>("TwoFactorValueUser" , twoFactorUserValueSchema);