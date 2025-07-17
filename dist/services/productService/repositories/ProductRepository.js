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
exports.ProductRepositoryImpl = void 0;
const mongoose_1 = require("mongoose");
const tsyringe_1 = require("tsyringe");
let ProductRepositoryImpl = class ProductRepositoryImpl {
    ProductModel;
    constructor(ProductModel) {
        this.ProductModel = ProductModel;
    }
    async findProductById(idProduct) {
        return await this.ProductModel.findById(idProduct).exec();
    }
    async findProductByCustomId(customIdProduct) {
        return await this.ProductModel.findOne({ idProduct: customIdProduct }).exec();
    }
    async findProductBySku(sku) {
        return await this.ProductModel.findOne({ sku }).exec();
    }
    async findProductByBarcode(barcode) {
        return await this.ProductModel.findOne({ barcode }).exec();
    }
    async findAllProducts() {
        return await this.ProductModel.find({}).exec();
    }
    async createProduct(dataCreateProduct, session) {
        const [product] = await this.ProductModel.create([dataCreateProduct], { session });
        return product;
    }
    async updateProduct(idProduct, dataUpdateProduct, session) {
        return await this.ProductModel.findByIdAndUpdate(idProduct, dataUpdateProduct, { new: true, runValidators: true, session }).exec();
    }
    async activateProduct(idProduct, session) {
        return await this.ProductModel.findByIdAndUpdate(idProduct, { $set: { isActive: true } }, { new: true, runValidators: true, session }).exec();
    }
    async inactivateProduct(idProduct, session) {
        return await this.ProductModel.findByIdAndUpdate(idProduct, { $set: { isActive: false } }, { new: true, runValidators: true, session }).exec();
    }
    // En ProductRepositoryImpl
    async findProductsByCriteria(criteria, pagination = { page: 1, limit: 20 }, sort = { name: 1 }) {
        const query = {};
        if (criteria.categoryId)
            query.categoryId = criteria.categoryId;
        if (criteria.supplierId)
            query.supplierId = criteria.supplierId;
        if (criteria.brand)
            query.brand = criteria.brand;
        if (typeof criteria.isActive === 'boolean')
            query.isActive = criteria.isActive;
        if (criteria.searchQuery) {
            query.$or = [
                { name: { $regex: criteria.searchQuery, $options: 'i' } },
                { description: { $regex: criteria.searchQuery, $options: 'i' } },
                { sku: { $regex: criteria.searchQuery, $options: 'i' } },
                { barcode: { $regex: criteria.searchQuery, $options: 'i' } },
            ];
        }
        const skip = (pagination.page - 1) * pagination.limit;
        return await this.ProductModel.find(query)
            .sort(sort)
            .skip(skip)
            .limit(pagination.limit)
            .exec();
    }
    // En ProductRepositoryImpl
    async existsByUniqueField(data, excludeId) {
        const query = { $or: [] };
        if (data.sku)
            query.$or.push({ sku: data.sku });
        if (data.barcode)
            query.$or.push({ barcode: data.barcode });
        if (data.idProduct)
            query.$or.push({ idProduct: data.idProduct });
        if (query.$or.length === 0)
            return false;
        if (excludeId) {
            query._id = { $ne: excludeId };
        }
        const count = await this.ProductModel.countDocuments(query).exec();
        return count > 0;
    }
};
exports.ProductRepositoryImpl = ProductRepositoryImpl;
exports.ProductRepositoryImpl = ProductRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ProductModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ProductRepositoryImpl);
//# sourceMappingURL=ProductRepository.js.map