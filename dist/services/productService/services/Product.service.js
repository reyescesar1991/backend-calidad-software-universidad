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
exports.ProductService = void 0;
const tsyringe_1 = require("tsyringe");
const transactionManager_1 = require("../../../core/database/transactionManager");
const exceptions_1 = require("../../../core/exceptions");
const validators_1 = require("../../../core/validators");
const transaccional_wrapper_1 = require("../../../core/utils/transaccional-wrapper");
const Supplier_service_1 = require("../../supplierService/Supplier.service");
const Location_service_1 = require("../../locationService/Location.service");
let ProductService = class ProductService {
    transactionManager;
    categoryProductRepository;
    categoryProductValidator;
    productRepository;
    productValidator;
    supplierService;
    locationService;
    constructor(transactionManager, categoryProductRepository, categoryProductValidator, productRepository, productValidator, supplierService, locationService) {
        this.transactionManager = transactionManager;
        this.categoryProductRepository = categoryProductRepository;
        this.categoryProductValidator = categoryProductValidator;
        this.productRepository = productRepository;
        this.productValidator = productValidator;
        this.supplierService = supplierService;
        this.locationService = locationService;
    }
    async findCategoryById(idCategory) {
        try {
            const category = await this.categoryProductRepository.findCategoryById(idCategory);
            validators_1.CategoryProductValidator.validateCategoryProductExists(category);
            return category;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findAllCategories() {
        try {
            const categories = await this.categoryProductRepository.findAllCategories();
            validators_1.CategoryProductValidator.validateCategoriesProductExists(categories);
            return categories;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findCategoryByCustomId(customIdCategory) {
        try {
            const category = await this.categoryProductRepository.findCategoryByCustomId(customIdCategory);
            validators_1.CategoryProductValidator.validateCategoryProductExists(category);
            return category;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findCategoryByLabel(label, isActive) {
        try {
            const categories = await this.categoryProductRepository.findCategoryByLabel(label, isActive);
            validators_1.CategoryProductValidator.validateCategoriesProductExistsByLabel(categories);
            return categories;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async createCategory(dataCreateCategory, session) {
        try {
            await this.categoryProductValidator.validateCustomIdUniqueness(dataCreateCategory.idCategory);
            return await this.categoryProductRepository.createCategory(dataCreateCategory, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async updateCategory(idCategory, dataUpdateCategory, session) {
        try {
            const category = await this.categoryProductRepository.findCategoryById(idCategory);
            validators_1.CategoryProductValidator.validateCategoryProductExists(category);
            return await this.categoryProductRepository.updateCategory(idCategory, dataUpdateCategory, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async activateCategory(idCategory, session) {
        try {
            const category = await this.categoryProductRepository.findCategoryById(idCategory);
            validators_1.CategoryProductValidator.validateCategoryProductExists(category);
            validators_1.CategoryProductValidator.validateCategoryProductAlreadyIsActive(category);
            return await this.categoryProductRepository.activateCategory(idCategory, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async inactivateCategory(idCategory, session) {
        try {
            const category = await this.categoryProductRepository.findCategoryById(idCategory);
            validators_1.CategoryProductValidator.validateCategoryProductExists(category);
            validators_1.CategoryProductValidator.validateCategoryProductAlreadyIsInactive(category);
            return await this.categoryProductRepository.inactivateCategory(idCategory, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async viewableCategory(idCategory, session) {
        try {
            const category = await this.categoryProductRepository.findCategoryById(idCategory);
            validators_1.CategoryProductValidator.validateCategoryProductExists(category);
            validators_1.CategoryProductValidator.validateCategoryProductAlreadyIsViewable(category);
            return await this.categoryProductRepository.viewableCategory(idCategory, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async dontViewableCategory(idCategory, session) {
        try {
            const category = await this.categoryProductRepository.findCategoryById(idCategory);
            validators_1.CategoryProductValidator.validateCategoryProductExists(category);
            validators_1.CategoryProductValidator.validateCategoryProductAlreadyIsNotViewable(category);
            return await this.categoryProductRepository.dontViewableCategory(idCategory, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findProductById(idProduct) {
        try {
            const product = await this.productRepository.findProductById(idProduct);
            validators_1.ProductValidator.validateProductExists(product);
            return product;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findProductByCustomId(customIdProduct) {
        try {
            const product = await this.productRepository.findProductByCustomId(customIdProduct);
            validators_1.ProductValidator.validateProductExists(product);
            return product;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findProductBySku(sku) {
        try {
            const product = await this.productRepository.findProductBySku(sku);
            validators_1.ProductValidator.validateProductExists(product);
            return product;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findProductByBarcode(barcode) {
        try {
            const product = await this.productRepository.findProductByBarcode(barcode);
            validators_1.ProductValidator.validateProductExists(product);
            return product;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findAllProducts() {
        try {
            const products = await this.productRepository.findAllProducts();
            validators_1.ProductValidator.validateProductsExists(products);
            return products;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async createProduct(dataCreateProduct, session) {
        try {
            //1. Validamos que exista la categoria del dataCreateProduct
            await this.findCategoryById(dataCreateProduct.categoryId);
            //2. Validamos que exista el supplier
            await this.supplierService.findSupplierById(dataCreateProduct.supplierId);
            //3. Validamos que no exista previamente un producto con el mismo ID
            await this.productValidator.validateUniquenessProduct(dataCreateProduct.idProduct);
            //4. Validamos que la data no tenga data ya registrada como unica
            await this.productValidator.validateUniqueFieldsProduct({
                sku: dataCreateProduct.sku,
                barcode: dataCreateProduct.barcode,
                idProduct: dataCreateProduct.idProduct,
                name: dataCreateProduct.name,
            });
            //5. Validamos que ninguno de los valores numericos sea menor o igual a cero
            validators_1.ProductValidator.validateProductsFormatNumber({
                purchasePrice: dataCreateProduct.purchasePrice,
                sellingPrice: dataCreateProduct.sellingPrice,
                minimumStockLevel: dataCreateProduct.minimumStockLevel,
                maximumStockLevel: dataCreateProduct.maximumStockLevel,
            });
            // Creamos el producto
            return await this.productRepository.createProduct(dataCreateProduct, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async updateProduct(idProduct, dataUpdateProduct, session) {
        try {
            //Verificar si el producto existe
            const product = await this.productRepository.findProductById(idProduct);
            validators_1.ProductValidator.validateProductExists(product);
            //Si existe en la dataUpdate el id de un nuevo supplier, debemos ver si realmente existe dicho supplier
            if (dataUpdateProduct.supplierId) {
                await this.supplierService.findSupplierById(dataUpdateProduct.supplierId);
            }
            //Si existe en la dataUpdate el id de una nueva categoria, debemos ver si realmente existe dicha categoria
            if (dataUpdateProduct.categoryId) {
                await this.findCategoryById(dataUpdateProduct.categoryId);
            }
            //Verificar que el nuevo nombre del producto si es que existe en la data, no se repita
            if (dataUpdateProduct.name) {
                await this.productRepository.existsByUniqueField({
                    name: dataUpdateProduct.name,
                });
            }
            //Verificamos que las cantidades sean mayores a 0
            validators_1.ProductValidator.validateProductsFormatNumber({
                purchasePrice: dataUpdateProduct.purchasePrice,
                sellingPrice: dataUpdateProduct.sellingPrice,
                minimumStockLevel: dataUpdateProduct.minimumStockLevel,
                maximumStockLevel: dataUpdateProduct.maximumStockLevel,
            });
            //Actualizamos el producto
            return await this.productRepository.updateProduct(idProduct, dataUpdateProduct, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async activateProduct(idProduct, session) {
        try {
            const product = await this.productRepository.findProductById(idProduct);
            validators_1.ProductValidator.validateProductExists(product);
            validators_1.ProductValidator.validateProductAlreadyIsActive(product);
            return await this.productRepository.activateProduct(idProduct, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async inactivateProduct(idProduct, session) {
        try {
            const product = await this.productRepository.findProductById(idProduct);
            validators_1.ProductValidator.validateProductExists(product);
            validators_1.ProductValidator.validateProductAlreadyIsInactive(product);
            return await this.productRepository.inactivateProduct(idProduct, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findProductsByCriteria(criteria, pagination = { page: 1, limit: 20 }, sort = { name: 1 }) {
        try {
            if (criteria.supplierId) {
                await this.supplierService.findSupplierById(criteria.supplierId);
            }
            //Si existe en la dataUpdate el id de una nueva categoria, debemos ver si realmente existe dicha categoria
            if (criteria.categoryId) {
                await this.findCategoryById(criteria.categoryId);
            }
            console.log(pagination.page);
            if (pagination.page <= 0)
                throw new exceptions_1.ProductCriteriaPaginationPageError();
            return await this.productRepository.findProductsByCriteria(criteria, pagination, sort);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
};
exports.ProductService = ProductService;
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "createCategory", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "updateCategory", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "activateCategory", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "inactivateCategory", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "viewableCategory", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "dontViewableCategory", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "createProduct", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "updateProduct", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "activateProduct", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "inactivateProduct", null);
exports.ProductService = ProductService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("TransactionManager")),
    __param(1, (0, tsyringe_1.inject)("ICategoryProductRepository")),
    __param(2, (0, tsyringe_1.inject)("CategoryProductValidator")),
    __param(3, (0, tsyringe_1.inject)("IProductRepository")),
    __param(4, (0, tsyringe_1.inject)("ProductValidator")),
    __param(5, (0, tsyringe_1.inject)(Supplier_service_1.SupplierService)),
    __param(6, (0, tsyringe_1.inject)(Location_service_1.LocationService)),
    __metadata("design:paramtypes", [transactionManager_1.TransactionManager, Object, validators_1.CategoryProductValidator, Object, validators_1.ProductValidator,
        Supplier_service_1.SupplierService,
        Location_service_1.LocationService])
], ProductService);
//# sourceMappingURL=Product.service.js.map