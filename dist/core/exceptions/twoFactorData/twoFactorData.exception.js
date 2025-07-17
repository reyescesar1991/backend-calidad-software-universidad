"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorDataAlreadyDisableError = exports.TwoFactorDataAlreadyEnableError = exports.TwoFactorDataNotFoundByMethodError = exports.TwoFactorDataQuantityNewFactorError = exports.TwoFactorDataAlreadyExistsByMethodError = exports.TwoFactorDataNotExistsError = exports.TwoFactorDataNotFoundInDatabaseError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class TwoFactorDataNotFoundInDatabaseError extends general_exceptions_1.AppError {
    code = 1901;
    constructor(message = "No existen factores de autenticación en la base de datos") {
        super(message);
        this.name = "TwoFactorDataNotFoundInDatabaseError";
    }
}
exports.TwoFactorDataNotFoundInDatabaseError = TwoFactorDataNotFoundInDatabaseError;
class TwoFactorDataNotExistsError extends general_exceptions_1.AppError {
    code = 1902;
    constructor(message = "No se encontró un factor asociado a ese ID, intente nuevamente") {
        super(message);
        this.name = "TwoFactorDataNotExistsError";
    }
}
exports.TwoFactorDataNotExistsError = TwoFactorDataNotExistsError;
class TwoFactorDataAlreadyExistsByMethodError extends general_exceptions_1.AppError {
    code = 1903;
    constructor(message = "Se encontró un factor asociado a ese nombre de método, intente nuevamente con uno diferente") {
        super(message);
        this.name = "TwoFactorDataAlreadyExistsByMethodError";
    }
}
exports.TwoFactorDataAlreadyExistsByMethodError = TwoFactorDataAlreadyExistsByMethodError;
class TwoFactorDataQuantityNewFactorError extends general_exceptions_1.AppError {
    code = 1904;
    constructor(message = "La cantidad de personas asociadas a un nuevo factor de autenticación debe ser cero") {
        super(message);
        this.name = "TwoFactorDataQuantityNewFactorError";
    }
}
exports.TwoFactorDataQuantityNewFactorError = TwoFactorDataQuantityNewFactorError;
class TwoFactorDataNotFoundByMethodError extends general_exceptions_1.AppError {
    code = 1905;
    constructor(message = "No se encontró un factor asociado a ese nombre de método, intente nuevamente con uno diferente") {
        super(message);
        this.name = "TwoFactorDataNotFoundByMethodError";
    }
}
exports.TwoFactorDataNotFoundByMethodError = TwoFactorDataNotFoundByMethodError;
class TwoFactorDataAlreadyEnableError extends general_exceptions_1.AppError {
    code = 1906;
    constructor(message = "El factor de autenticación ya se encuentra activo") {
        super(message);
        this.name = "TwoFactorDataAlreadyEnableError";
    }
}
exports.TwoFactorDataAlreadyEnableError = TwoFactorDataAlreadyEnableError;
class TwoFactorDataAlreadyDisableError extends general_exceptions_1.AppError {
    code = 1907;
    constructor(message = "El factor de autenticación ya se encuentra inactivo") {
        super(message);
        this.name = "TwoFactorDataAlreadyDisableError";
    }
}
exports.TwoFactorDataAlreadyDisableError = TwoFactorDataAlreadyDisableError;
//# sourceMappingURL=twoFactorData.exception.js.map