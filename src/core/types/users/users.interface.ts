import mongoose from "mongoose";
import { StatusUserEnum } from "../../enums";

export interface IUsersType {

    idUser : string;
    rol : mongoose.Types.ObjectId;
    name : string;
    lastName : string;
    codeCountry : string;
    phoneNumber : string;
    email : string;
    password : string;
    username : string;
    status : StatusUserEnum;
    hasTwoFactor : boolean;
    lastLogin ?: string;
    department : mongoose.Types.ObjectId;
    roleConfig: mongoose.Types.ObjectId; 
    passwordHistory?: string[];
}