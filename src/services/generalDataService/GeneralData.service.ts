import { delay, inject, injectable } from "tsyringe";
import { IPaymentTermsRepository } from "./interfaces/IPaymentTerms.repository";
import { ObjectIdParam, PaymentTermDto, UpdatePaymentTermDto } from "../../validations";
import { PaymentTermDocument } from "../../db/models";
import { handleError } from "../../core/exceptions";
import { LocationUserDataValidator, PaymentTermsValidator } from "../../core/validators";
import { Transactional } from "../../core/utils/transaccional-wrapper";
import { ClientSession } from "mongoose";
import { TransactionManager } from "../../core/database/transactionManager";
import { ProductStockService } from "../productService";
import { UserService } from "../userService/user.service";

@injectable()
export class GeneralDataService{

    constructor(

        @inject("IPaymentTermsRepository") private readonly paymentTermsRepository : IPaymentTermsRepository,
        @inject("PaymentTermsValidator") private readonly paymentTermsValidator : PaymentTermsValidator,
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject(delay(() => UserService)) private readonly userService : UserService,
        @inject(delay(() => ProductStockService)) private readonly productStockService : ProductStockService,

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


    async getTotalProductWarehouseUser(idUser : string) : Promise<number>{

        try {

            const location = await this.userService.getUserLocation(idUser);

            LocationUserDataValidator.validateLocationUserDataExists(location);

            const productsInWarehouse = await this.productStockService.findProductByWarehouseId(location!.warehouseId);

            // Si no se encuentran productos en el almacén, el resultado puede ser null. Devolvemos 0 en ese caso.
            return productsInWarehouse ? productsInWarehouse.length : 0;
        } catch (error) {
            
            handleError(error);
        }
    }
}