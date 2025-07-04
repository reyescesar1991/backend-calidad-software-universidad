import { inject, injectable } from "tsyringe";
import { PaymentTermDocument } from "../../../db/models";
import { DaysToPayCannotBeLessThanOneError, DiscountCannotBeLessThanZeroError, PaymentTermIsAlreadyActiveError, PaymentTermIsAlreadyInactiveError, PaymentTermNotFoudError, PaymentTermsIDAlreadyExistsError } from "../../exceptions";
import { ObjectIdParam } from "../../../validations";
import { IPaymentTermsRepository } from "../../../services/generalDataService";

@injectable()
export class PaymentTermsValidator{

    constructor(
        @inject("IPaymentTermsRepository") private readonly paymentTermsRepository : IPaymentTermsRepository,
    ){}

    static validatePaymentTermExists(paymentTerm : PaymentTermDocument) : void{

        if(!paymentTerm) throw new PaymentTermNotFoudError();
    }

    async validateIdPaymentTermUniqueness(idPaymentTerm : string) : Promise<void>{

        const paymentTerm = await this.paymentTermsRepository.findPaymentTermByCustomId(idPaymentTerm);

        if(paymentTerm) throw new PaymentTermsIDAlreadyExistsError();
    }

    static validateDaysToPayNotLessOne(daysToPay : number) : void{

        if(daysToPay < 1) throw new DaysToPayCannotBeLessThanOneError();
    }

    static validateDiscountNotLessZero(discount : number) : void{

        if(discount < 0) throw new DiscountCannotBeLessThanZeroError();
    }

    static validatePaymentTermIsActive(paymentTerm : PaymentTermDocument) : void{

        if(paymentTerm.isActive) throw new PaymentTermIsAlreadyActiveError();
    }

    static validatePaymentTermIsInactive(paymentTerm : PaymentTermDocument) : void{

        if(!paymentTerm.isActive) throw new PaymentTermIsAlreadyInactiveError();
    }
}