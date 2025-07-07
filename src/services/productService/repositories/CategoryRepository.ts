import { ClientSession, FilterQuery, Model } from "mongoose";
import { CategoryProductDocument } from "../../../db/models";
import { ObjectIdParam, CategoryProductDto, UpdateCategoryProductDto } from "../../../validations";
import { ICategoryProductRepository } from "../interfaces/ICategoryRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CategoryRepositoryImpl implements ICategoryProductRepository{

    constructor(
        @inject("CategoryProductModel") private readonly CategoryProductModel : Model<CategoryProductDocument>,
    ){}

    async findCategoryById(idCategory: ObjectIdParam): Promise<CategoryProductDocument | null> {
        
        return await this.CategoryProductModel.findById(idCategory).exec();
    }

    async findAllCategories(): Promise<CategoryProductDocument[] | null> {
        
        return await this.CategoryProductModel.find({}).exec();
    }

    async findCategoryByCustomId(customIdCategory: string): Promise<CategoryProductDocument | null> {
        
        return await this.CategoryProductModel.findOne({idCategory : customIdCategory}).exec();
    }

    async findCategoryByLabel(label: string, isActive ?: boolean): Promise<CategoryProductDocument[] | null> {
        
        const query: FilterQuery<CategoryProductDocument> = {};

        if(label) query.label = label;

        if (typeof isActive === 'boolean') query.isActive = isActive;

        return await this.CategoryProductModel.find(query).exec();
    }

    async createCategory(dataCreateCategory: CategoryProductDto, session?: ClientSession): Promise<CategoryProductDocument | null> {
        
        const [category] = await this.CategoryProductModel.create([dataCreateCategory], {session});

        return category;
    }

    async updateCategory(idCategory: ObjectIdParam, dataUpdateCategory: UpdateCategoryProductDto, session?: ClientSession): Promise<CategoryProductDocument | null> {
        
        return await this.CategoryProductModel.findByIdAndUpdate(
            idCategory,
            dataUpdateCategory,
            {new: true, runValidators: true, session}
        ).exec();
    }

    async activateCategory(idCategory: ObjectIdParam, session?: ClientSession): Promise<CategoryProductDocument | null> {
        
        return await this.CategoryProductModel.findByIdAndUpdate(
            idCategory,
            {$set : {isActive : true}},
            {new: true, runValidators: true, session}
        ).exec();
    }

    async inactivateCategory(idCategory: ObjectIdParam, session?: ClientSession): Promise<CategoryProductDocument | null> {
        
        return await this.CategoryProductModel.findByIdAndUpdate(
            idCategory,
            {$set : {isActive : false}},
            {new : true, runValidators: true, session}
        ).exec();
    }
    async viewableCategory(idCategory: ObjectIdParam, session?: ClientSession): Promise<CategoryProductDocument | null> {
        
        return await this.CategoryProductModel.findByIdAndUpdate(
            idCategory,
            {$set : {isVisible : true}},
            {new: true, runValidators: true, session}
        ).exec();
    }

    async dontViewableCategory(idCategory: ObjectIdParam, session?: ClientSession): Promise<CategoryProductDocument | null> {
        
        return await this.CategoryProductModel.findByIdAndUpdate(
            idCategory,
            {$set : {isVisible : false}},
            {new: true, runValidators: true, session}
        ).exec();
    }
}