"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadquartersListNotFoudError = exports.HeadquarterKeysAlreadyExistError = exports.HeadquartersByFilterNotFoudError = exports.FilterHeadquarterError = exports.HeadquarterIsAlreadyDesactiveError = exports.HeadquarterIsAlreadyActiveError = exports.HeadquarterAlreadyExistsError = exports.HeadquarterNotExistsError = exports.LocationHeadquarterInvalidError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class LocationHeadquarterInvalidError extends general_exceptions_1.AppError {
    code = 1601;
    constructor(message = "Combinación invalida de ubicacion entre ciudad, estado y código zip") {
        super(message);
        this.name = "LocationHeadquarterInvalidError";
    }
}
exports.LocationHeadquarterInvalidError = LocationHeadquarterInvalidError;
class HeadquarterNotExistsError extends general_exceptions_1.AppError {
    code = 1602;
    constructor(message = "La sucursal no existe, intente con un ID valido") {
        super(message);
        this.name = "HeadquarterNotExistsError";
    }
}
exports.HeadquarterNotExistsError = HeadquarterNotExistsError;
class HeadquarterAlreadyExistsError extends general_exceptions_1.AppError {
    code = 1605;
    constructor(message = "La sucursal ya existe, intente con un ID diferente") {
        super(message);
        this.name = "HeadquarterAlreadyExistsError";
    }
}
exports.HeadquarterAlreadyExistsError = HeadquarterAlreadyExistsError;
class HeadquarterIsAlreadyActiveError extends general_exceptions_1.AppError {
    code = 1603;
    constructor(message = "La sucursal ya se encuentra activa, intente con un ID de una sucursal inactiva") {
        super(message);
        this.name = "HeadquarterIsAlreadyActiveError";
    }
}
exports.HeadquarterIsAlreadyActiveError = HeadquarterIsAlreadyActiveError;
class HeadquarterIsAlreadyDesactiveError extends general_exceptions_1.AppError {
    code = 1604;
    constructor(message = "La sucursal ya se encuentra desactivada, intente con un ID de una sucursal activa") {
        super(message);
        this.name = "HeadquarterIsAlreadyDesactiveError";
    }
}
exports.HeadquarterIsAlreadyDesactiveError = HeadquarterIsAlreadyDesactiveError;
class FilterHeadquarterError extends general_exceptions_1.AppError {
    code = 1606;
    constructor(message = "El filtro de busqueda no es valido, intente ajustar los parárametros") {
        super(message);
        this.name = "FilterHeadquarterError";
    }
}
exports.FilterHeadquarterError = FilterHeadquarterError;
class HeadquartersByFilterNotFoudError extends general_exceptions_1.AppError {
    code = 1607;
    constructor(message = "Ninguna sucursal coincide con los parámetros de busqueda, intente nuevamente") {
        super(message);
        this.name = "HeadquartersByFilterNotFoudError";
    }
}
exports.HeadquartersByFilterNotFoudError = HeadquartersByFilterNotFoudError;
class HeadquarterKeysAlreadyExistError extends general_exceptions_1.AppError {
    code = 1608;
    constructor(message = "Los campos etiqueta, telefono, email y nombre deben ser unicos por sucursal. Intente con datos diferentes") {
        super(message);
        this.name = "HeadquarterKeysAlreadyExistError";
    }
}
exports.HeadquarterKeysAlreadyExistError = HeadquarterKeysAlreadyExistError;
class HeadquartersListNotFoudError extends general_exceptions_1.AppError {
    code = 1609;
    constructor(message = "No existen sucursales registradas en la base de datos") {
        super(message);
        this.name = "HeadquartersListNotFoudError";
    }
}
exports.HeadquartersListNotFoudError = HeadquartersListNotFoudError;
//# sourceMappingURL=headquarter.exception.js.map