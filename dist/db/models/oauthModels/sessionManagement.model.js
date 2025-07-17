"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManagementModel = exports.sessionManagementSchema = void 0;
const mongoose_1 = require("mongoose");
;
exports.sessionManagementSchema = new mongoose_1.Schema({
    userId: { type: String, required: true, unique: true },
    token: { type: String, required: true, unique: true },
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
    expiresAt: { type: Date, required: true }
}, { timestamps: true, versionKey: false });
exports.sessionManagementSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
exports.SessionManagementModel = (0, mongoose_1.model)("SessionManagement", exports.sessionManagementSchema);
//# sourceMappingURL=sessionManagement.model.js.map