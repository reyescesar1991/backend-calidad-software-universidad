"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorRequiredError = exports.AuthPasswordMismatchUsernameError = exports.UnauthorizedException2FAError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class UnauthorizedException2FAError extends general_exceptions_1.AppError {
    code = 2300;
    constructor(message = "La verificación de dos factores ha expirado o no se ha realizado. Recuerde que su código de autenticación dura 1 minuto") {
        super(message);
        this.name = "UnauthorizedException2FAError";
    }
}
exports.UnauthorizedException2FAError = UnauthorizedException2FAError;
class AuthPasswordMismatchUsernameError extends general_exceptions_1.AppError {
    code = 2301;
    constructor(message = "Los datos no son validos, intente nuevamente") {
        super(message);
        this.name = "AuthPasswordMismatchUsernameError";
    }
}
exports.AuthPasswordMismatchUsernameError = AuthPasswordMismatchUsernameError;
class TwoFactorRequiredError extends Error {
    userId;
    preAuthToken;
    statusCode = 2302; // Unauthorized
    constructor(message, userId, preAuthToken) {
        super(message);
        this.userId = userId;
        this.preAuthToken = preAuthToken;
        this.name = 'TwoFactorRequiredError';
    }
}
exports.TwoFactorRequiredError = TwoFactorRequiredError;
//# sourceMappingURL=oauth.exception.js.map