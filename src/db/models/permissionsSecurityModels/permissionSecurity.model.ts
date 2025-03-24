import { model, Schema } from "mongoose";
import { IPermissionSecurity } from "../../../core/types";

export interface PermissionSecurityDocument extends Document, IPermissionSecurity{};

export const permissionSecuritySchema = new Schema<PermissionSecurityDocument>({

    label : {type: String, required: true},
    permission : {type: String, required: true, unique: true},
    can : {type: Boolean, required: true, default: false},
    id : {type : String, required : true},
    description : {type : String, required: false},
    category : {type: String, required: false},
    isSystemDefined : {type: Boolean, required: false, default: false}
}, {timestamps: true});


export const PermissionSecurityModel = model<PermissionSecurityDocument>("PermissionSecurity", permissionSecuritySchema);