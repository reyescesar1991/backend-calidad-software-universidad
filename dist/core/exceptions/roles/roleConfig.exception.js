"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolConfigMaxLoginAttemptsNotValidError = exports.RoleConfigRoleNotExistsError = exports.RoleConfigAlreadyExistsError = exports.RoleConfigAlreadyInactiveError = exports.RoleConfigAlreadyActiveError = exports.RoleConfigsNotFoundByFilterError = exports.FilterRoleConfigError = exports.RoleConfigNotFoundByNameError = exports.RoleConfigNotFoundError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class RoleConfigNotFoundError extends general_exceptions_1.AppError {
    code = 1601;
    constructor(message = "La configuración de rol no existe, intente nuevamente con un ID valido") {
        super(message);
        this.name = "RoleConfigNotFoundError";
    }
}
exports.RoleConfigNotFoundError = RoleConfigNotFoundError;
class RoleConfigNotFoundByNameError extends general_exceptions_1.AppError {
    code = 1602;
    constructor(message = "El nombre del rol de la configuración de rol no existe, intente nuevamente con un nombre valido") {
        super(message);
        this.name = "RoleConfigNotFoundByNameError";
    }
}
exports.RoleConfigNotFoundByNameError = RoleConfigNotFoundByNameError;
class FilterRoleConfigError extends general_exceptions_1.AppError {
    code = 1603;
    constructor(message = "El filtro no cumple con los parámetros de busqueda, intente nuevamente con un filtro valido") {
        super(message);
        this.name = "FilterRoleConfigError";
    }
}
exports.FilterRoleConfigError = FilterRoleConfigError;
class RoleConfigsNotFoundByFilterError extends general_exceptions_1.AppError {
    code = 1604;
    constructor(message = "No se encontro ninguna configuracion de rol que cumpla los parámetros de busqueda del filtro") {
        super(message);
        this.name = "RoleConfigsNotFoundByFilterError";
    }
}
exports.RoleConfigsNotFoundByFilterError = RoleConfigsNotFoundByFilterError;
class RoleConfigAlreadyActiveError extends general_exceptions_1.AppError {
    code = 1605;
    constructor(message = "La configuración de rol ya se encuentra activa") {
        super(message);
        this.name = "RoleConfigAlreadyActiveError";
    }
}
exports.RoleConfigAlreadyActiveError = RoleConfigAlreadyActiveError;
class RoleConfigAlreadyInactiveError extends general_exceptions_1.AppError {
    code = 1606;
    constructor(message = "La configuración de rol ya se encuentra inactiva") {
        super(message);
        this.name = "RoleConfigAlreadyInactiveError";
    }
}
exports.RoleConfigAlreadyInactiveError = RoleConfigAlreadyInactiveError;
class RoleConfigAlreadyExistsError extends general_exceptions_1.AppError {
    code = 1607;
    constructor(message = "La configuración de rol ya existe, intente con otro nombre de rol") {
        super(message);
        this.name = "RoleConfigAlreadyExistsError";
    }
}
exports.RoleConfigAlreadyExistsError = RoleConfigAlreadyExistsError;
class RoleConfigRoleNotExistsError extends general_exceptions_1.AppError {
    code = 1608;
    constructor(message = "El rol que integra agregar a la configuración de rol no existe, intente con un rol valido") {
        super(message);
        this.name = "RoleConfigRoleNotExistsError";
    }
}
exports.RoleConfigRoleNotExistsError = RoleConfigRoleNotExistsError;
class RolConfigMaxLoginAttemptsNotValidError extends general_exceptions_1.AppError {
    code = 1609;
    constructor(message = "Todas las configuraciones de rol minímo deben tener 2 intentos de login") {
        super(message);
        this.name = "RolConfigMaxLoginAttemptsNotValidError";
    }
}
exports.RolConfigMaxLoginAttemptsNotValidError = RolConfigMaxLoginAttemptsNotValidError;
//# sourceMappingURL=roleConfig.exception.js.map