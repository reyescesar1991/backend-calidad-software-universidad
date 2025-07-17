"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedSessionError = exports.UnexpectedError = exports.DatabaseConnectionError = exports.BadFormatMongoIDError = exports.InvalidParamError = exports.AppError = void 0;
class AppError extends Error {
}
exports.AppError = AppError;
class InvalidParamError extends AppError {
    code = 400;
    constructor(message) {
        super(message);
        this.name = "InvalidParamError";
    }
}
exports.InvalidParamError = InvalidParamError;
class BadFormatMongoIDError extends AppError {
    code = 400;
    constructor() {
        super("Formato de ID de objeto no es valido");
        this.name = "BadFormatMongoIDError";
    }
}
exports.BadFormatMongoIDError = BadFormatMongoIDError;
class DatabaseConnectionError extends AppError {
    code = 500;
    constructor() {
        super("Error en consulta, intente nuevamente");
        this.name = "DatabaseConnectionError";
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
class UnexpectedError extends AppError {
    code = 500;
    details;
    constructor(error, message = "Ha ocurrido un error inesperado, intente nuevamente" + error) {
        super(message);
        this.name = "UnexpectedError";
    }
}
exports.UnexpectedError = UnexpectedError;
class UnauthorizedSessionError extends AppError {
    code = 401;
    details;
    constructor(message = "Usted no esta autorizado para realizar esta accion, intente nuevamente", error) {
        super(message);
        this.name = "UnauthorizedSessionError";
    }
}
exports.UnauthorizedSessionError = UnauthorizedSessionError;
//# sourceMappingURL=general.exceptions.js.map