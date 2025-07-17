"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmailNotMatchError = exports.UserStatusIsAlreadyNotActiveError = exports.TwoFactorUserIsAlreadyInactive = exports.TwoFactorUserIsAlreadyActive = exports.PasswordIsNotInTheHistoryUserError = exports.UserNotActiveError = exports.UserStatusAlreadyItsSameError = exports.UserUniqueKeysError = exports.UserAlreadyExistsError = exports.UserNotFoundByFilterError = exports.FilterUserConfigError = exports.UserNotFoundByUsernameError = exports.UserNotFoundByIdError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class UserNotFoundByIdError extends general_exceptions_1.AppError {
    code = 1801;
    constructor(message = "El usuario no fue encontrado, valide el ID e intente nuevamente") {
        super(message);
        this.name = "UserNotFoundByIdError";
    }
}
exports.UserNotFoundByIdError = UserNotFoundByIdError;
class UserNotFoundByUsernameError extends general_exceptions_1.AppError {
    code = 1802;
    constructor(message = "El usuario no fue encontrado, valide el usuario e intente nuevamente") {
        super(message);
        this.name = "UserNotFoundByUsernameError";
    }
}
exports.UserNotFoundByUsernameError = UserNotFoundByUsernameError;
class FilterUserConfigError extends general_exceptions_1.AppError {
    code = 1803;
    constructor(message = "El filtro no cumple con los parámetros de busqueda, intente nuevamente con un filtro valido") {
        super(message);
        this.name = "FilterUserConfigError";
    }
}
exports.FilterUserConfigError = FilterUserConfigError;
class UserNotFoundByFilterError extends general_exceptions_1.AppError {
    code = 1804;
    constructor(message = "No se han encontrado usuarios de acuerdo a los parámetros del filtro") {
        super(message);
        this.name = "UserNotFoundByFilterError";
    }
}
exports.UserNotFoundByFilterError = UserNotFoundByFilterError;
class UserAlreadyExistsError extends general_exceptions_1.AppError {
    code = 1805;
    constructor(message = "El usuario ya existe en el sistema, introduzca un ID diferente") {
        super(message);
        this.name = "UserAlreadyExistsError";
    }
}
exports.UserAlreadyExistsError = UserAlreadyExistsError;
class UserUniqueKeysError extends general_exceptions_1.AppError {
    code = 1806;
    constructor(message = "Los campos idUser, username, phone y email deben ser unicos por usuario, alguno de los valores colocados ya le pertenecen a otro usuario") {
        super(message);
        this.name = "UserUniqueKeysError";
    }
}
exports.UserUniqueKeysError = UserUniqueKeysError;
class UserStatusAlreadyItsSameError extends general_exceptions_1.AppError {
    code = 1807;
    constructor(message = "El estatus actual del usuario es el mismo que se quiere colocar, intente con uno diferente") {
        super(message);
        this.name = "UserStatusAlreadyItsSameError";
    }
}
exports.UserStatusAlreadyItsSameError = UserStatusAlreadyItsSameError;
class UserNotActiveError extends general_exceptions_1.AppError {
    code = 1808;
    constructor(message = "El usuario no se encuentra activo en el sistema, no puede realizar operaciones") {
        super(message);
        this.name = "UserNotActiveError";
    }
}
exports.UserNotActiveError = UserNotActiveError;
class PasswordIsNotInTheHistoryUserError extends general_exceptions_1.AppError {
    code = 1809;
    constructor(message = "La contraseña no se encontró en el historico del usuario, intente de nuevo") {
        super(message);
        this.name = "PasswordIsNotInTheHistoryUserError";
    }
}
exports.PasswordIsNotInTheHistoryUserError = PasswordIsNotInTheHistoryUserError;
class TwoFactorUserIsAlreadyActive extends general_exceptions_1.AppError {
    code = 1810;
    constructor(message = "La validación por segundo factor del usuario ya se encuentra activa") {
        super(message);
        this.name = "TwoFactorUserIsAlreadyActive";
    }
}
exports.TwoFactorUserIsAlreadyActive = TwoFactorUserIsAlreadyActive;
class TwoFactorUserIsAlreadyInactive extends general_exceptions_1.AppError {
    code = 1811;
    constructor(message = "La validación por segundo factor del usuario ya se encuentra inactiva") {
        super(message);
        this.name = "TwoFactorUserIsAlreadyInactive";
    }
}
exports.TwoFactorUserIsAlreadyInactive = TwoFactorUserIsAlreadyInactive;
class UserStatusIsAlreadyNotActiveError extends general_exceptions_1.AppError {
    code = 1812;
    constructor(message = "El usuario no se encuentra activo en la aplicación") {
        super(message);
        this.name = "UserStatusIsAlreadyNotActiveError";
    }
}
exports.UserStatusIsAlreadyNotActiveError = UserStatusIsAlreadyNotActiveError;
class UserEmailNotMatchError extends general_exceptions_1.AppError {
    code = 1813;
    constructor(message = "El email del usuario no es el mismo registrado previamente, valide su información") {
        super(message);
        this.name = "UserEmailNotMatchError";
    }
}
exports.UserEmailNotMatchError = UserEmailNotMatchError;
//# sourceMappingURL=user.exception.js.map