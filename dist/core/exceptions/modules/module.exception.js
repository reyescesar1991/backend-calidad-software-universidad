"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleAlreadyInactiveError = exports.ModuleAlreadyActiveError = exports.ModuleAlreadyExistsError = exports.ModulesNotFoundByFilterError = exports.FilterModuleError = exports.ModuleNotFoundError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class ModuleNotFoundError extends general_exceptions_1.AppError {
    code = 1401;
    constructor(message = 'Módulo no encontrado, intente con un ID valido') {
        super(message);
        this.name = "ModuleNotFoundError";
    }
}
exports.ModuleNotFoundError = ModuleNotFoundError;
class FilterModuleError extends general_exceptions_1.AppError {
    code = 1402;
    constructor(message = 'Filtros para encontrar módulos no son validos') {
        super(message);
        this.name = "FilterModuleError";
    }
}
exports.FilterModuleError = FilterModuleError;
class ModulesNotFoundByFilterError extends general_exceptions_1.AppError {
    code = 1403;
    constructor(message = 'No existen módulos que cumplan las condiciones del filtro') {
        super(message);
        this.name = "ModulesNotFoundByFilterError";
    }
}
exports.ModulesNotFoundByFilterError = ModulesNotFoundByFilterError;
class ModuleAlreadyExistsError extends general_exceptions_1.AppError {
    code = 1404;
    constructor(message = 'Módulo ya registrado, intente con un ID diferente') {
        super(message);
        this.name = "ModuleAlreadyExistsError";
    }
}
exports.ModuleAlreadyExistsError = ModuleAlreadyExistsError;
class ModuleAlreadyActiveError extends general_exceptions_1.AppError {
    code = 1405;
    constructor(message = 'Módulo ya se encuentra activo, intente con un ID diferente de un módulo inactivo') {
        super(message);
        this.name = "ModuleAlreadyActiveError";
    }
}
exports.ModuleAlreadyActiveError = ModuleAlreadyActiveError;
class ModuleAlreadyInactiveError extends general_exceptions_1.AppError {
    code = 1406;
    constructor(message = 'Módulo ya se encuentra inactivo, intente con un ID diferente de un módulo activo') {
        super(message);
        this.name = "ModuleAlreadyInactiveError";
    }
}
exports.ModuleAlreadyInactiveError = ModuleAlreadyInactiveError;
//# sourceMappingURL=module.exception.js.map