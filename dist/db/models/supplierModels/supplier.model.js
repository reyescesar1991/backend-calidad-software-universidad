"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierModel = exports.supplierSchema = void 0;
const mongoose_1 = require("mongoose");
exports.supplierSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    tradeName: { type: String, required: true, unique: true },
    contactPerson: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    taxId: { type: String, required: true, unique: true },
    businessRegistrationNumber: { type: String, required: true, unique: true },
    paymentTerm: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "PaymentTerm", // 👈 Referencia a la colección
        required: true
    },
    isActive: { type: Boolean, required: false, default: true },
    notes: { type: String, required: false },
}, { timestamps: true, versionKey: false });
exports.SupplierModel = (0, mongoose_1.model)("Supplier", exports.supplierSchema);
//# sourceMappingURL=supplier.model.js.map