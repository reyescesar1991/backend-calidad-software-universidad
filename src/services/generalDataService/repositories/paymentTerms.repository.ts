import { ClientSession, Model } from "mongoose";
import { PaymentTermDocument } from "../../../db/models";
import { ObjectIdParam, PaymentTermDto, UpdatePaymentTermDto } from "../../../validations";
import { IPaymentTermsRepository } from "../interfaces/IPaymentTerms.repository";
import { inject, injectable } from "tsyringe";

@injectable()
export class PaymentTermsRepositoryImpl implements IPaymentTermsRepository{

    constructor(
        @inject("PaymentTermModel") private readonly PaymentTermModel : Model<PaymentTermDocument>,
    ){}
    
    async findAllPaymentTerms(): Promise<PaymentTermDocument[] | null> {
        
        return await this.PaymentTermModel.find({}).exec();
    }

    async findPaymentTermById(idPaymentTerm: ObjectIdParam): Promise<PaymentTermDocument | null> {
        
        return await this.PaymentTermModel.findById(idPaymentTerm).exec();
    }

    async findPaymentTermByCustomId(customIdPaymentTerm: string): Promise<PaymentTermDocument | null> {
        
        return await this.PaymentTermModel.findOne({id : customIdPaymentTerm}).exec();
    }

    async createPaymentTerm(dataCreatePaymentTerm: PaymentTermDto, session?: ClientSession): Promise<PaymentTermDocument | null> {
        
        const [paymentTerm] = await this.PaymentTermModel.create([dataCreatePaymentTerm], {session});

        return paymentTerm;
    }

    async updatePaymentTerm(idPaymentTerm : ObjectIdParam, dataUpdatePaymentTerm: UpdatePaymentTermDto, session?: ClientSession): Promise<PaymentTermDocument | null> {
        
        return await this.PaymentTermModel.findByIdAndUpdate(
            idPaymentTerm,
            dataUpdatePaymentTerm,
            {new: true, runValidators: true, session}
        ).exec();
    }

    async activatePaymentTerm(idPaymentTerm: ObjectIdParam, session?: ClientSession): Promise<PaymentTermDocument | null> {
        
        return await this.PaymentTermModel.findByIdAndUpdate(

            idPaymentTerm,
            {$set : {isActive : true}},
            {new: true, runValidators: true, session}

        ).exec();
    }

    async inactivatePaymentTerm(idPaymentTerm: ObjectIdParam, session?: ClientSession): Promise<PaymentTermDocument | null> {
        
        return await this.PaymentTermModel.findByIdAndUpdate(

            idPaymentTerm,
            {$set : {isActive : false}},
            {new: true, runValidators: true, session}
            
        ).exec();
    }

    
}