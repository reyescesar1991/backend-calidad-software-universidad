"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionModel = void 0;
const mongoose_1 = require("mongoose");
const PermissionSchema = new mongoose_1.Schema({
    label: { type: String, required: true },
    permission: { type: String, required: true, unique: true },
    can: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true, required: false }
});
exports.PermissionModel = (0, mongoose_1.model)("Permission", PermissionSchema);
//# sourceMappingURL=permission.model.js.map