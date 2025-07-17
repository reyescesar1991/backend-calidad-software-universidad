"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubrouteModel = exports.SubrouteSchema = void 0;
const mongoose_1 = require("mongoose");
;
exports.SubrouteSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    path: { type: String, required: true },
    active: { type: Boolean, required: true },
    permissionKey: { type: String, required: true },
    mainRoute: { type: String, required: true },
}, { timestamps: true });
exports.SubrouteModel = (0, mongoose_1.model)("Subroute", exports.SubrouteSchema);
//# sourceMappingURL=subroute.model.js.map