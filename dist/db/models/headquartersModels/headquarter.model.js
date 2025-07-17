"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadquartersModel = exports.HeadquarterSchema = void 0;
const mongoose_1 = require("mongoose");
exports.HeadquarterSchema = new mongoose_1.Schema({
    idHeadquarter: { type: String, required: true },
    label: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    country: { type: String, required: false, default: 'Venezuela' },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true },
    geoLocation: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
    }
}, { timestamps: true, versionKey: false });
exports.HeadquartersModel = (0, mongoose_1.model)("Headquarter", exports.HeadquarterSchema);
//# sourceMappingURL=headquarter.model.js.map