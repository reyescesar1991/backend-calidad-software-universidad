import { model, Schema } from "mongoose";
import { IRoleConfigType } from "../../../core/types";

export interface RoleConfigDocument extends Document, IRoleConfigType {};

export const roleConfigSchema = new Schema<RoleConfigDocument>({

    rolID : {
        type: Schema.Types.ObjectId,
        ref: "Role", // 👈 Referencia a la colección
        required: true
    },
    maxLoginAttempts : {type: Number, required: true, default : 1},
    isActive : {type: Boolean, required: false, default: true}
 
});

export const RoleConfigModel = model<RoleConfigDocument>("RoleConfig" , roleConfigSchema);