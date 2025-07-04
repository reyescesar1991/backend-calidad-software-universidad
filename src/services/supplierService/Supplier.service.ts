import { inject, injectable } from "tsyringe";
import { ISupplierRepository } from "./interfaces/ISupplierRepository";
import { handleError } from "../../core/exceptions";
import { ObjectIdParam, SupplierDto, UpdateSupplierDto } from "../../validations";
import { SupplierDocument } from "../../db/models";
import { PaymentTermsValidator, SupplierValidator } from "../../core/validators";
import { Transactional } from "../../core/utils/transaccional-wrapper";
import { ClientSession } from "mongoose";
import { GeneralDataService } from "../generalDataService";

@injectable()
export class SupplierService{

    constructor(
        @inject("ISupplierRepository") private readonly supplierRepository : ISupplierRepository,
        @inject("SupplierValidator") private readonly supplierValidator : SupplierValidator,
        @inject(GeneralDataService) private readonly generalDataService : GeneralDataService,
    ){}

    async findSupplierById(idSupplier: ObjectIdParam): Promise<SupplierDocument | null>{

        try {

            const supplier = await this.supplierRepository.findSupplierById(idSupplier);

            SupplierValidator.validateSupplierExists(supplier);

            return supplier;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findSupplierByCustomId(customIdSupplier: string): Promise<SupplierDocument | null>{

        try {

            const supplier = await this.supplierRepository.findSupplierByCustomId(customIdSupplier);

            SupplierValidator.validateSupplierExists(supplier);

            return supplier;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async createSupplier(dataCreateSupplier: SupplierDto, session?: ClientSession): Promise<SupplierDocument | null>{

        try {

            await this.supplierValidator.validateIDSupplierUniqueness(dataCreateSupplier.id);

            await this.supplierValidator.validateUniqueFieldsData({

                email : dataCreateSupplier.email,
                phoneNumber : dataCreateSupplier.phoneNumber,
                taxId : dataCreateSupplier.taxId,
                name : dataCreateSupplier.name,
                tradeName : dataCreateSupplier.tradeName,
                contactPerson : dataCreateSupplier.contactPerson,
                businessRegistrationNumber : dataCreateSupplier.businessRegistrationNumber,
            })

            const paymentTerm = await this.generalDataService.findPaymentTermById(dataCreateSupplier.paymentTerm);

            PaymentTermsValidator.validatePaymentTermExists(paymentTerm);

            const supplier = await this.supplierRepository.createSupplier(dataCreateSupplier, session);

            return supplier;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async updateSupplier(idSupplier: ObjectIdParam, dataUpdateSupplier: UpdateSupplierDto, session?: ClientSession): Promise<SupplierDocument | null>{

        try {

            await this.supplierValidator.validateUniqueFieldsData({

                email : dataUpdateSupplier.email,
                phoneNumber : dataUpdateSupplier.phoneNumber,
                taxId : dataUpdateSupplier.taxId,
                name : dataUpdateSupplier.name,
                tradeName : dataUpdateSupplier.tradeName,
                contactPerson : dataUpdateSupplier.contactPerson,
            })

            const paymentTerm = await this.generalDataService.findPaymentTermById(dataUpdateSupplier.paymentTerm);

            PaymentTermsValidator.validatePaymentTermExists(paymentTerm);

            const supplier = await this.supplierRepository.updateSupplier(idSupplier, dataUpdateSupplier, session);

            return supplier;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async activateSupplier(idSupplier: ObjectIdParam, session?: ClientSession): Promise<SupplierDocument | null>{

        try {

            const supplier = await this.supplierRepository.findSupplierById(idSupplier);

            SupplierValidator.validateSupplierExists(supplier);

            SupplierValidator.validateSupplierAlreadyActive(supplier);

            return await this.supplierRepository.activateSupplier(idSupplier, session);
            
        } catch (error) {
            
            handleError(error);
        }
    }

    @Transactional()
    async inactivateSupplier(idSupplier: ObjectIdParam, session?: ClientSession): Promise<SupplierDocument | null>{

        try {

            const supplier = await this.supplierRepository.findSupplierById(idSupplier);

            SupplierValidator.validateSupplierExists(supplier);

            SupplierValidator.validateSupplierAlreadyInactive(supplier);

            return await this.supplierRepository.inactivateSupplier(idSupplier, session);
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findSuppliersByName(name: string, isActive?: boolean): Promise<SupplierDocument[] | null>{

        try {

            const suppliers = await this.supplierRepository.findSuppliersByName(name, isActive);

            SupplierValidator.validateSuppliersExists(suppliers);

            return suppliers;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findSuppliersByLocation(city?: string, state?: string, country?: string, isActive?: boolean): Promise<SupplierDocument[] | null>{

        try {

            const suppliers = await this.supplierRepository.findSuppliersByLocation(city, state, country, isActive);

            SupplierValidator.validateSuppliersExists(suppliers);

            return suppliers;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findAllSuppliers(isActive?: boolean): Promise<SupplierDocument[] | null>{

        try {

            const suppliers = await this.supplierRepository.findAllSuppliers(isActive);

            SupplierValidator.validateSuppliersExists(suppliers);

            return suppliers;
            
        } catch (error) {
            
            handleError(error);
        }
    }

    async findSuppliersByPaymentTerm(paymentTermId: ObjectIdParam, isActive?: boolean): Promise<SupplierDocument[] | null>{

        try {

            const suppliers = await this.supplierRepository.findSuppliersByPaymentTerm(paymentTermId, isActive);

            SupplierValidator.validateSuppliersExists(suppliers);

            return suppliers;
            
        } catch (error) {
            
            handleError(error);
        }
    }
}