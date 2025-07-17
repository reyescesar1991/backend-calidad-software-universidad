"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleConfigModel = exports.roleConfigSchema = void 0;
const mongoose_1 = require("mongoose");
;
exports.roleConfigSchema = new mongoose_1.Schema({
    rolID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Role", // 👈 Referencia a la colección
        required: true
    },
    maxLoginAttempts: { type: Number, required: true, default: 1 },
    isActive: { type: Boolean, required: false, default: true },
    rolName: { type: String, required: true, unique: true },
});
exports.RoleConfigModel = (0, mongoose_1.model)("RoleConfig", exports.roleConfigSchema);
//# sourceMappingURL=roleConfig.model.js.map