import { ClientSession } from "mongoose";
import { PaymentTermDocument } from "../../../db/models";
import { ObjectIdParam, PaymentTermDto, UpdatePaymentTermDto } from "../../../validations";

export interface IPaymentTermsRepository{

    findPaymentTermById(idPaymentTerm : ObjectIdParam) : Promise<PaymentTermDocument | null>;
    findPaymentTermByCustomId(customIdPaymentTerm : string) : Promise<PaymentTermDocument | null>;
    createPaymentTerm(dataCreatePaymentTerm : PaymentTermDto, session ?: ClientSession) : Promise<PaymentTermDocument | null>;
    updatePaymentTerm(idPaymentTerm : ObjectIdParam, dataUpdatePaymentTerm : UpdatePaymentTermDto, session ?: ClientSession) : Promise<PaymentTermDocument | null>;
    activatePaymentTerm(idPaymentTerm : ObjectIdParam, session ?: ClientSession) : Promise<PaymentTermDocument | null>;
    inactivatePaymentTerm(idPaymentTerm : ObjectIdParam, session ?: ClientSession) : Promise<PaymentTermDocument | null>;
    findAllPaymentTerms() : Promise<PaymentTermDocument[] | null>;
}