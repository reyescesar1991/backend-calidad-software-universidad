"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleModel = exports.ModuleSchema = void 0;
const mongoose_1 = require("mongoose");
;
exports.ModuleSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    routes: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Route"
        }],
    active: { type: Boolean, required: false, default: true }
}, { timestamps: true });
exports.ModuleModel = (0, mongoose_1.model)("Module", exports.ModuleSchema);
//# sourceMappingURL=module.model.js.map