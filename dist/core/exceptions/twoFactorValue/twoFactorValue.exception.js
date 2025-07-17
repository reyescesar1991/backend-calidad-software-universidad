"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTwoFactorValueFoundError = exports.UserCodeNotMatchError = exports.UserTwoFactorValueNotFoundError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class UserTwoFactorValueNotFoundError extends general_exceptions_1.AppError {
    code = 2100;
    constructor(message = "El usuario no tiene registro en la tabla de segundo factor") {
        super(message);
        this.name = "UserTwoFactorValueNotFoundError";
    }
}
exports.UserTwoFactorValueNotFoundError = UserTwoFactorValueNotFoundError;
class UserCodeNotMatchError extends general_exceptions_1.AppError {
    code = 2101;
    constructor(message = "El código enviado no coincide con el enviado, intente nuevamente") {
        super(message);
        this.name = "UserCodeNotMatchError";
    }
}
exports.UserCodeNotMatchError = UserCodeNotMatchError;
class UserTwoFactorValueFoundError extends general_exceptions_1.AppError {
    code = 2102;
    constructor(message = "El usuario ya tiene un factor activo, ingreselo para continuar o genere otro") {
        super(message);
        this.name = "UserTwoFactorValueFoundError";
    }
}
exports.UserTwoFactorValueFoundError = UserTwoFactorValueFoundError;
//# sourceMappingURL=twoFactorValue.exception.js.map