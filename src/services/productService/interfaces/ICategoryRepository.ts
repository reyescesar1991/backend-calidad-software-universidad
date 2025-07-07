import { ClientSession } from "mongoose";
import { CategoryProductDocument } from "../../../db/models";
import { CategoryProductDto, ObjectIdParam, UpdateCategoryProductDto } from "../../../validations";

export interface ICategoryProductRepository{

    findCategoryById(idCategory : ObjectIdParam) : Promise<CategoryProductDocument | null>;
    findAllCategories() : Promise<CategoryProductDocument[] | null>;
    findCategoryByCustomId(customIdCategory : string) : Promise<CategoryProductDocument | null>;
    findCategoryByLabel(label : string, isActive ?: boolean) : Promise<CategoryProductDocument[] | null>;
    createCategory(dataCreateCategory : CategoryProductDto, session ?: ClientSession) : Promise<CategoryProductDocument | null>;
    updateCategory(idCategory : ObjectIdParam, dataUpdateCategory : UpdateCategoryProductDto, session ?: ClientSession) : Promise<CategoryProductDocument | null>;
    activateCategory(idCategory : ObjectIdParam, session ?: ClientSession) : Promise<CategoryProductDocument | null>;
    inactivateCategory(idCategory : ObjectIdParam, session ?: ClientSession) : Promise<CategoryProductDocument | null>;
    viewableCategory(idCategory : ObjectIdParam, session ?: ClientSession) : Promise<CategoryProductDocument | null>;
    dontViewableCategory(idCategory : ObjectIdParam, session ?: ClientSession) : Promise<CategoryProductDocument | null>;

} 