"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
const general_exceptions_1 = require("../generals/general.exceptions");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function handleError(error) {
    const mongoErr = error;
    if (mongoErr.code === 11000 && mongoErr.keyPattern?.idUser) {
        throw new Error('Registro Duplicado');
    }
    // 2. Manejar errores específicos de JWT
    if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
        switch (error.message) {
            case 'invalid signature':
                throw new Error('Firma de token inválida. Posible manipulación o clave secreta incorrecta');
            case 'jwt expired':
                throw new Error('Token expirado. Por favor inicie sesión nuevamente');
            case 'jwt malformed':
                throw new Error('Token con formato inválido');
            default:
                throw new Error(`Error de token: ${error.message}`);
        }
    }
    if (error instanceof general_exceptions_1.AppError) {
        throw error;
    }
    else {
        throw new general_exceptions_1.UnexpectedError(error);
    }
}
//# sourceMappingURL=handleErrors.js.map