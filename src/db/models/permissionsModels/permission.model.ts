import mongoose, { Model, Schema, model } from "mongoose";

export interface PermissionDocument extends Document {

    _id: mongoose.Types.ObjectId;
    label: string;
    permission: string;
    can?: boolean;
    isActive ?: boolean;
}

const PermissionSchema = new Schema<PermissionDocument>({

    label : {type: String, required: true},
    permission : {type: String, required: true, unique: true},
    can: {type: Boolean, default: false},
    isActive : {type: Boolean, default: true, required: false}
});

export const PermissionModel: Model<PermissionDocument> = model("Permission", PermissionSchema);