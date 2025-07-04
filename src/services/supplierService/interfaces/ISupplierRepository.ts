import { ClientSession } from "mongoose";
import { SupplierDocument } from "../../../db/models";
import { ObjectIdParam, SupplierDto, UpdateSupplierDto } from "../../../validations";

export interface ISupplierRepository{

    findSupplierById(idSupplier : ObjectIdParam) : Promise<SupplierDocument | null>;
    findSupplierByCustomId(customIdSupplier : string) : Promise<SupplierDocument | null>;
    createSupplier(dataCreateSupplier : SupplierDto, session ?: ClientSession) : Promise<SupplierDocument | null>;
    updateSupplier(idSupplier : ObjectIdParam, dataUpdateSupplier : UpdateSupplierDto, session ?: ClientSession) : Promise<SupplierDocument | null>;
    activateSupplier(idSupplier : ObjectIdParam, session ?: ClientSession) : Promise<SupplierDocument | null>;
    inactivateSupplier(idSupplier : ObjectIdParam, session ?: ClientSession) : Promise<SupplierDocument | null>;
    findSuppliersByName(name: string, isActive?: boolean): Promise<SupplierDocument[] | null>;
    findSuppliersByLocation(city?: string, state?: string, country?: string, isActive?: boolean): Promise<SupplierDocument[] | null>;
    findAllSuppliers(isActive?: boolean): Promise<SupplierDocument[] | null>;
    findSuppliersByPaymentTerm(paymentTermId: ObjectIdParam, isActive?: boolean): Promise<SupplierDocument[] | null>;
    existsByContactInfo(
        email?: string,
        phoneNumber?: string, 
        taxId?: string,
        name?: string,
        tradeName ?: string,
        contactPerson ?: string,
        businessRegistrationNumber ?: string,
        excludeId?: ObjectIdParam
    ): Promise<boolean>;
}