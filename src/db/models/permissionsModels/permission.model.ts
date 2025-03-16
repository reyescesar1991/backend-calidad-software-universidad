import { Schema, model } from "mongoose";
import { IPermissionType } from "../../../core/types";

interface PermissionDocument extends IPermissionType, Document {}

const PermissionSchema = new Schema<PermissionDocument>({

    label : {type: String, required: true},
    permission : {type: String, required: true, unique: true},
    can: {type: Boolean, default: false},
});

export const PermissionModel = model<PermissionDocument>("Permission", PermissionSchema);