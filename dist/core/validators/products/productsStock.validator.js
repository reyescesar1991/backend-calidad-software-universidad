"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStockValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../exceptions");
const productsStock_exception_1 = require("../../exceptions/products/productsStock.exception");
let ProductStockValidator = class ProductStockValidator {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    static validateProductStockExists(product) {
        if (!product)
            throw new exceptions_1.ProductStockNotFoundError();
    }
    static validateStockProductQuantityMoreThanZero(quantity) {
        if (quantity < 0)
            throw new exceptions_1.ProductStockQuantityError();
    }
    static validateProductsInStockExists(product) {
        if (product.length < 1)
            throw new exceptions_1.ProductsInStockNotFoundError();
    }
    static validateProductAlreadyIsActive(product) {
        if (product.statusInWarehouse)
            throw new productsStock_exception_1.ProductStockAlreadyActiveError();
    }
    static validateProductAlreadyIsInactive(product) {
        if (!product.statusInWarehouse)
            throw new productsStock_exception_1.ProductStockAlreadyInactiveError();
    }
    async validateProductStockUniqueness(customIdProduct, customIdWarehouse) {
        const productStock = await this.productRepository.findProductStockByProductIdAndWarehouseId(customIdProduct, customIdWarehouse);
        if (productStock)
            throw new exceptions_1.ProductStockAlreadyExistsError();
    }
    async validateProductStockExists(customIdProduct, customIdWarehouse) {
        const productStock = await this.productRepository.findProductStockByProductIdAndWarehouseId(customIdProduct, customIdWarehouse);
        if (!productStock)
            throw new exceptions_1.ProductStockNotExistsError();
    }
};
exports.ProductStockValidator = ProductStockValidator;
exports.ProductStockValidator = ProductStockValidator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IProductStockRepository")),
    __metadata("design:paramtypes", [Object])
], ProductStockValidator);
//# sourceMappingURL=productsStock.validator.js.map