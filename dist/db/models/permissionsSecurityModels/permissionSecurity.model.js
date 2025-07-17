"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionSecurityModel = exports.permissionSecuritySchema = void 0;
const mongoose_1 = require("mongoose");
;
exports.permissionSecuritySchema = new mongoose_1.Schema({
    label: { type: String, required: true },
    permission: { type: String, required: true, unique: true },
    can: { type: Boolean, required: true, default: false },
    id: { type: String, required: true },
    description: { type: String, required: false },
    category: { type: String, required: false },
    isSystemDefined: { type: Boolean, required: false, default: false },
    isActive: { type: Boolean, required: false, default: true }
}, { timestamps: true });
exports.PermissionSecurityModel = (0, mongoose_1.model)("PermissionSecurity", exports.permissionSecuritySchema);
//# sourceMappingURL=permissionSecurity.model.js.map