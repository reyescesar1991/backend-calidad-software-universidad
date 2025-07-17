"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectIdSchema = void 0;
// src/validations/sharedValidators.ts
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
exports.objectIdSchema = zod_1.z.string().transform((val, ctx) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(val)) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "ID no es un ObjectId válido",
        });
        return zod_1.z.NEVER; // Detiene la ejecución
    }
    return new mongoose_1.default.Types.ObjectId(val); // Convierte a ObjectId
});
//# sourceMappingURL=sharedValidators.js.map