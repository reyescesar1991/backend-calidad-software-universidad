import { model, Schema } from "mongoose";
import { IRoleType } from "../../../core/types";

export interface RoleDocument extends IRoleType, Document {};

export const RoleSchema = new Schema<RoleDocument>({

    idRole : {type: String, required: true},
    name : {type: String, required: true},
    label : {type: String, required: true},
    permissions : [{ 
        type: Schema.Types.ObjectId, 
        ref: "Permission"
    }],
    permissionsSecurity : [{ 
        type: Schema.Types.ObjectId, 
        ref: "PermissionSecurity"
    }],
    description : {type: String, required: true},
    isActive : {type: Boolean, required: true},
    isDefault: {type: Boolean, required: true},
} , {timestamps: true});

export const RoleModel = model<RoleDocument>("Role", RoleSchema);