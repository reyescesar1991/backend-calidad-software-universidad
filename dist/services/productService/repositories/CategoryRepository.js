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
exports.CategoryRepositoryImpl = void 0;
const mongoose_1 = require("mongoose");
const tsyringe_1 = require("tsyringe");
let CategoryRepositoryImpl = class CategoryRepositoryImpl {
    CategoryProductModel;
    constructor(CategoryProductModel) {
        this.CategoryProductModel = CategoryProductModel;
    }
    async findCategoryById(idCategory) {
        return await this.CategoryProductModel.findById(idCategory).exec();
    }
    async findAllCategories() {
        return await this.CategoryProductModel.find({}).exec();
    }
    async findCategoryByCustomId(customIdCategory) {
        return await this.CategoryProductModel.findOne({ idCategory: customIdCategory }).exec();
    }
    async findCategoryByLabel(label, isActive) {
        const query = {};
        if (label)
            query.label = label;
        if (typeof isActive === 'boolean')
            query.isActive = isActive;
        return await this.CategoryProductModel.find(query).exec();
    }
    async createCategory(dataCreateCategory, session) {
        const [category] = await this.CategoryProductModel.create([dataCreateCategory], { session });
        return category;
    }
    async updateCategory(idCategory, dataUpdateCategory, session) {
        return await this.CategoryProductModel.findByIdAndUpdate(idCategory, dataUpdateCategory, { new: true, runValidators: true, session }).exec();
    }
    async activateCategory(idCategory, session) {
        return await this.CategoryProductModel.findByIdAndUpdate(idCategory, { $set: { isActive: true } }, { new: true, runValidators: true, session }).exec();
    }
    async inactivateCategory(idCategory, session) {
        return await this.CategoryProductModel.findByIdAndUpdate(idCategory, { $set: { isActive: false } }, { new: true, runValidators: true, session }).exec();
    }
    async viewableCategory(idCategory, session) {
        return await this.CategoryProductModel.findByIdAndUpdate(idCategory, { $set: { isVisible: true } }, { new: true, runValidators: true, session }).exec();
    }
    async dontViewableCategory(idCategory, session) {
        return await this.CategoryProductModel.findByIdAndUpdate(idCategory, { $set: { isVisible: false } }, { new: true, runValidators: true, session }).exec();
    }
};
exports.CategoryRepositoryImpl = CategoryRepositoryImpl;
exports.CategoryRepositoryImpl = CategoryRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("CategoryProductModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CategoryRepositoryImpl);
//# sourceMappingURL=CategoryRepository.js.map