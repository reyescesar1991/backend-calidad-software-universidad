"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const enums_1 = require("../../../core/enums");
;
exports.userSchema = new mongoose_1.Schema({
    idUser: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    codeCountry: { type: String, required: true, default: '58' },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    status: { type: String, required: true, default: enums_1.StatusUserEnum.ACTIVE },
    hasTwoFactor: { type: Boolean, required: true, default: false },
    lastLogin: { type: String, required: false },
    department: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    roleConfig: {
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "RoleConfig",
        required: true
    },
    passwordHistory: { type: [String], required: false, default: [] },
});
// Define el límite para el historial de contraseñas
const PASSWORD_HISTORY_LIMIT = 5; // Por ejemplo, mantener las últimas 5 contraseñas
// Middleware 'pre' para el evento 'save'
// Esto se ejecutará antes de que el documento se guarde en la base de datos
exports.userSchema.pre('save', function (next) {
    // 'this' se refiere al documento actual que se está guardando
    // Si el historial de contraseñas excede el límite, eliminamos las más antiguas
    if (this.passwordHistory && this.passwordHistory.length > PASSWORD_HISTORY_LIMIT) {
        // slice(startIndex, endIndex) crea un nuevo array desde startIndex hasta endIndex (sin incluir endIndex)
        // Si PASSWORD_HISTORY_LIMIT es 5, y tenemos 6 elementos, queremos los últimos 5,
        // por lo que el inicio sería 6 - 5 = 1.
        this.passwordHistory = this.passwordHistory.slice(this.passwordHistory.length - PASSWORD_HISTORY_LIMIT);
    }
    next(); // Continúa con la operación de guardado
});
exports.UserModel = (0, mongoose_1.model)("User", exports.userSchema);
//# sourceMappingURL=user.model.js.map