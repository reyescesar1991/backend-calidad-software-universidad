export interface ISupplierType {

    id: string;
    name: string;
    tradeName: string;
    contactPerson: string;
    phoneNumber: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    taxId: string;
    businessRegistrationNumber: string;
    paymentTerms: string;
    isActive?: boolean;
    notes?: string;
}