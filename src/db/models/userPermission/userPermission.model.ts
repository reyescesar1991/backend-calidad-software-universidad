import mongoose, { model, Schema } from "mongoose";
import { IUserPermission } from "../../../core/types";

export interface UserPermissionDocument extends Document, IUserPermission{};

export const userPermissionSchema = new Schema<UserPermissionDocument>({

    idUser : {type: String, required: true, unique: true},
    roleId : {
        type: String,
        required: true,
        index : true
    },
    customPermissions: {
        type: [
            {
                permissionId: {
                    type: Schema.Types.ObjectId,
                    ref: "Permission",
                    required: true
                },
                can: {
                    type: Boolean,
                    required: true,
                    default: true
                },
                permissionLabel : {

                    type: String,
                    required: true,
                }
            }
        ],
        default: [],
        validate: { // Validación para evitar duplicados
            validator: function (perms: Array<{ permissionId: mongoose.Types.ObjectId }>) {
                const ids = perms.map(p => p.permissionId.toString());
                return new Set(ids).size === ids.length;
            },
            message: "No se permiten permisos duplicados"
        }
    }
}, {timestamps: true, versionKey: false});

export const UserPermissionModel = model<UserPermissionDocument>("UserPermission", userPermissionSchema);

