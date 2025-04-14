import mongoose, { model, Schema } from "mongoose";
import { IUserPermissionSecurity } from "../../../core/types";

export interface UserPermissionSecurityDocument extends Document, IUserPermissionSecurity{};

export const userPermissionSecuritySchema = new Schema<UserPermissionSecurityDocument>({


    idUser : {type: String, required: true, unique: true},
    idRol : {
        type: String,
        required: true,
    },
    customPermissionsSecurity : {

        type: [

            {
                permissionSecurityId : {
                    type: Schema.Types.ObjectId,
                    ref: "PermissionSecurity",
                    required: true
                },
                can: {

                    type: Boolean,
                    required: true,
                    default: true,
                },
                permissionKey : {

                    type: String,
                    required: true,
                }
            }
        ],
        validate: { // Validación para evitar duplicados
                    validator: function (perms: Array<{ permissionSecurityId: mongoose.Types.ObjectId }>) {
                        const ids = perms.map(p => p.permissionSecurityId.toString());
                        return new Set(ids).size === ids.length;
                    },
                    message: "No se permiten permisos duplicados"
        }
    }

}, {timestamps: true, versionKey: false});

export const UserPermissionSecurityModel = model<UserPermissionSecurityDocument>("UserPermissionSecurity", userPermissionSecuritySchema);