import mongoose, { model, Schema } from "mongoose";

export interface SecurityAuditDocument extends Document {

    _id: mongoose.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId,
    loginAttempts: number;
    secondFactorAttempts: number;
    lastFailedLogin?: Date;
    blockedUntil?: Date;

};

export const securityAuditSchema = new Schema<SecurityAuditDocument>({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // 👈 Referencia a la colección
        required: true,
        unique: true
    },
    loginAttempts: { type: Number, required: true, default: 0, max : 3 },
    secondFactorAttempts: { type: Number, required: true, default: 0, max : 3 },
    lastFailedLogin: { type: Date, required: true, default : new Date(Date.now()) },
    blockedUntil: { type: Date, required: true, default : new Date(Date.now()) },
}, { timestamps: true, versionKey: false });


export const SecurityAuditModel = model<SecurityAuditDocument>("SecurityAudit", securityAuditSchema);