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
exports.CategoryProductValidator = void 0;
const tsyringe_1 = require("tsyringe");
const exceptions_1 = require("../../exceptions");
let CategoryProductValidator = class CategoryProductValidator {
    categoryRepository;
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    static validateCategoryProductExists(category) {
        if (!category)
            throw new exceptions_1.CategoryProductNotFoundError();
    }
    static validateCategoriesProductExists(categories) {
        if (categories.length < 0)
            throw new exceptions_1.CategoriesProductNotFoundError();
    }
    static validateCategoriesProductExistsByLabel(categories) {
        if (categories.length < 0)
            throw new exceptions_1.CategoriesProductByLabelNotFoundError();
    }
    static validateCategoryProductAlreadyIsActive(category) {
        if (category.isActive)
            throw new exceptions_1.CategoryProductIsAlreadyActiveError();
    }
    static validateCategoryProductAlreadyIsInactive(category) {
        if (!category.isActive)
            throw new exceptions_1.CategoryProductIsAlreadyInactiveError();
    }
    static validateCategoryProductAlreadyIsViewable(category) {
        if (category.isVisible)
            throw new exceptions_1.CategoryProductIsAlreadyViewableError();
    }
    static validateCategoryProductAlreadyIsNotViewable(category) {
        if (!category.isVisible)
            throw new exceptions_1.CategoryProductIsAlreadyNotViewableError();
    }
    async validateCustomIdUniqueness(customIdCategory) {
        const categoryProduct = await this.categoryRepository.findCategoryByCustomId(customIdCategory);
        if (categoryProduct)
            throw new exceptions_1.CategoryAlreadyExistsError();
    }
};
exports.CategoryProductValidator = CategoryProductValidator;
exports.CategoryProductValidator = CategoryProductValidator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ICategoryProductRepository")),
    __metadata("design:paramtypes", [Object])
], CategoryProductValidator);
//# sourceMappingURL=category.validator.js.map