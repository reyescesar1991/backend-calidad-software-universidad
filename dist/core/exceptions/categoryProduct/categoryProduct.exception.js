"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryProductIsAlreadyNotViewableError = exports.CategoryProductIsAlreadyViewableError = exports.CategoryProductIsAlreadyInactiveError = exports.CategoryProductIsAlreadyActiveError = exports.CategoryAlreadyExistsError = exports.CategoriesProductByLabelNotFoundError = exports.CategoriesProductNotFoundError = exports.CategoryProductNotFoundError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class CategoryProductNotFoundError extends general_exceptions_1.AppError {
    code = 2700;
    constructor(message = "La categoria no existe, intente con un ID valido") {
        super(message);
        this.name = "CategoryProductNotFoundError";
    }
}
exports.CategoryProductNotFoundError = CategoryProductNotFoundError;
class CategoriesProductNotFoundError extends general_exceptions_1.AppError {
    code = 2701;
    constructor(message = "No existen categorias registradas en la base de datos") {
        super(message);
        this.name = "CategoriesProductNotFoundError";
    }
}
exports.CategoriesProductNotFoundError = CategoriesProductNotFoundError;
class CategoriesProductByLabelNotFoundError extends general_exceptions_1.AppError {
    code = 2702;
    constructor(message = "No existen categorias registradas con esas etiquetas en el sistema") {
        super(message);
        this.name = "CategoriesProductByLabelNotFoundError";
    }
}
exports.CategoriesProductByLabelNotFoundError = CategoriesProductByLabelNotFoundError;
class CategoryAlreadyExistsError extends general_exceptions_1.AppError {
    code = 2703;
    constructor(message = "El id de la categoria debe ser unico, intente con otro nuevamente") {
        super(message);
        this.name = "CategoryAlreadyExistsError";
    }
}
exports.CategoryAlreadyExistsError = CategoryAlreadyExistsError;
class CategoryProductIsAlreadyActiveError extends general_exceptions_1.AppError {
    code = 2704;
    constructor(message = "La categoria de producto ya se encuentra activa") {
        super(message);
        this.name = "CategoryProductIsAlreadyActiveError";
    }
}
exports.CategoryProductIsAlreadyActiveError = CategoryProductIsAlreadyActiveError;
class CategoryProductIsAlreadyInactiveError extends general_exceptions_1.AppError {
    code = 2705;
    constructor(message = "La categoria de producto ya se encuentra inactiva") {
        super(message);
        this.name = "CategoryProductIsAlreadyInactiveError";
    }
}
exports.CategoryProductIsAlreadyInactiveError = CategoryProductIsAlreadyInactiveError;
class CategoryProductIsAlreadyViewableError extends general_exceptions_1.AppError {
    code = 2706;
    constructor(message = "La categoria de producto ya se encuentra visible actualmente para visualizacion") {
        super(message);
        this.name = "CategoryProductIsAlreadyViewableError";
    }
}
exports.CategoryProductIsAlreadyViewableError = CategoryProductIsAlreadyViewableError;
class CategoryProductIsAlreadyNotViewableError extends general_exceptions_1.AppError {
    code = 2707;
    constructor(message = "La categoria de producto ya no se encuentra visible actualmente para visualizacion") {
        super(message);
        this.name = "CategoryProductIsAlreadyNotViewableError";
    }
}
exports.CategoryProductIsAlreadyNotViewableError = CategoryProductIsAlreadyNotViewableError;
//# sourceMappingURL=categoryProduct.exception.js.map