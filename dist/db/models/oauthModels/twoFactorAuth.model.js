"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorAuthModel = exports.twoFactorAuthSchema = void 0;
const mongoose_1 = require("mongoose");
;
exports.twoFactorAuthSchema = new mongoose_1.Schema({
    //TODO: Eliminar test de aca
    method: { type: String, enum: ["sms", "email", "test", "test2"], required: true, unique: true },
    isEnabled: { type: Boolean, required: true, default: false },
    quantityUsers: { type: Number, required: false, default: 0 },
}, { timestamps: true });
exports.TwoFactorAuthModel = (0, mongoose_1.model)("TwoFactorAuth", exports.twoFactorAuthSchema);
//# sourceMappingURL=twoFactorAuth.model.js.map