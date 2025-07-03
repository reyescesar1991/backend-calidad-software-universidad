import mongoose, { model, Schema } from "mongoose";

export interface CategoryProductDocument extends Document {

    _id: mongoose.Types.ObjectId;
    idCategory : string,
    label : string,
    name : string,
    slug : string,
    description : string,
    isVisible : boolean,
    isActive : boolean,
};

export const categoryProductSchema = new Schema<CategoryProductDocument>({

    idCategory : {type: String, required: true, unique : true},
    label : {type: String, required: true},
    name : {type: String, required: false},
    slug : {type: String, required: false},
    description : {type: String, required: false},
    isVisible : {type: Boolean, required: false, default : false},
    isActive : {type: Boolean, required: false, default: true},
}, {timestamps: true});

export const CategoryProductModel = model<CategoryProductDocument>("CategoryProduct" , categoryProductSchema);