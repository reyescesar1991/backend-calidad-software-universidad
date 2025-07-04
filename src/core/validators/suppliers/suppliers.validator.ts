import { inject, injectable } from "tsyringe";
import { SupplierDocument } from "../../../db/models";
import { ItHasUniqueDataAndRegisteredError, SupplierAlreadyExistsError, SupplierIsAlreadyActiveError, SupplierIsAlreadyInactiveError, SupplierNotExistsError, SuppliersNotExistsError } from "../../exceptions";
import { ISupplierRepository } from "../../../services/supplierService";
import { ObjectIdParam } from "../../../validations";

export interface DataUniqueSupplier {

    email?: string,
    phoneNumber?: string,
    taxId?: string,
    name?: string,
    tradeName?: string,
    contactPerson?: string,
    businessRegistrationNumber?: string,
    excludeId?: ObjectIdParam
}

@injectable()
export class SupplierValidator {

    constructor(
        @inject("ISupplierRepository") private readonly supplierRepository: ISupplierRepository,
    ) { }

    static validateSupplierExists(supplier: SupplierDocument): void {

        if (!supplier) throw new SupplierNotExistsError();
    }

    static validateSuppliersExists(suppliers: SupplierDocument[]): void {

        if (suppliers.length < 0) throw new SuppliersNotExistsError();
    }

    static validateSupplierAlreadyActive(supplier: SupplierDocument): void {

        if (supplier.isActive) throw new SupplierIsAlreadyActiveError();
    }

    static validateSupplierAlreadyInactive(supplier: SupplierDocument): void {

        if (!supplier.isActive) throw new SupplierIsAlreadyInactiveError();
    }

    async validateIDSupplierUniqueness(idCustomSupplier: string): Promise<void> {

        const supplier = await this.supplierRepository.findSupplierByCustomId(idCustomSupplier);

        if (supplier) throw new SupplierAlreadyExistsError();
    }

    async validateUniqueFieldsData(dataUniqueSupplier : DataUniqueSupplier) : Promise<void>{

        const haveUniqueFields = await this.supplierRepository.existsByContactInfo(
            dataUniqueSupplier.email,
            dataUniqueSupplier.phoneNumber,
            dataUniqueSupplier.taxId,
            dataUniqueSupplier.name,
            dataUniqueSupplier.tradeName,
            dataUniqueSupplier.contactPerson,
            dataUniqueSupplier.businessRegistrationNumber,
        );

        if(haveUniqueFields) throw new ItHasUniqueDataAndRegisteredError();
    }

}