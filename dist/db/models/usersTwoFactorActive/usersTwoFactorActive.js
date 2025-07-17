"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTwoFactorActiveModel = exports.UserTwoFactorActiveSchema = void 0;
const mongoose_1 = require("mongoose");
;
exports.UserTwoFactorActiveSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
    },
    twoFactorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "TwoFactorAuth",
    },
    isActive: { type: Boolean, required: true, default: true },
}, { timestamps: true, versionKey: false });
exports.UserTwoFactorActiveModel = (0, mongoose_1.model)("UserTwoFactorModel", exports.UserTwoFactorActiveSchema);
//# sourceMappingURL=usersTwoFactorActive.js.map