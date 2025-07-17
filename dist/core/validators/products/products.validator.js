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
exports.ProductValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../exceptions");
let ProductValidator = class ProductValidator {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    static validateProductExists(product) {
        if (!product)
            throw new exceptions_1.ProductNotFoundError();
    }
    static validateProductsExists(product) {
        if (product.length < 1)
            throw new exceptions_1.ProductsNotFoundInDatabaseError();
    }
    static validateProductsFormatNumber(data) {
        if (data.purchasePrice < 0 || data.sellingPrice < 0 || data.minimumStockLevel < 0 || data.maximumStockLevel < 0) {
            throw new exceptions_1.ProductQuantitiesValueError();
        }
    }
    static validateDataWarehouseStockQuantityItsNotZeroOrNegative(quantity) {
        if (quantity <= 0) {
            throw new exceptions_1.ProductQuantityWarehouseFormatError();
        }
    }
    static validateCustomIdProductItsFromTheProduct(customIdProduct, customIdProductParam) {
        if (customIdProduct !== customIdProductParam)
            throw new exceptions_1.ProductCustomIdNotMatchError();
    }
    static validateProductAlreadyIsActive(product) {
        if (product.isActive)
            throw new exceptions_1.ProductIsAlreadyActiveError();
    }
    static validateProductAlreadyIsInactive(product) {
        if (!product.isActive)
            throw new exceptions_1.ProductIsAlreadyInactiveError();
    }
    async validateUniquenessProduct(idProduct) {
        const product = await this.productRepository.findProductByCustomId(idProduct);
        if (product)
            throw new exceptions_1.ProductAlreadyExistsError();
    }
    async validateUniqueFieldsProduct(data, excludeId) {
        const validateUniqueFields = await this.productRepository.existsByUniqueField({
            sku: data.sku,
            barcode: data.barcode,
            idProduct: data.idProduct,
            name: data.name,
        });
        if (validateUniqueFields) {
            throw new exceptions_1.ProductDataHasUniqueFieldsAlreadyRegisteredError();
        }
    }
};
exports.ProductValidator = ProductValidator;
exports.ProductValidator = ProductValidator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IProductRepository")),
    __metadata("design:paramtypes", [Object])
], ProductValidator);
//# sourceMappingURL=products.validator.js.map