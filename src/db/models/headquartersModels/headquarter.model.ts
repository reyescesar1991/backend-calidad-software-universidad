import mongoose, { model, Schema } from "mongoose";
import { VALID_LOCATIONS } from "../../../core/const";

export interface HeadquartersDocument extends Document{

    _id: mongoose.Types.ObjectId;
    idHeadquarter : string,
    label : string,
    name : string,
    address : string,
    city : string,
    state : string,
    zipCode : string,
    country : string,
    phoneNumber : string,
    email : string,
    isActive : boolean,
    geoLocation: { 
        city: string;
        state: string;
        zipCode : string;
    };
}

export const HeadquarterSchema = new Schema<HeadquartersDocument>({

    idHeadquarter : {type: String, required: true},
    label : {type: String, required: true, unique: true},
    name : {type: String, required: true, unique: true},
    address : {type: String, required: true},
    country : {type: String, required: false, default : 'Venezuela'},
    phoneNumber : {type: String, required: true, unique: true},
    email : {type: String, required: true, unique: true},
    isActive : {type: Boolean, required: true},
    geoLocation: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode : { type : String, required: true},
    }
    
}, {timestamps: true, versionKey: false});

export const HeadquartersModel = model<HeadquartersDocument>("Headquarter", HeadquarterSchema);