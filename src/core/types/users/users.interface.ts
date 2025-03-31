import mongoose from "mongoose";

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
    status : string;
    hasTwoFactor : mongoose.Types.ObjectId;
    lastLogin : string;
    department : mongoose.Types.ObjectId;
}