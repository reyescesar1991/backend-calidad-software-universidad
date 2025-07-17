"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuppliersNotExistsError = exports.SupplierIsAlreadyInactiveError = exports.SupplierIsAlreadyActiveError = exports.ItHasUniqueDataAndRegisteredError = exports.SupplierAlreadyExistsError = exports.SupplierNotExistsError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class SupplierNotExistsError extends general_exceptions_1.AppError {
    code = 2600;
    constructor(message = "El proveedor con ese ID no existe, intenta nuevamente con un ID valido") {
        super(message);
        this.name = "SupplierNotExistsError";
    }
}
exports.SupplierNotExistsError = SupplierNotExistsError;
class SupplierAlreadyExistsError extends general_exceptions_1.AppError {
    code = 2601;
    constructor(message = "El proveedor ya existe en el sistema, intente con un ID diferente") {
        super(message);
        this.name = "SupplierAlreadyExistsError";
    }
}
exports.SupplierAlreadyExistsError = SupplierAlreadyExistsError;
class ItHasUniqueDataAndRegisteredError extends general_exceptions_1.AppError {
    code = 2602;
    constructor(message = "La data de creacion de proveedor tiene datos ya registrados como unicos, intente registrar con otra data") {
        super(message);
        this.name = "ItHasUniqueDataAndRegisteredError";
    }
}
exports.ItHasUniqueDataAndRegisteredError = ItHasUniqueDataAndRegisteredError;
class SupplierIsAlreadyActiveError extends general_exceptions_1.AppError {
    code = 2603;
    constructor(message = "El proveedor ya se encuentra activo") {
        super(message);
        this.name = "SupplierIsAlreadyActiveError";
    }
}
exports.SupplierIsAlreadyActiveError = SupplierIsAlreadyActiveError;
class SupplierIsAlreadyInactiveError extends general_exceptions_1.AppError {
    code = 2604;
    constructor(message = "El proveedor ya se encuentra inactivo") {
        super(message);
        this.name = "SupplierIsAlreadyInactiveError";
    }
}
exports.SupplierIsAlreadyInactiveError = SupplierIsAlreadyInactiveError;
class SuppliersNotExistsError extends general_exceptions_1.AppError {
    code = 2604;
    constructor(message = "No se encontraron proveedores con esos terminos de busqueda o no estan activos en el sistema") {
        super(message);
        this.name = "SuppliersNotExistsError";
    }
}
exports.SuppliersNotExistsError = SuppliersNotExistsError;
//# sourceMappingURL=supplier.exception.js.map