"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarehouseCustomIdNotMatchError = exports.CurrentCapacityDecreaseLessZeroCapacityWarehouseError = exports.DecreaseBoxesFormatError = exports.AddBoxesFormatError = exports.WarehouseIsAlreadyActiveError = exports.WarehouseIsAlreadyInactiveError = exports.CurrentCapacityExceedsCapacityWarehouseError = exports.WarehouseCustomIdAlreadyExistsError = exports.WarehouseNotFoundError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class WarehouseNotFoundError extends general_exceptions_1.AppError {
    code = 2400;
    constructor(message = "El ID no corresponde con ningun almacen, intente nuevamente con un ID valido") {
        super(message);
        this.name = "WarehouseNotFoundError";
    }
}
exports.WarehouseNotFoundError = WarehouseNotFoundError;
class WarehouseCustomIdAlreadyExistsError extends general_exceptions_1.AppError {
    code = 2401;
    constructor(message = "El ID ya esta asignado a otro almacen, intente nuevamente con un ID valido") {
        super(message);
        this.name = "WarehouseCustomIdAlreadyExistsError";
    }
}
exports.WarehouseCustomIdAlreadyExistsError = WarehouseCustomIdAlreadyExistsError;
class CurrentCapacityExceedsCapacityWarehouseError extends general_exceptions_1.AppError {
    code = 2402;
    constructor(message = "La capacidad actual del almacen superaria la capacidad base del almacen, agregue menos unidades") {
        super(message);
        this.name = "CurrentCapacityExceedsCapacityWarehouseError";
    }
}
exports.CurrentCapacityExceedsCapacityWarehouseError = CurrentCapacityExceedsCapacityWarehouseError;
class WarehouseIsAlreadyInactiveError extends general_exceptions_1.AppError {
    code = 2403;
    constructor(message = "El almacen se encuentra inactivo actualmente") {
        super(message);
        this.name = "WarehouseIsAlreadyInactiveError";
    }
}
exports.WarehouseIsAlreadyInactiveError = WarehouseIsAlreadyInactiveError;
class WarehouseIsAlreadyActiveError extends general_exceptions_1.AppError {
    code = 2404;
    constructor(message = "El almacen se encuentra activo actualmente") {
        super(message);
        this.name = "WarehouseIsAlreadyActiveError";
    }
}
exports.WarehouseIsAlreadyActiveError = WarehouseIsAlreadyActiveError;
class AddBoxesFormatError extends general_exceptions_1.AppError {
    code = 2405;
    constructor(message = "El número de cajas a almacenar deben ser mayor a cero") {
        super(message);
        this.name = "AddBoxesFormatError";
    }
}
exports.AddBoxesFormatError = AddBoxesFormatError;
class DecreaseBoxesFormatError extends general_exceptions_1.AppError {
    code = 2406;
    constructor(message = "El número de cajas a retirar deben ser mayor a cero") {
        super(message);
        this.name = "DecreaseBoxesFormatError";
    }
}
exports.DecreaseBoxesFormatError = DecreaseBoxesFormatError;
class CurrentCapacityDecreaseLessZeroCapacityWarehouseError extends general_exceptions_1.AppError {
    code = 2407;
    constructor(message = "Esta retirando mas cajas de las disponibles en el almacen, intente con una cantidad valida") {
        super(message);
        this.name = "CurrentCapacityDecreaseLessZeroCapacityWarehouseError";
    }
}
exports.CurrentCapacityDecreaseLessZeroCapacityWarehouseError = CurrentCapacityDecreaseLessZeroCapacityWarehouseError;
class WarehouseCustomIdNotMatchError extends general_exceptions_1.AppError {
    code = 2408;
    constructor(message = "El custom id del almacen no coincide con el almacen encontrado por el ID de mongo") {
        super(message);
        this.name = "WarehouseCustomIdNotMatchError";
    }
}
exports.WarehouseCustomIdNotMatchError = WarehouseCustomIdNotMatchError;
//# sourceMappingURL=warehouse.exception.js.map