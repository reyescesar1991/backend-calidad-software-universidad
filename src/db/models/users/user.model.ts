import { model, Schema } from "mongoose";
import { IUsersType } from "../../../core/types";
import mongoose from "mongoose";
import { StatusUserEnum } from "../../../core/enums";


export interface UserDocument extends Document { 

    _id: mongoose.Types.ObjectId;
    idUser: string,
    name: string,
    lastName: string,
    codeCountry: string,
    phoneNumber: string,
    email: string,
    password: string,
    username: string,
    status: StatusUserEnum.ACTIVE,
    hasTwoFactor : boolean,
    lastLogin : string,
    department : Schema.Types.ObjectId,
    roleConfig : Schema.Types.ObjectId,
    passwordHistory : Array<string>,
};

export const userSchema = new Schema<UserDocument>({

    idUser: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    codeCountry: { type: String, required: true, default: '58' },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    status: { type: String, required: true, default: StatusUserEnum.ACTIVE },
    hasTwoFactor : {type: Boolean, required: true, default: false},
    lastLogin : {type: String, required: false},
    department : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Department", 
        required: true 
    },
    roleConfig : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "RoleConfig", 
        required: true 
    },
    passwordHistory : {type: [String], required: false, default : []},
});

export const UserModel = model<UserDocument>("User", userSchema);

