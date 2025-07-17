"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteModel = exports.RouteSchema = void 0;
const mongoose_1 = require("mongoose");
exports.RouteSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    idModule: { type: String, required: true },
    path: { type: String, required: true },
    icon: { type: String, required: true },
    active: { type: Boolean, required: true },
    subroutes: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Subroute"
        }],
}, { timestamps: true });
exports.RouteModel = (0, mongoose_1.model)("Route", exports.RouteSchema);
//# sourceMappingURL=route.model.js.map