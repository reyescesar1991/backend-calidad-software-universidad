import { inject, injectable } from "tsyringe";
import { ICategoryProductRepository } from "./interfaces/ICategoryRepository";
import { TransactionManager } from "../../core/database/transactionManager";
import { CategoryProductDto, ObjectIdParam, UpdateCategoryProductDto } from "../../validations";
import { CategoryProductDocument } from "../../db/models";
import { handleError } from "../../core/exceptions";
import { CategoryProductValidator } from "../../core/validators";
import { ClientSession } from "mongoose";
import { Transactional } from "../../core/utils/transaccional-wrapper";

@injectable()
export class ProductService{

    constructor(
        @inject("TransactionManager") private readonly transactionManager : TransactionManager,
        @inject("ICategoryProductRepository") private readonly categoryProductRepository : ICategoryProductRepository,
        @inject("CategoryProductValidator") private readonly categoryProductValidator : CategoryProductValidator
    ){}

    async findCategoryById(idCategory: ObjectIdParam): Promise<CategoryProductDocument | null>{

        try {

            const category = await this.categoryProductRepository.findCategoryById(idCategory);

            CategoryProductValidator.validateCategoryProductExists(category);

            return category;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findAllCategories(): Promise<CategoryProductDocument[] | null>{

        try {

            const categories = await this.categoryProductRepository.findAllCategories();

            CategoryProductValidator.validateCategoriesProductExists(categories);

            return categories;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findCategoryByCustomId(customIdCategory: string): Promise<CategoryProductDocument | null>{

        try {

            const category = await this.categoryProductRepository.findCategoryByCustomId(customIdCategory);

            CategoryProductValidator.validateCategoryProductExists(category);

            return category;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findCategoryByLabel(label: string, isActive ?: boolean): Promise<CategoryProductDocument[] | null> {

        try {

            const categories = await this.categoryProductRepository.findCategoryByLabel(label, isActive);

            CategoryProductValidator.validateCategoriesProductExistsByLabel(categories);

            return categories;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async createCategory(dataCreateCategory: CategoryProductDto, session?: ClientSession): Promise<CategoryProductDocument | null> {

        try {

            await this.categoryProductValidator.validateCustomIdUniqueness(dataCreateCategory.idCategory);

            return await this.categoryProductRepository.createCategory(dataCreateCategory, session);
            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async updateCategory(idCategory: ObjectIdParam, dataUpdateCategory: UpdateCategoryProductDto, session?: ClientSession): Promise<CategoryProductDocument | null> {

        try {

            const category = await this.categoryProductRepository.findCategoryById(idCategory);

            CategoryProductValidator.validateCategoryProductExists(category);

            return await this.categoryProductRepository.updateCategory(idCategory, dataUpdateCategory, session);
            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async activateCategory(idCategory: ObjectIdParam, session?: ClientSession): Promise<CategoryProductDocument | null>{

        try {

            const category = await this.categoryProductRepository.findCategoryById(idCategory);

            CategoryProductValidator.validateCategoryProductExists(category);

            CategoryProductValidator.validateCategoryProductAlreadyIsActive(category);

            return await this.categoryProductRepository.activateCategory(idCategory, session);

            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async inactivateCategory(idCategory: ObjectIdParam, session?: ClientSession): Promise<CategoryProductDocument | null>{

        try {

            const category = await this.categoryProductRepository.findCategoryById(idCategory);

            CategoryProductValidator.validateCategoryProductExists(category);

            CategoryProductValidator.validateCategoryProductAlreadyIsInactive(category);

            return await this.categoryProductRepository.inactivateCategory(idCategory, session);

            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async viewableCategory(idCategory: ObjectIdParam, session?: ClientSession): Promise<CategoryProductDocument | null>{

        try {

            const category = await this.categoryProductRepository.findCategoryById(idCategory);

            CategoryProductValidator.validateCategoryProductExists(category);

            CategoryProductValidator.validateCategoryProductAlreadyIsViewable(category);

            return await this.categoryProductRepository.viewableCategory(idCategory, session);

            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async dontViewableCategory(idCategory: ObjectIdParam, session?: ClientSession): Promise<CategoryProductDocument | null>{

        try {

            const category = await this.categoryProductRepository.findCategoryById(idCategory);

            CategoryProductValidator.validateCategoryProductExists(category);

            CategoryProductValidator.validateCategoryProductAlreadyIsNotViewable(category);

            return await this.categoryProductRepository.dontViewableCategory(idCategory, session);

            
        } catch (error) {
            
            handleError(error);
        }
    }
}