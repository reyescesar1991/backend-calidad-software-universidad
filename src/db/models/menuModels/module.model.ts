import { Schema, model } from "mongoose";
import { IModuleType } from "../../../core/types";
import { RouteSchema } from "./route.model";


export interface ModuleDocument extends IModuleType, Document { };

export const ModuleSchema = new Schema<ModuleDocument>({

    id: { type: String, required: true },
    title: { type: String, required: true },
    routes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Route",                 
            required: true
        }
    ],
}, { timestamps: true });

export const ModuleModel = model<ModuleDocument>("Module", ModuleSchema);
