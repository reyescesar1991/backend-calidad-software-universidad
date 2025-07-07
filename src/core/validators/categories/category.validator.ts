import { inject, injectable } from "tsyringe";
import { ICategoryProductRepository } from "../../../services/productService";
import { CategoryProductDocument } from "../../../db/models";
import { CategoriesProductByLabelNotFoundError, CategoriesProductNotFoundError, CategoryAlreadyExistsError, CategoryProductIsAlreadyActiveError, CategoryProductIsAlreadyInactiveError, CategoryProductIsAlreadyNotViewableError, CategoryProductIsAlreadyViewableError, CategoryProductNotFoundError } from "../../exceptions";

@injectable()
export class CategoryProductValidator{

    constructor(
        @inject("ICategoryProductRepository") private readonly categoryRepository : ICategoryProductRepository,
    ){}

    static validateCategoryProductExists(category : CategoryProductDocument) : void {

        if(!category) throw new CategoryProductNotFoundError();
    }

    static validateCategoriesProductExists(categories : CategoryProductDocument[]) : void {

        if(categories.length < 0) throw new CategoriesProductNotFoundError();
    }

    static validateCategoriesProductExistsByLabel(categories : CategoryProductDocument[]) : void {

        if(categories.length < 0) throw new CategoriesProductByLabelNotFoundError();
    }

    static validateCategoryProductAlreadyIsActive(category : CategoryProductDocument) : void {

        if(category.isActive) throw new CategoryProductIsAlreadyActiveError();
    }

    static validateCategoryProductAlreadyIsInactive(category : CategoryProductDocument) : void {

        if(!category.isActive) throw new CategoryProductIsAlreadyInactiveError();
    }

    static validateCategoryProductAlreadyIsViewable(category : CategoryProductDocument) : void {

        if(category.isVisible) throw new CategoryProductIsAlreadyViewableError();
    }

    static validateCategoryProductAlreadyIsNotViewable(category : CategoryProductDocument) : void {

        if(!category.isVisible) throw new CategoryProductIsAlreadyNotViewableError();
    }

    async validateCustomIdUniqueness(customIdCategory : string) : Promise<void>{

        const categoryProduct = await this.categoryRepository.findCategoryByCustomId(customIdCategory);

        if(categoryProduct) throw new CategoryAlreadyExistsError();
    }
}