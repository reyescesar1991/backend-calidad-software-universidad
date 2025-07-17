"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStockAlreadyInactiveError = exports.ProductStockAlreadyActiveError = exports.ProductStockNotExistsError = exports.ProductsInStockNotFoundError = exports.ProductStockQuantityError = exports.ProductStockAlreadyExistsError = exports.ProductStockNotFoundError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class ProductStockNotFoundError extends general_exceptions_1.AppError {
    code = 2900;
    constructor(message = "No se encontro el producto registrado en los almacenes") {
        super(message);
        this.name = "ProductStockNotFoundError";
    }
}
exports.ProductStockNotFoundError = ProductStockNotFoundError;
class ProductStockAlreadyExistsError extends general_exceptions_1.AppError {
    code = 2901;
    constructor(message = "El producto ya se encuentra registrado en ese almacen, intente registrarlo en otro almacen") {
        super(message);
        this.name = "ProductStockAlreadyExistsError";
    }
}
exports.ProductStockAlreadyExistsError = ProductStockAlreadyExistsError;
class ProductStockQuantityError extends general_exceptions_1.AppError {
    code = 2902;
    constructor(message = "La cantidad a registrar en el stock del producto no puede ser menor a cero") {
        super(message);
        this.name = "ProductStockQuantityError";
    }
}
exports.ProductStockQuantityError = ProductStockQuantityError;
class ProductsInStockNotFoundError extends general_exceptions_1.AppError {
    code = 2903;
    constructor(message = "No existen productos en stock registrados en la base de datos") {
        super(message);
        this.name = "ProductsInStockNotFoundError";
    }
}
exports.ProductsInStockNotFoundError = ProductsInStockNotFoundError;
class ProductStockNotExistsError extends general_exceptions_1.AppError {
    code = 2904;
    constructor(message = "No existe stock para esa combinación de producto y almacen") {
        super(message);
        this.name = "ProductStockNotExistsError";
    }
}
exports.ProductStockNotExistsError = ProductStockNotExistsError;
class ProductStockAlreadyActiveError extends general_exceptions_1.AppError {
    code = 2905;
    constructor(message = "El stock del producto en ese almacen ya se encuentra activo") {
        super(message);
        this.name = "ProductStockAlreadyActiveError";
    }
}
exports.ProductStockAlreadyActiveError = ProductStockAlreadyActiveError;
class ProductStockAlreadyInactiveError extends general_exceptions_1.AppError {
    code = 2906;
    constructor(message = "El stock del producto en ese almacen ya se encuentra inactivo") {
        super(message);
        this.name = "ProductStockAlreadyInactiveError";
    }
}
exports.ProductStockAlreadyInactiveError = ProductStockAlreadyInactiveError;
//# sourceMappingURL=productsStock.exception.js.map