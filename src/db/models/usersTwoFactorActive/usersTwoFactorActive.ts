import mongoose, { model, Schema } from "mongoose";

export interface UsersTwoFactorActiveDocument extends Document {

    _id: mongoose.Types.ObjectId;
    userId : Schema.Types.ObjectId
    twoFactorId : Schema.Types.ObjectId
    isActive : boolean,
};

export const UserTwoFactorActiveSchema = new Schema<UsersTwoFactorActiveDocument>({

    userId : { 
        type: Schema.Types.ObjectId, 
        ref: "User",
        unique: true,
    },
    twoFactorId : { 
        type: Schema.Types.ObjectId, 
        ref: "TwoFactorAuth",
    },
    isActive : {type: Boolean, required: true, default: true},
    
} , {timestamps: true, versionKey: false});

export const UserTwoFactorActiveModel = model<UsersTwoFactorActiveDocument>("UserTwoFactorModel", UserTwoFactorActiveSchema);