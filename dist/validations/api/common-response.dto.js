"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponseSchema = void 0;
const zod_1 = require("zod");
// Define a general structure for successful API responses
exports.apiResponseSchema = zod_1.z.object({
    message: zod_1.z.string().optional(), // A human-readable message, optional for some success cases
    code: zod_1.z.string().optional(), // An optional internal code for specific success/error types
    data: zod_1.z.any().optional(), // The actual payload
});
//# sourceMappingURL=common-response.dto.js.map