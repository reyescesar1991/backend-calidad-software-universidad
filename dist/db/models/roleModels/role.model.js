"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = exports.RoleSchema = void 0;
const mongoose_1 = require("mongoose");
;
exports.RoleSchema = new mongoose_1.Schema({
    idRole: { type: String, required: true },
    name: { type: String, required: true },
    label: { type: String, required: true },
    permissions: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Permission"
        }],
    permissionsSecurity: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "PermissionSecurity"
        }],
    description: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    isDefault: { type: Boolean, required: true },
    managePermissions: { type: Boolean, required: true, default: false }
}, { timestamps: true });
exports.RoleModel = (0, mongoose_1.model)("Role", exports.RoleSchema);
//# sourceMappingURL=role.model.js.map