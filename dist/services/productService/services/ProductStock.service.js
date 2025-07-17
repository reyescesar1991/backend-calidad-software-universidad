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
exports.ProductStockService = void 0;
const tsyringe_1 = require("tsyringe");
const transactionManager_1 = require("../../../core/database/transactionManager");
const validators_1 = require("../../../core/validators");
const transaccional_wrapper_1 = require("../../../core/utils/transaccional-wrapper");
const exceptions_1 = require("../../../core/exceptions");
const Product_service_1 = require("./Product.service");
const Location_service_1 = require("../../locationService/Location.service");
let ProductStockService = class ProductStockService {
    productStockRepository;
    productStockValidator;
    transactionManager;
    productService;
    locationService;
    constructor(productStockRepository, productStockValidator, transactionManager, productService, locationService) {
        this.productStockRepository = productStockRepository;
        this.productStockValidator = productStockValidator;
        this.transactionManager = transactionManager;
        this.productService = productService;
        this.locationService = locationService;
    }
    async findProductStockByProductId(idProduct) {
        try {
            const productStock = await this.productStockRepository.findProductStockByProductId(idProduct);
            validators_1.ProductStockValidator.validateProductsInStockExists(productStock);
            return productStock;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findProductByProductCustomId(customIdProduct) {
        try {
            const productStock = await this.productStockRepository.findProductByProductCustomId(customIdProduct);
            validators_1.ProductStockValidator.validateProductsInStockExists(productStock);
            return productStock;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findProductByWarehouseId(idWarehouse) {
        try {
            const productStock = await this.productStockRepository.findProductByWarehouseId(idWarehouse);
            validators_1.ProductStockValidator.validateProductsInStockExists(productStock);
            return productStock;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findProductByWarehouseCustomId(customIdWarehouse) {
        try {
            const productStock = await this.productStockRepository.findProductByWarehouseCustomId(customIdWarehouse);
            validators_1.ProductStockValidator.validateProductsInStockExists(productStock);
            return productStock;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findAllProductsStock() {
        try {
            const productsStock = await this.productStockRepository.findAllProductsStock();
            validators_1.ProductStockValidator.validateProductsInStockExists(productsStock);
            return productsStock;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async createProductStock(dataCreateProductStock, session) {
        try {
            //Validamos que exista el producto
            const product = await this.productService.findProductById(dataCreateProductStock.productId);
            //Validamos que el customId del producto sea el mismo que el pasado por el usuario encontrado por ID de mongo
            validators_1.ProductValidator.validateCustomIdProductItsFromTheProduct(product.idProduct, dataCreateProductStock.productCustomId);
            //Validamos que exista el almacen
            const warehouse = await this.locationService.findWarehouseById(dataCreateProductStock.warehouseId);
            //Validamos que el customId del almacen sea el mismo que el pasado por el usuario para el almacen encontrado por ID de mongo
            validators_1.WarehouseValidator.validateCustomIdWarehouseItsFromTheWarehouse(warehouse.idWarehouse, dataCreateProductStock.warehouseCustomId);
            //Validamos que la cantidad a agregar en stock sea mayor o igual a cero
            validators_1.ProductStockValidator.validateStockProductQuantityMoreThanZero(dataCreateProductStock.quantity);
            //Validamos que el producto ya no se encuentre registrado en el mismo almacen
            await this.productStockValidator.validateProductStockUniqueness(dataCreateProductStock.productCustomId, dataCreateProductStock.warehouseCustomId);
            //Creamos el producto en el almacen
            return await this.productStockRepository.createProductStock(dataCreateProductStock, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async activateProductInWarehouse(customIdProduct, idWarehouse, session) {
        try {
            //Validamos que el producto exista en la base de datos
            await this.productService.findProductByCustomId(customIdProduct);
            //Validamos que el almacen exista en la base de datos
            await this.locationService.findWarehouseByCustomId(idWarehouse);
            //Validamos que exista un registro en la tabla de stock con ambos id
            await this.productStockValidator.validateProductStockExists(customIdProduct, idWarehouse);
            //Validamos que el producto ya no se encuentre activo
            const productStock = await this.productStockRepository.findProductStockByProductIdAndWarehouseId(customIdProduct, idWarehouse);
            validators_1.ProductStockValidator.validateProductAlreadyIsActive(productStock);
            //Activamos el producto
            return await this.productStockRepository.activateProductInWarehouse(customIdProduct, idWarehouse, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async inactivateProductInWarehouse(customIdProduct, idWarehouse, session) {
        try {
            //Validamos que el producto exista en la base de datos
            await this.productService.findProductByCustomId(customIdProduct);
            //Validamos que el almacen exista en la base de datos
            await this.locationService.findWarehouseByCustomId(idWarehouse);
            //Validamos que exista un registro en la tabla de stock con ambos id
            await this.productStockValidator.validateProductStockExists(customIdProduct, idWarehouse);
            //Validamos que el producto ya no se encuentre inactivo
            const productStock = await this.productStockRepository.findProductStockByProductIdAndWarehouseId(customIdProduct, idWarehouse);
            validators_1.ProductStockValidator.validateProductAlreadyIsInactive(productStock);
            //Inactivamos el producto
            return await this.productStockRepository.inactivateProductInWarehouse(customIdProduct, idWarehouse, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async addStockProduct(idProduct, idWarehouse, quantity, session) {
        try {
            //Validamos que el producto exista en la base de datos
            await this.productService.findProductByCustomId(idProduct);
            //Validamos que el almacen exista en la base de datos
            const warehouse = await this.locationService.findWarehouseByCustomId(idWarehouse);
            //Validamos que exista un registro en la tabla de stock con ambos id
            await this.productStockValidator.validateProductStockExists(idProduct, idWarehouse);
            //Agregamos la misma cantidad de cajas en la capacidad del almacen
            await this.locationService.addCurrentCapacityWarehousePerBox(warehouse._id, quantity);
            //Agregamos la cantidad de productos a su stock en ese almacen
            return await this.productStockRepository.addStockProduct(idProduct, idWarehouse, quantity, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async removeStockProduct(idProduct, idWarehouse, quantity, session) {
        try {
            //Validamos que el producto exista en la base de datos
            await this.productService.findProductByCustomId(idProduct);
            //Validamos que el almacen exista en la base de datos
            const warehouse = await this.locationService.findWarehouseByCustomId(idWarehouse);
            //Validamos que exista un registro en la tabla de stock con ambos id
            await this.productStockValidator.validateProductStockExists(idProduct, idWarehouse);
            //Quitamos la misma cantidad de cajas en la capacidad del almacen
            await this.locationService.decreaseCurrentCapacityWarehousePerBox(warehouse._id, quantity);
            //Quitamos la cantidad de productos a su stock en ese almacen
            return await this.productStockRepository.removeStockProduct(idProduct, idWarehouse, quantity, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async getStockByWarehouse(idWarehouse) {
        try {
            const response = await this.productStockRepository.getStockByWarehouse(idWarehouse);
            if (response)
                return response;
            await this.locationService.findWarehouseById(idWarehouse);
            return null;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async getStockTotalByProduct(idProduct) {
        try {
            const response = await this.productStockRepository.getStockTotalByProduct(idProduct);
            if (response)
                return response;
            await this.productService.findProductById(idProduct);
            return null;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async getTotalStockMonetaryValueByWarehouse(idWarehouse) {
        try {
            const response = await this.productStockRepository.getTotalStockMonetaryValueByWarehouse(idWarehouse);
            if (response)
                return response;
            await this.locationService.findWarehouseById(idWarehouse);
            return null;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async getAmountTotalStockByProduct(idProduct) {
        try {
            const response = await this.productStockRepository.getAmountTotalStockByProduct(idProduct);
            if (response)
                return response;
            await this.productService.findProductById(idProduct);
            return null;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async getMonetaryValueForSpecificProductInWarehouse(// Nuevo nombre más descriptivo
    idProduct, idWarehouse) {
        try {
            // 1. Consulta optimista: la operación más común.
            // Esto nos da el valor monetario si la relación existe.
            const response = await this.productStockRepository.getMonetaryValueForSpecificProductInWarehouse(idProduct, idWarehouse);
            // 2. Si la consulta devuelve un resultado, lo retornamos inmediatamente.
            // Este es el "camino feliz" y es muy eficiente (1 sola consulta a la BD).
            if (response)
                return response;
            // 3. Si `response` es `null`, necesitamos saber por qué.
            // Validamos que las entidades principales (Producto y Almacén) existan.
            // Estos métodos ya lanzan el error apropiado si no se encuentran.
            await this.productService.findProductById(idProduct);
            await this.locationService.findWarehouseById(idWarehouse);
            // 4. Si el código llega hasta aquí, significa que el producto y el almacén existen,
            // pero no hay una entrada de stock que los relacione. Este es el caso de "stock cero".
            // Por lo tanto, devolver `null` es la acción correcta.
            //TODO : En el controlador ese tipo de errores de no encontrar data se vuelven con 404
            return null;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findProductsByStockLevel(status) {
        try {
            return await this.productStockRepository.findProductsByStockLevel(status);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
};
exports.ProductStockService = ProductStockService;
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductStockService.prototype, "createProductStock", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductStockService.prototype, "activateProductInWarehouse", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProductStockService.prototype, "inactivateProductInWarehouse", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], ProductStockService.prototype, "addStockProduct", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], ProductStockService.prototype, "removeStockProduct", null);
exports.ProductStockService = ProductStockService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IProductStockRepository")),
    __param(1, (0, tsyringe_1.inject)("ProductStockValidator")),
    __param(2, (0, tsyringe_1.inject)("TransactionManager")),
    __param(3, (0, tsyringe_1.inject)("ProductService")),
    __param(4, (0, tsyringe_1.inject)(Location_service_1.LocationService)),
    __metadata("design:paramtypes", [Object, validators_1.ProductStockValidator,
        transactionManager_1.TransactionManager,
        Product_service_1.ProductService,
        Location_service_1.LocationService])
], ProductStockService);
//# sourceMappingURL=ProductStock.service.js.map