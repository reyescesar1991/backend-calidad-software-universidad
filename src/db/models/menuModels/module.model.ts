import mongoose, { Schema, model } from "mongoose";


export interface ModuleDocument extends Document { 

    _id: mongoose.Types.ObjectId;
    id: string,
    title: string,
    routes: Schema.Types.ObjectId[];
    active : boolean,
};

export const ModuleSchema = new Schema<ModuleDocument>({

    id: { type: String, required: true },
    title: { type: String, required: true },
    routes: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Route"
    }],
    active: {type: Boolean, required: false, default: true}
}, { timestamps: true });

export const ModuleModel = model<ModuleDocument>("Module", ModuleSchema);
