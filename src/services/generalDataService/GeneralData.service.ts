import { delay, inject, injectable } from "tsyringe";
import { IPaymentTermsRepository } from "./interfaces/IPaymentTerms.repository";
import { ObjectIdParam, PaymentTermDto, StatusStockResponseDto, statusStockSchemaZod, UpdatePaymentTermDto } from "../../validations";
import { LocationUserDocument, PaymentTermDocument } from "../../db/models";
import { handleError } from "../../core/exceptions";
import { LocationUserDataValidator, PaymentTermsValidator } from "../../core/validators";
import { Transactional } from "../../core/utils/transaccional-wrapper";
import { ClientSession } from "mongoose";
import { TransactionManager } from "../../core/database/transactionManager";
import { ProductStockService } from "../productService";
import { UserService } from "../userService/user.service";
import { SummaryDataResponseDto, summaryDataResponseSchemaZod } from "../../validations/generalUserData/summaryData.validation";
import { LocationService } from "../locationService/Location.service";
import { parse } from "path";

@injectable()
export class GeneralDataService{

    constructor(

        @inject("IPaymentTermsRepository") private readonly paymentTermsRepository : IPaymentTermsRepository,
        @inject("PaymentTermsValidator") private readonly paymentTermsValidator : PaymentTermsValidator,
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject(delay(() => UserService)) private readonly userService : UserService,
        @inject(delay(() => ProductStockService)) private readonly productStockService : ProductStockService,
        @inject(delay(() => LocationService)) private readonly locationService : LocationService,

    ){}

    async findPaymentTermById(idPaymentTerm: ObjectIdParam): Promise<PaymentTermDocument | null>{

        try {

            const paymentTerm = await this.paymentTermsRepository.findPaymentTermById(idPaymentTerm);

            PaymentTermsValidator.validatePaymentTermExists(paymentTerm);

            return paymentTerm;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findPaymentTermByCustomId(customIdPaymentTerm: string): Promise<PaymentTermDocument | null>{

        try {

            const paymentTerm = await this.paymentTermsRepository.findPaymentTermByCustomId(customIdPaymentTerm);

            PaymentTermsValidator.validatePaymentTermExists(paymentTerm);

            return paymentTerm;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async createPaymentTerm(dataCreatePaymentTerm: PaymentTermDto, session?: ClientSession): Promise<PaymentTermDocument | null>{

        try {

            await this.paymentTermsValidator.validateIdPaymentTermUniqueness(dataCreatePaymentTerm.id);

            PaymentTermsValidator.validateDaysToPayNotLessOne(dataCreatePaymentTerm.daysToPay);

            PaymentTermsValidator.validateDiscountNotLessZero(dataCreatePaymentTerm.discount);

            return await this.paymentTermsRepository.createPaymentTerm(dataCreatePaymentTerm, session);

            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async updatePaymentTerm(idPaymentTerm : ObjectIdParam, dataUpdatePaymentTerm: UpdatePaymentTermDto, session?: ClientSession): Promise<PaymentTermDocument | null>{

        try {

            PaymentTermsValidator.validateDaysToPayNotLessOne(dataUpdatePaymentTerm.daysToPay);

            PaymentTermsValidator.validateDiscountNotLessZero(dataUpdatePaymentTerm.discount);

            return await this.paymentTermsRepository.updatePaymentTerm(idPaymentTerm, dataUpdatePaymentTerm, session);

            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async activatePaymentTerm(idPaymentTerm: ObjectIdParam, session?: ClientSession): Promise<PaymentTermDocument | null>{

        try {

            const paymentTerm = await this.paymentTermsRepository.findPaymentTermById(idPaymentTerm);

            PaymentTermsValidator.validatePaymentTermExists(paymentTerm);

            PaymentTermsValidator.validatePaymentTermIsActive(paymentTerm);

            return await this.paymentTermsRepository.activatePaymentTerm(idPaymentTerm, session);

            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async inactivatePaymentTerm(idPaymentTerm: ObjectIdParam, session?: ClientSession): Promise<PaymentTermDocument | null>{

        try {

            const paymentTerm = await this.paymentTermsRepository.findPaymentTermById(idPaymentTerm);

            PaymentTermsValidator.validatePaymentTermExists(paymentTerm);

            PaymentTermsValidator.validatePaymentTermIsInactive(paymentTerm);

            return await this.paymentTermsRepository.inactivatePaymentTerm(idPaymentTerm, session);

            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findAllPaymentTerms(): Promise<PaymentTermDocument[] | null>{

        try {

            return await this.paymentTermsRepository.findAllPaymentTerms();
            
        } catch (error) {
            
            handleError(error);
        }
    }


    async getTotalProductWarehouseUser(location : LocationUserDocument) : Promise<number>{

        try {

            const productsInWarehouse = await this.productStockService.findProductByWarehouseId(location!.warehouseId);

            // Si no se encuentran productos en el almacén, el resultado puede ser null. Devolvemos 0 en ese caso.
            return productsInWarehouse ? productsInWarehouse.length : 0;
        } catch (error) {
            
            handleError(error);
        }
    }

    /**
     * Obtenemos total de productos en ese almacen, valor total de venta del almacen del usuario y la cantidad de productos con stock bajo
     * @param idUser 
     * @returns SummaryDataResponseDto[] que es el objeto que construye las tarjetas en la vista de inicio del frontend
     */
    async getSummaryData(idUser : string) : Promise<SummaryDataResponseDto[]>{

        try {

            const location = await this.userService.getUserLocation(idUser);

            const [
                totalProductWarehouse,
                valueWarehouse,
                productsLowStock
            ] = await Promise.all([
                this.getTotalProductWarehouseUser(location), // Asumiendo que toma warehouseId
                this.productStockService.getTotalStockMonetaryValueByWarehouse(location.warehouseId),
                this.productStockService.findProductsByStockLevel('low', location.warehouseId)
            ]);

            // console.log(totalProductWarehouse);
            console.log(valueWarehouse);
            // console.log(productsLowStock);
            

            // 3. Transformar los datos obtenidos a la estructura SummaryDataResponseDto[]
            const summaryCardsData: SummaryDataResponseDto[] = [
                {
                    iconType: 'product-icon',
                    icon: 'fas fa-box',
                    titleCard: 'Total Productos',
                    valueCard: totalProductWarehouse, // Asigna el valor obtenido
                    unit: ''
                },
                {
                    iconType: 'money-icon',
                    icon: 'fa fa-shopping-cart',
                    titleCard: 'Valor Inventario (Venta)',
                    valueCard: parseFloat(valueWarehouse.totalMonetaryValue.toFixed(2)), // Formatear a 2 decimales si es dinero
                    unit: '$',
                },
                {
                    iconType: 'alert-icon',
                    icon: 'fas fa-exclamation-triangle',
                    titleCard: 'Productos Stock Bajo',
                    valueCard: productsLowStock.length, // Si findProductsByStockLevel devuelve un array de productos
                    unit: ''
                }
            ];

            summaryCardsData.forEach(card => summaryDataResponseSchemaZod.parse(card));

            return summaryCardsData; // Devolver el array de DTOs

        } catch (error) {
            
            handleError(error);
        }
    }

    /**
     * 
     * @param idUser 
     * @returns Porcentaje de productos activos en el almacen del usuario
     */
    async getProductsActiveWarehousePorcentage(idWarehouse : ObjectIdParam) :  Promise<number>{

        try {

            const totalProduct = await this.productStockService.findProductByWarehouseId(idWarehouse);

            const totalProductActive = await this.productStockService.findProductByWarehouseIdActive(idWarehouse)

            return (totalProductActive.length / totalProduct.length) * 100;
            

        } catch (error) {
            
            handleError(error);
        }
    }

    /**
     * 
     * @param idWarehouse 
     * @returns Porcentaje de capacidad actual del almacen del usuario
     */
    async getCapacityWarehousePorcentage(idWarehouse : ObjectIdParam) :  Promise<number>{

        try {

            const currentCapacityWarehouse = await this.locationService.getCurrentCapacityWarehouse(idWarehouse);

            const capacityWarehouse = await this.locationService.getCapacityWarehouse(idWarehouse);
            
            return parseFloat((currentCapacityWarehouse / capacityWarehouse * 100).toFixed(2));
            

        } catch (error) {
            
            handleError(error);
        }
    }


    /**
     * 
     * @param idWarehouse 
     * @returns Porcentaje de capacidad actual del almacen del usuario
     */
    async getProductsOutOfStockWarehousePorcentage(idWarehouse : ObjectIdParam) :  Promise<number>{

        try {

            const productsInWarehouse = await this.productStockService.findProductByWarehouseId(idWarehouse);

            let countOfStock = 0;
            
            for(let product of productsInWarehouse){

                if(product.quantity <= 0){

                    countOfStock++;

                }
            }
            
            return parseFloat(((countOfStock / productsInWarehouse.length) * 100).toFixed(2)); 
            

        } catch (error) {
            
            handleError(error);
        }
    }


    /**
     * 
     * @param idUser 
     * @returns StatusStockResponseDto[] retorna el status del warehouse del usuario
     */
    async getStatusStock(idUser : string) :  Promise<StatusStockResponseDto[]>{

        try {

            const location = await this.userService.getUserLocation(idUser);

            const [
                activeProducts,
                warehouseCapacity,
                productOutOfStock
            ] = await Promise.all([
                this.getProductsActiveWarehousePorcentage(location.warehouseId), // Asumiendo que toma warehouseId
                this.getCapacityWarehousePorcentage(location.warehouseId),
                this.getProductsOutOfStockWarehousePorcentage(location.warehouseId)
            ]);

            const typeAlertWarehouseCapacity = warehouseCapacity < 50 ? 'success' : 'warning';
            const typeAlertProductOutOfStock = productOutOfStock > 50 ? 'error' : 'success';
            const typeAlertProductActive = activeProducts > 50 ? 'success' : 'warning';


            // 3. Transformar los datos obtenidos a la estructura SummaryDataResponseDto[]
            const statusWarehouse: StatusStockResponseDto[] = [
                {
                    title : 'Productos Activos',
                    typeStatus : typeAlertProductActive,
                    porcentage : activeProducts
                },
                {
                    title : 'Capacidad Almacén',
                    typeStatus : typeAlertWarehouseCapacity,
                    porcentage : warehouseCapacity
                },
                {
                    title : 'Productos Agotados',
                    typeStatus : typeAlertProductOutOfStock,
                    porcentage : productOutOfStock
                }
            ];

            statusWarehouse.forEach(card => statusStockSchemaZod.parse(card));

            return statusWarehouse; // Devolver el array de DTOs
            

        } catch (error) {
            
            handleError(error);
        }
    }
}