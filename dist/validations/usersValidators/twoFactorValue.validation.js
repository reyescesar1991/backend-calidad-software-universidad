"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTwoFactorValueUserSchemaZod = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const regex = /^\d+$/;
exports.UserTwoFactorValueUserSchemaZod = zod_1.z.object({
    userId: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
    method: zod_1.z.instanceof(mongoose_1.default.Types.ObjectId).refine(val => val instanceof mongoose_1.default.Types.ObjectId, { message: "Debe ser un ObjectId válido de Mongoose" }),
    value: zod_1.z.string().regex(regex, "El valor del factor de autenticación debe ser un valor númerico"),
    expiresAt: zod_1.z.date(),
});
//# sourceMappingURL=twoFactorValue.validation.js.map