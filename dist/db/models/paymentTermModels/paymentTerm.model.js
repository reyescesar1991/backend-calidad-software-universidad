"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTermModel = exports.paymentTermSchema = void 0;
const mongoose_1 = require("mongoose");
;
exports.paymentTermSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    daysToPay: { type: Number, required: true, min: 1 },
    discount: { type: Number, required: false, max: 15 },
    isActive: { type: Boolean, required: true, default: true },
});
exports.PaymentTermModel = (0, mongoose_1.model)("PaymentTerm", exports.paymentTermSchema);
//# sourceMappingURL=paymentTerm.model.js.map