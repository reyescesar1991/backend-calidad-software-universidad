"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentModel = exports.departmentSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
exports.departmentSchema = new mongoose_1.Schema({
    idDepartment: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    headquartersId: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "Headquarter",
        required: true
    },
    headquartersName: { type: String, required: true },
    isActive: { type: Boolean, required: false, default: true },
});
exports.DepartmentModel = (0, mongoose_1.model)("Department", exports.departmentSchema);
//# sourceMappingURL=department.model.js.map