"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryProductModel = exports.categoryProductSchema = void 0;
const mongoose_1 = require("mongoose");
;
exports.categoryProductSchema = new mongoose_1.Schema({
    idCategory: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    name: { type: String, required: false },
    slug: { type: String, required: false },
    description: { type: String, required: false },
    isVisible: { type: Boolean, required: false, default: false },
    isActive: { type: Boolean, required: false, default: true },
}, { timestamps: true });
exports.CategoryProductModel = (0, mongoose_1.model)("CategoryProduct", exports.categoryProductSchema);
//# sourceMappingURL=categoryProduct.model.js.map