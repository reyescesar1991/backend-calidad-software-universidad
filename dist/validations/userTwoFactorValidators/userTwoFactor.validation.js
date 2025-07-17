"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTwoFactorActiveSchemaZod = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.UserTwoFactorActiveSchemaZod = zod_1.z.object({
    userId: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
    twoFactorId: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
    isActive: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=userTwoFactor.validation.js.map