import mongoose, { model, Schema } from "mongoose";

export interface RoleDocument extends Document {

    _id: mongoose.Types.ObjectId;
    idRole : string,
    name : string,
    label : string,
    permissions : mongoose.Types.ObjectId[] // Cambiar aquí
    permissionsSecurity : mongoose.Types.ObjectId[]
    description : string,
    isActive : boolean,
    isDefault: boolean,
    managePermissions : boolean,
};

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
    managePermissions : {type: Boolean, required: true, default: false}
    
} , {timestamps: true});

export const RoleModel = model<RoleDocument>("Role", RoleSchema);