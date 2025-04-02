import mongoose from "mongoose";
import { StatusUserEnum } from "../../enums";

export interface IUsersType {

    idUser : string;
    rol : mongoose.Types.ObjectId;
    headquarter : mongoose.Types.ObjectId;
    name : string;
    lastName : string;
    codeCountry : string;
    phoneNumber : string;
    email : string;
    password : string;
    username : string;
    status : StatusUserEnum; //USar un enum
    hasTwoFactor : boolean;
    lastLogin ?: string;
    department : mongoose.Types.ObjectId;
    loginAttempts: number; // Para bloquear tras intentos fallidos
    passwordHistory: string[]; // Últimas contraseñas (hasheadas)
}