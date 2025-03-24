import { model, Schema } from "mongoose";
import { IHeadquarters } from "../../../core/types";

export interface HeadquartersDocument extends Document, IHeadquarters{}

export const HeadquarterSchema = new Schema<HeadquartersDocument>({

    idHeadquarter : {type: String, required: true},
    label : {type: String, required: true},
    name : {type: String, required: true},
    address : {type: String, required: true},
    city : {type: String, required: true},
    state : {type: String, required: true},
    zipCode : {type: String, required: true},
    country : {type: String, required: true},
    phoneNumber : {type: String, required: true},
    email : {type: String, required: true},
    isActive : {type: Boolean, required: true},
    
});

export const HeadquartersModel = model<HeadquartersDocument>("Headquarter", HeadquarterSchema);