"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.productSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const enums_1 = require("../../../core/enums");
;
exports.productSchema = new mongoose_1.Schema({
    idProduct: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    sku: { type: String, required: true, unique: true },
    barcode: { type: String, required: true, unique: true },
    categoryId: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "CategoryProduct",
        required: true
    },
    supplierId: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true
    },
    brand: { type: String, required: true },
    purchasePrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    currency: { type: String, required: true, default: enums_1.CurrencyEnum.DOLARES },
    minimumStockLevel: { type: Number, required: true },
    maximumStockLevel: { type: Number, required: true },
    unitOfMeasure: { type: String, required: true, default: enums_1.UnitMeasureEnum.UNIDAD },
    imageUrl: { type: String, required: false },
    updatedAt: { type: Date, required: false, default: new Date(Date.now()) },
    isActive: { type: Boolean, required: false, default: true },
    notes: { type: String, required: false },
}, { timestamps: true });
exports.productSchema.index({ categoryId: 1 });
exports.productSchema.index({ supplierId: 1 });
exports.productSchema.index({ isActive: 1 });
exports.productSchema.index({ categoryId: 1, isActive: 1 });
exports.productSchema.index({ supplierId: 1, isActive: 1 });
exports.productSchema.index({ name: "text", description: "text" });
exports.productSchema.index({ updatedAt: -1 }); // Los más recientes primero
exports.ProductModel = (0, mongoose_1.model)("Product", exports.productSchema);
//# sourceMappingURL=product.model.js.map