"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCriteriaPaginationPageError = exports.ProductIsAlreadyInactiveError = exports.ProductIsAlreadyActiveError = exports.ProductCustomIdNotMatchError = exports.ProductQuantityWarehouseFormatError = exports.ProductQuantitiesValueError = exports.ProductDataHasUniqueFieldsAlreadyRegisteredError = exports.ProductAlreadyExistsError = exports.ProductsNotFoundInDatabaseError = exports.ProductNotFoundError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class ProductNotFoundError extends general_exceptions_1.AppError {
    code = 2800;
    constructor(message = "El producto no fue encontrado, intente nuevamente con un ID valido") {
        super(message);
        this.name = "ProductNotFoundError";
    }
}
exports.ProductNotFoundError = ProductNotFoundError;
class ProductsNotFoundInDatabaseError extends general_exceptions_1.AppError {
    code = 2801;
    constructor(message = "No se han encontrado productos registrados en la base de datos, intente nuevamente") {
        super(message);
        this.name = "ProductsNotFoundInDatabaseError";
    }
}
exports.ProductsNotFoundInDatabaseError = ProductsNotFoundInDatabaseError;
class ProductAlreadyExistsError extends general_exceptions_1.AppError {
    code = 2802;
    constructor(message = "El producto ya existe en la base de datos, intente nuevamente con un ID valido y diferente") {
        super(message);
        this.name = "ProductAlreadyExistsError";
    }
}
exports.ProductAlreadyExistsError = ProductAlreadyExistsError;
class ProductDataHasUniqueFieldsAlreadyRegisteredError extends general_exceptions_1.AppError {
    code = 2803;
    constructor(message = "La data del producto a registrar contiene data ya registrada como unica, intente nuevamente con datos diferentes") {
        super(message);
        this.name = "ProductDataHasUniqueFieldsAlreadyRegisteredError";
    }
}
exports.ProductDataHasUniqueFieldsAlreadyRegisteredError = ProductDataHasUniqueFieldsAlreadyRegisteredError;
class ProductQuantitiesValueError extends general_exceptions_1.AppError {
    code = 2804;
    constructor(message = "El producto no puede tener un valor cantidad igual a 0 o menor a 0, intente nuevamente con valores validos") {
        super(message);
        this.name = "ProductQuantitiesValueError";
    }
}
exports.ProductQuantitiesValueError = ProductQuantitiesValueError;
class ProductQuantityWarehouseFormatError extends general_exceptions_1.AppError {
    code = 2805;
    constructor(message = "La cantidad del producto en el almacen al registrar no puede ser menor o igual a cero, intente nuevamente con valores validos") {
        super(message);
        this.name = "ProductQuantityWarehouseFormatError";
    }
}
exports.ProductQuantityWarehouseFormatError = ProductQuantityWarehouseFormatError;
class ProductCustomIdNotMatchError extends general_exceptions_1.AppError {
    code = 2806;
    constructor(message = "El custom id obtenido por el usuario no coincide con el ID asignado") {
        super(message);
        this.name = "ProductCustomIdNotMatchError";
    }
}
exports.ProductCustomIdNotMatchError = ProductCustomIdNotMatchError;
class ProductIsAlreadyActiveError extends general_exceptions_1.AppError {
    code = 2807;
    constructor(message = "El producto ya se encuentra activo actualmente") {
        super(message);
        this.name = "ProductIsAlreadyActiveError";
    }
}
exports.ProductIsAlreadyActiveError = ProductIsAlreadyActiveError;
class ProductIsAlreadyInactiveError extends general_exceptions_1.AppError {
    code = 2808;
    constructor(message = "El producto ya se encuentra inactivo actualmente") {
        super(message);
        this.name = "ProductIsAlreadyInactiveError";
    }
}
exports.ProductIsAlreadyInactiveError = ProductIsAlreadyInactiveError;
class ProductCriteriaPaginationPageError extends general_exceptions_1.AppError {
    code = 2809;
    constructor(message = "El limite de la paginacion no puede ser menor a cero, intente nuevamente con valores validos") {
        super(message);
        this.name = "ProductCriteriaPaginationPageError";
    }
}
exports.ProductCriteriaPaginationPageError = ProductCriteriaPaginationPageError;
//# sourceMappingURL=products.exception.js.map