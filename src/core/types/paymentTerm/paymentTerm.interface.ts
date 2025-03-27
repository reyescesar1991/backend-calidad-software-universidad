export interface IPaymentTermType {

    id: string;
    name: string;
    description: string;
    daysToPay: number;
    discount?: number;
    isActive: boolean;
}