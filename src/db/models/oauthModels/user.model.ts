import { model, Schema } from "mongoose";
import { IUsersType } from "../../../core/types";
import mongoose from "mongoose";
import { StatusUserEnum } from "../../../core/enums";


export interface UserDocument extends Document, IUsersType { };

export const userSchema = new Schema<UserDocument>({

    idUser: { type: String, required: true, unique: true },
    rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    },
    headquarter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Headquarter",
        required: true
    },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    codeCountry: { type: String, required: true, default: '58' },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    status: { type: String, required: true, default: StatusUserEnum.active },
    hasTwoFactor : {type: Boolean, required: true, default: false},
    lastLogin : {type: String, required: false},
    department : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Role", 
        required: true 
    },
});

export const UserModel = model<UserDocument>("User", userSchema);

