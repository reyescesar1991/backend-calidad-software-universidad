import { model, Schema } from "mongoose";
import { IRoleType } from "../../../core/types";

interface RoleDocument extends IRoleType, Document {};

const RoleSchema = new Schema<RoleDocument>({

    idRole : {type: String, required: true},
    name : {type: String, required: true},
    label : {type: String, required: true},
    permissions : [{ 
        type: Schema.Types.ObjectId, 
        ref: "Permission"
    }],
    description : {type: String, required: true},
    isActive : {type: Boolean, required: true},
    isDefault: {type: Boolean, required: true},
} , {timestamps: true});

export const RoleModel = model<RoleDocument>("Role", RoleSchema);