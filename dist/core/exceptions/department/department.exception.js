"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentUniqueKeysError = exports.DepartmentAlreadyExistsError = exports.DepartmentIsAlreadyInactiveError = exports.DepartmentIsAlreadyActiveError = exports.DepartmentsNotFoundByDataBaseError = exports.DepartmentsNotFoundByFilterError = exports.FilterDepartmentError = exports.DepartmentsNotFoundByHeadquarterError = exports.DepartmentNotFoundError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class DepartmentNotFoundError extends general_exceptions_1.AppError {
    code = 1701;
    constructor(message = "El departamento no existe, intente con un ID valido") {
        super(message);
        this.name = "DepartmentNotFoundError";
    }
}
exports.DepartmentNotFoundError = DepartmentNotFoundError;
class DepartmentsNotFoundByHeadquarterError extends general_exceptions_1.AppError {
    code = 1702;
    constructor(message = "No existen departamentos en esa sucursal, intente de nuevo") {
        super(message);
        this.name = "DepartmentsNotFoundByHeadquarterError";
    }
}
exports.DepartmentsNotFoundByHeadquarterError = DepartmentsNotFoundByHeadquarterError;
class FilterDepartmentError extends general_exceptions_1.AppError {
    code = 1703;
    constructor(message = "El filtro de busqueda no es valido, intente ajustar los parárametros") {
        super(message);
        this.name = "FilterDepartmentError";
    }
}
exports.FilterDepartmentError = FilterDepartmentError;
class DepartmentsNotFoundByFilterError extends general_exceptions_1.AppError {
    code = 1704;
    constructor(message = "No se encontraron departamentos con esos parámetros, intente con otros") {
        super(message);
        this.name = "DepartmentsNotFoundByFilterError";
    }
}
exports.DepartmentsNotFoundByFilterError = DepartmentsNotFoundByFilterError;
class DepartmentsNotFoundByDataBaseError extends general_exceptions_1.AppError {
    code = 1705;
    constructor(message = "No se encontraron departamentos en la base de datos, agregue un registro") {
        super(message);
        this.name = "DepartmentsNotFoundByDataBaseError";
    }
}
exports.DepartmentsNotFoundByDataBaseError = DepartmentsNotFoundByDataBaseError;
class DepartmentIsAlreadyActiveError extends general_exceptions_1.AppError {
    code = 1706;
    constructor(message = "El departamento ya se encuentra activo") {
        super(message);
        this.name = "DepartmentIsAlreadyActiveError";
    }
}
exports.DepartmentIsAlreadyActiveError = DepartmentIsAlreadyActiveError;
class DepartmentIsAlreadyInactiveError extends general_exceptions_1.AppError {
    code = 1707;
    constructor(message = "El departamento ya se encuentra inactivo") {
        super(message);
        this.name = "DepartmentIsAlreadyInactiveError";
    }
}
exports.DepartmentIsAlreadyInactiveError = DepartmentIsAlreadyInactiveError;
class DepartmentAlreadyExistsError extends general_exceptions_1.AppError {
    code = 1708;
    constructor(message = "El departamento ya se encuentra creado, intente con un ID diferente") {
        super(message);
        this.name = "DepartmentAlreadyExistsError";
    }
}
exports.DepartmentAlreadyExistsError = DepartmentAlreadyExistsError;
class DepartmentUniqueKeysError extends general_exceptions_1.AppError {
    code = 1709;
    constructor(message = "El campo ID de departamento debe ser unico para cada departamento") {
        super(message);
        this.name = "DepartmentUniqueKeysError";
    }
}
exports.DepartmentUniqueKeysError = DepartmentUniqueKeysError;
//# sourceMappingURL=department.exception.js.map