"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPermissionModel = exports.userPermissionSchema = void 0;
const mongoose_1 = require("mongoose");
;
exports.userPermissionSchema = new mongoose_1.Schema({
    idUser: { type: String, required: true, unique: true },
    roleId: {
        type: String,
        required: true,
        index: true
    },
    customPermissions: {
        type: [
            {
                permissionId: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: "Permission",
                    required: true
                },
                can: {
                    type: Boolean,
                    required: true,
                    default: true
                },
                permissionLabel: {
                    type: String,
                    required: true,
                }
            }
        ],
        default: [],
        validate: {
            validator: function (perms) {
                const ids = perms.map(p => p.permissionId.toString());
                return new Set(ids).size === ids.length;
            },
            message: "No se permiten permisos duplicados"
        }
    }
}, { timestamps: true, versionKey: false });
exports.UserPermissionModel = (0, mongoose_1.model)("UserPermission", exports.userPermissionSchema);
//# sourceMappingURL=userPermission.model.js.map