"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyNotHaveASessionError = exports.UserSessionTokenIsNotValid = exports.UserIsNotLoggedError = exports.UserAlreadyHaveASessionError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class UserAlreadyHaveASessionError extends general_exceptions_1.AppError {
    code = 2001;
    constructor(message = "El usuario tiene una sesión activa") {
        super(message);
        this.name = "UserAlreadyHaveASessionError";
    }
}
exports.UserAlreadyHaveASessionError = UserAlreadyHaveASessionError;
class UserIsNotLoggedError extends general_exceptions_1.AppError {
    code = 2002;
    constructor(message = "El usuario no tiene una sesión activa") {
        super(message);
        this.name = "UserIsNotLoggedError";
    }
}
exports.UserIsNotLoggedError = UserIsNotLoggedError;
class UserSessionTokenIsNotValid extends general_exceptions_1.AppError {
    code = 2003;
    constructor(message = "El token enviado por parámetros no coincide con el token guardado en base de datos, intente con un token valido") {
        super(message);
        this.name = "UserSessionTokenIsNotValid";
    }
}
exports.UserSessionTokenIsNotValid = UserSessionTokenIsNotValid;
class UserAlreadyNotHaveASessionError extends general_exceptions_1.AppError {
    code = 2004;
    constructor(message = "El usuario no tiene una sesión activa") {
        super(message);
        this.name = "UserAlreadyNotHaveASessionError";
    }
}
exports.UserAlreadyNotHaveASessionError = UserAlreadyNotHaveASessionError;
//# sourceMappingURL=sessionManagament.exception.js.map