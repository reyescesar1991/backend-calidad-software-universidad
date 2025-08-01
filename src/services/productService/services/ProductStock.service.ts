import { inject, injectable } from "tsyringe";
import { IProductStockRepository } from "../interfaces/IProductStockRepository";
import { TransactionManager } from "../../../core/database/transactionManager";
import { ProductStockValidator, ProductValidator, WarehouseValidator } from "../../../core/validators";
import { ClientSession } from "mongoose";
import { AmountTotalStockByProductByWarehouseResponse, AmountTotalStockByProductResponse, ObjectIdParam, ProductStockDto, StockByStatusResponse, StockByWarehouseResponse, StockTotalByProductResponse, UpdateProductStockDto } from "../../../validations";
import { ProductDocument, ProductStockDocument } from "../../../db/models";
import { Transactional } from "../../../core/utils/transaccional-wrapper";
import { handleError } from "../../../core/exceptions";
import { ProductService } from "./Product.service";
import { LocationService } from "../../locationService/Location.service";
import { WarehouseTotalMonetaryValueResponse } from "../../../validations/productValidators/product.responses";

@injectable()
export class ProductStockService{

    constructor(
        @inject("IProductStockRepository") private readonly productStockRepository : IProductStockRepository,

        @inject("ProductStockValidator") private readonly productStockValidator : ProductStockValidator,

        @inject("TransactionManager") private readonly transactionManager : TransactionManager,

        @inject("ProductService") private readonly productService : ProductService,
        @inject(LocationService) private readonly locationService : LocationService,
        
    ){}

    async findProductStockByProductId(idProduct: ObjectIdParam): Promise<ProductStockDocument[] | null>{

        try {

            const productStock = await this.productStockRepository.findProductStockByProductId(idProduct);

            ProductStockValidator.validateProductsInStockExists(productStock);

            return productStock;    
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findProductByProductCustomId(customIdProduct: string): Promise<ProductStockDocument[] | null>{

        try {

            const productStock = await this.productStockRepository.findProductByProductCustomId(customIdProduct);

            ProductStockValidator.validateProductsInStockExists(productStock);

            return productStock;    
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findProductByWarehouseId(idWarehouse: ObjectIdParam): Promise<ProductStockDocument[] | null>{

        try {

            const productStock = await this.productStockRepository.findProductByWarehouseId(idWarehouse);

            ProductStockValidator.validateProductsInStockExists(productStock);

            return productStock;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findProductByWarehouseCustomId(customIdWarehouse: string): Promise<ProductStockDocument[] | null>{

        try {

            const productStock = await this.productStockRepository.findProductByWarehouseCustomId(customIdWarehouse);

            ProductStockValidator.validateProductsInStockExists(productStock);

            return productStock;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findAllProductsStock(): Promise<ProductStockDocument[] | null>{

        try {

            const productsStock = await this.productStockRepository.findAllProductsStock();

            ProductStockValidator.validateProductsInStockExists(productsStock);

            return productsStock;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async createProductStock(dataCreateProductStock: ProductStockDto, session?: ClientSession): Promise<ProductStockDocument | null>{

        try {

            //Validamos que exista el producto
            const product = await this.productService.findProductById(dataCreateProductStock.productId);

            //Validamos que el customId del producto sea el mismo que el pasado por el usuario encontrado por ID de mongo
            ProductValidator.validateCustomIdProductItsFromTheProduct(product.idProduct, dataCreateProductStock.productCustomId);

            //Validamos que exista el almacen
            const warehouse = await this.locationService.findWarehouseById(dataCreateProductStock.warehouseId);

            //Validamos que el customId del almacen sea el mismo que el pasado por el usuario para el almacen encontrado por ID de mongo
            WarehouseValidator.validateCustomIdWarehouseItsFromTheWarehouse(warehouse.idWarehouse, dataCreateProductStock.warehouseCustomId);

            //Validamos que la cantidad a agregar en stock sea mayor o igual a cero
            ProductStockValidator.validateStockProductQuantityMoreThanZero(dataCreateProductStock.quantity);

            //Validamos que el producto ya no se encuentre registrado en el mismo almacen
            await this.productStockValidator.validateProductStockUniqueness(dataCreateProductStock.productCustomId, dataCreateProductStock.warehouseCustomId);

            //Creamos el producto en el almacen
            return await this.productStockRepository.createProductStock(dataCreateProductStock, session);   
       
        } catch (error) {
            
            handleError(error);
        }
    }


    @Transactional()
    async activateProductInWarehouse(customIdProduct: string, idWarehouse : string, session?: ClientSession): Promise<ProductStockDocument | null>{

        try {

            //Validamos que el producto exista en la base de datos
            await this.productService.findProductByCustomId(customIdProduct);

            //Validamos que el almacen exista en la base de datos
            await this.locationService.findWarehouseByCustomId(idWarehouse);

            //Validamos que exista un registro en la tabla de stock con ambos id
            await this.productStockValidator.validateProductStockExists(customIdProduct, idWarehouse);

            //Validamos que el producto ya no se encuentre activo
            const productStock = await this.productStockRepository.findProductStockByProductIdAndWarehouseId(customIdProduct, idWarehouse);
            ProductStockValidator.validateProductAlreadyIsActive(productStock);

            //Activamos el producto
            return await this.productStockRepository.activateProductInWarehouse(customIdProduct, idWarehouse, session);

        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async inactivateProductInWarehouse(customIdProduct: string, idWarehouse : string, session?: ClientSession): Promise<ProductStockDocument | null>{

        try {

            //Validamos que el producto exista en la base de datos
            await this.productService.findProductByCustomId(customIdProduct);

            //Validamos que el almacen exista en la base de datos
            await this.locationService.findWarehouseByCustomId(idWarehouse);

            //Validamos que exista un registro en la tabla de stock con ambos id
            await this.productStockValidator.validateProductStockExists(customIdProduct, idWarehouse);

            //Validamos que el producto ya no se encuentre inactivo
            const productStock = await this.productStockRepository.findProductStockByProductIdAndWarehouseId(customIdProduct, idWarehouse);
            
            ProductStockValidator.validateProductAlreadyIsInactive(productStock);

            //Inactivamos el producto
            return await this.productStockRepository.inactivateProductInWarehouse(customIdProduct, idWarehouse, session);
            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async addStockProduct(idProduct: string, idWarehouse: string, quantity: number, session?: ClientSession): Promise<ProductStockDocument | null>{

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

            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async removeStockProduct(idProduct: string, idWarehouse: string, quantity: number, session?: ClientSession): Promise<ProductStockDocument | null>{

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
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async getStockByWarehouse(idWarehouse: ObjectIdParam): Promise<StockByWarehouseResponse[] | null>{

        try {

            const response = await this.productStockRepository.getStockByWarehouse(idWarehouse);

            if(response) return response;

            await this.locationService.findWarehouseById(idWarehouse);

            return null;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async getStockTotalByProduct(idProduct: ObjectIdParam): Promise<StockTotalByProductResponse[] | null>{

        try {

            const response = await this.productStockRepository.getStockTotalByProduct(idProduct);

            if(response) return response;

            await this.productService.findProductById(idProduct);

            return null;
            
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async getTotalStockMonetaryValueByWarehouse(idWarehouse: ObjectIdParam): Promise<WarehouseTotalMonetaryValueResponse | null>{

        try {

            const response : WarehouseTotalMonetaryValueResponse = await this.productStockRepository.getTotalStockMonetaryValueByWarehouse(idWarehouse);

            console.log(response);
            
            if(response) return response;

            await this.locationService.findWarehouseById(idWarehouse);

            return null;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async getAmountTotalStockByProduct(idProduct: ObjectIdParam): Promise<AmountTotalStockByProductResponse | null>{

        try {

            const response : AmountTotalStockByProductResponse = await this.productStockRepository.getAmountTotalStockByProduct(idProduct);

            if(response) return response

            await this.productService.findProductById(idProduct);

            return null;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async getMonetaryValueForSpecificProductInWarehouse( // Nuevo nombre más descriptivo
        idProduct: ObjectIdParam,
        idWarehouse: ObjectIdParam
    ): Promise<AmountTotalStockByProductByWarehouseResponse | null> {
        
        try {

            // 1. Consulta optimista: la operación más común.
            // Esto nos da el valor monetario si la relación existe.
            const response : AmountTotalStockByProductByWarehouseResponse = await this.productStockRepository.getMonetaryValueForSpecificProductInWarehouse(idProduct, idWarehouse);

            // 2. Si la consulta devuelve un resultado, lo retornamos inmediatamente.
            // Este es el "camino feliz" y es muy eficiente (1 sola consulta a la BD).
            if(response) return response;

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
            
        } catch (error) {
            
            handleError(error);
        }
    }


    async findProductsByStockLevel(status: 'low' | 'overstock' | 'ok', idWarehouse: ObjectIdParam): Promise<StockByStatusResponse[] | null> {

        try {

            // Validamos que el almacén exista antes de realizar la consulta
            await this.locationService.findWarehouseById(idWarehouse);

            return await this.productStockRepository.findProductsByStockLevel(status, idWarehouse);

        } catch (error) {

            handleError(error);
        }
    }

    async findProductByWarehouseIdActive(idWarehouse : ObjectIdParam) : Promise<ProductStockDocument[] | null>{

        try {

            const productInWarehouseActive = await this.productStockRepository.findProductByWarehouseIdActive(idWarehouse);

            if(productInWarehouseActive) return productInWarehouseActive

            const warehouse = await this.locationService.findWarehouseById(idWarehouse);

            WarehouseValidator.validateWarehouseExists(warehouse);

            return null;
            
        } catch (error) {
            
            handleError(error);
        }
    }
}