"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissionSecurityModel = exports.userPermissionSecuritySchema = void 0;
const mongoose_1 = require("mongoose");
;
exports.userPermissionSecuritySchema = new mongoose_1.Schema({
    idUser: { type: String, required: true, unique: true },
    idRol: {
        type: String,
        required: true,
    },
    customPermissionsSecurity: {
        type: [
            {
                permissionSecurityId: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: "PermissionSecurity",
                    required: true
                },
                can: {
                    type: Boolean,
                    required: true,
                    default: true,
                },
                permissionKey: {
                    type: String,
                    required: true,
                }
            }
        ],
        validate: {
            validator: function (perms) {
                const ids = perms.map(p => p.permissionSecurityId.toString());
                return new Set(ids).size === ids.length;
            },
            message: "No se permiten permisos duplicados"
        }
    }
}, { timestamps: true, versionKey: false });
exports.UserPermissionSecurityModel = (0, mongoose_1.model)("UserPermissionSecurity", exports.userPermissionSecuritySchema);
//# sourceMappingURL=userPermissionSecurity.model.js.map