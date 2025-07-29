import { inject, injectable } from "tsyringe";
import { ICategoryProductRepository } from "../interfaces/ICategoryRepository";
import { TransactionManager } from "../../../core/database/transactionManager";
import { CategoryProductDto, ObjectIdParam, ProductDto, UpdateCategoryProductDto, UpdateProductDto } from "../../../validations";
import { CategoryProductDocument, ProductDocument } from "../../../db/models";
import { handleError, ProductCriteriaPaginationPageError } from "../../../core/exceptions";
import { CategoryProductValidator, ProductValidator } from "../../../core/validators";
import { ClientSession } from "mongoose";
import { Transactional } from "../../../core/utils/transaccional-wrapper";
import { IProductRepository } from "../interfaces/IProductRepository";
import { SupplierService } from "../../supplierService/Supplier.service";
import { LocationService } from "../../locationService/Location.service";
import { r } from "@upstash/redis/zmscore-DzNHSWxc";

@injectable()
export class ProductService {

    constructor(
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("ICategoryProductRepository") private readonly categoryProductRepository: ICategoryProductRepository,
        @inject("CategoryProductValidator") private readonly categoryProductValidator: CategoryProductValidator,


        @inject("IProductRepository") private readonly productRepository: IProductRepository,
        @inject("ProductValidator") private readonly productValidator: ProductValidator,


        @inject(SupplierService) private readonly supplierService: SupplierService,

    ) { }

    async findCategoryById(idCategory: ObjectIdParam): Promise<CategoryProductDocument | null> {

        try {

            const category = await this.categoryProductRepository.findCategoryById(idCategory);

            CategoryProductValidator.validateCategoryProductExists(category);

            return category;

        } catch (error) {

            handleError(error);
        }
    }

    async findAllCategories(): Promise<CategoryProductDocument[] | null> {

        try {

            const categories = await this.categoryProductRepository.findAllCategories();

            CategoryProductValidator.validateCategoriesProductExists(categories);

            return categories;

        } catch (error) {

            handleError(error);
        }
    }

    async findCategoryByCustomId(customIdCategory: string): Promise<CategoryProductDocument | null> {

        try {

            const category = await this.categoryProductRepository.findCategoryByCustomId(customIdCategory);

            CategoryProductValidator.validateCategoryProductExists(category);

            return category;

        } catch (error) {

            handleError(error);
        }
    }

    async findCategoryByLabel(label: string, isActive?: boolean): Promise<CategoryProductDocument[] | null> {

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
    async activateCategory(idCategory: ObjectIdParam, session?: ClientSession): Promise<CategoryProductDocument | null> {

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
    async inactivateCategory(idCategory: ObjectIdParam, session?: ClientSession): Promise<CategoryProductDocument | null> {

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
    async viewableCategory(idCategory: ObjectIdParam, session?: ClientSession): Promise<CategoryProductDocument | null> {

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
    async dontViewableCategory(idCategory: ObjectIdParam, session?: ClientSession): Promise<CategoryProductDocument | null> {

        try {

            const category = await this.categoryProductRepository.findCategoryById(idCategory);

            CategoryProductValidator.validateCategoryProductExists(category);

            CategoryProductValidator.validateCategoryProductAlreadyIsNotViewable(category);

            return await this.categoryProductRepository.dontViewableCategory(idCategory, session);


        } catch (error) {

            handleError(error);
        }
    }

    async findProductById(idProduct: ObjectIdParam): Promise<ProductDocument | null> {

        try {

            const product = await this.productRepository.findProductById(idProduct);

            ProductValidator.validateProductExists(product);

            return product;

        } catch (error) {

            handleError(error);
        }
    }

    async findProductByCustomId(customIdProduct: string): Promise<ProductDocument | null> {

        try {

            const product = await this.productRepository.findProductByCustomId(customIdProduct);

            ProductValidator.validateProductExists(product);

            return product;

        } catch (error) {

            handleError(error);
        }
    }

    async findProductBySku(sku: string): Promise<ProductDocument | null> {

        try {

            const product = await this.productRepository.findProductBySku(sku);

            ProductValidator.validateProductExists(product);

            return product;

        } catch (error) {

            handleError(error)
        }
    }

    async findProductByBarcode(barcode: string): Promise<ProductDocument | null> {

        try {

            const product = await this.productRepository.findProductByBarcode(barcode);

            ProductValidator.validateProductExists(product);

            return product;

        } catch (error) {

            handleError(error);
        }
    }

    async findAllProducts(): Promise<ProductDocument[] | null> {

        try {

            const products = await this.productRepository.findAllProducts();

            ProductValidator.validateProductsExists(products);

            return products;


        } catch (error) {

            handleError(error);

        }
    }

    @Transactional()
    async createProduct(dataCreateProduct: ProductDto, session?: ClientSession): Promise<ProductDocument | null> {

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
            ProductValidator.validateProductsFormatNumber({
                purchasePrice: dataCreateProduct.purchasePrice,
                sellingPrice: dataCreateProduct.sellingPrice,
                minimumStockLevel: dataCreateProduct.minimumStockLevel,
                maximumStockLevel: dataCreateProduct.maximumStockLevel,
            });

            // Creamos el producto
            return await this.productRepository.createProduct(dataCreateProduct, session);

        } catch (error) {

            handleError(error);
        }
    }

    @Transactional()
    async updateProduct(idProduct: ObjectIdParam, dataUpdateProduct: UpdateProductDto, session?: ClientSession): Promise<ProductDocument | null> {

        try {

            //Verificar si el producto existe
            const product = await this.productRepository.findProductById(idProduct);

            ProductValidator.validateProductExists(product);

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

                await this.productRepository.existsByUniqueField(
                    {
                        name: dataUpdateProduct.name,
                    }
                )
            }

            //Verificamos que las cantidades sean mayores a 0
            ProductValidator.validateProductsFormatNumber({

                purchasePrice: dataUpdateProduct.purchasePrice,
                sellingPrice: dataUpdateProduct.sellingPrice,
                minimumStockLevel: dataUpdateProduct.minimumStockLevel,
                maximumStockLevel: dataUpdateProduct.maximumStockLevel,
            })

            //Actualizamos el producto
            return await this.productRepository.updateProduct(idProduct, dataUpdateProduct, session);

        } catch (error) {

            handleError(error);
        }
    }

    @Transactional()
    async activateProduct(idProduct: ObjectIdParam, session?: ClientSession): Promise<ProductDocument | null> {

        try {

            const product = await this.productRepository.findProductById(idProduct);

            ProductValidator.validateProductExists(product);

            ProductValidator.validateProductAlreadyIsActive(product);

            return await this.productRepository.activateProduct(idProduct, session);


        } catch (error) {

            handleError(error);
        }
    }

    @Transactional()
    async inactivateProduct(idProduct: ObjectIdParam, session?: ClientSession): Promise<ProductDocument | null> {

        try {

            const product = await this.productRepository.findProductById(idProduct);

            ProductValidator.validateProductExists(product);

            ProductValidator.validateProductAlreadyIsInactive(product);

            return await this.productRepository.inactivateProduct(idProduct, session);

        } catch (error) {

            handleError(error);
        }
    }

    async findProductsByCriteria(
        criteria: {
            categoryId?: ObjectIdParam;
            supplierId?: ObjectIdParam;
            brand?: string;
            isActive?: boolean;
            searchQuery?: string;
        },
        pagination: {
            page: number;
            limit: number;
        } = { page: 1, limit: 20 },
        sort: {
            [key: string]: 1 | -1;
        } = { name: 1 }
    ): Promise<ProductDocument[]> {

        try {

            if (criteria.supplierId) {

                await this.supplierService.findSupplierById(criteria.supplierId);

            }

            //Si existe en la dataUpdate el id de una nueva categoria, debemos ver si realmente existe dicha categoria
            if (criteria.categoryId) {

                await this.findCategoryById(criteria.categoryId);

            }

            console.log(pagination.page);
            

            if(pagination.page <= 0) throw new ProductCriteriaPaginationPageError();

            return await this.productRepository.findProductsByCriteria(criteria, pagination, sort);

        } catch (error) {

            handleError(error);
        }
    }
}