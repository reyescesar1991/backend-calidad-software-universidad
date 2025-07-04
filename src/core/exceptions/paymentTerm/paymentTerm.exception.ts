import { AppError } from "../generals/general.exceptions";

export class PaymentTermNotFoudError extends AppError{
    code = 2500;
    constructor(message : string = "El termino de pago no fue encontrado, intente nuevamente con un ID valido"){

        super(message);
        this.name = "PaymentTermNotFoudError"
        
    }
}

export class PaymentTermsIDAlreadyExistsError extends AppError{
    code = 2501;
    constructor(message : string = "El ID del termino de pago ya existe, intente nuevamente con otro diferente"){

        super(message);
        this.name = "PaymentTermsIDAlreadyExistsError"
        
    }
}

export class DaysToPayCannotBeLessThanOneError extends AppError{
    code = 2502;
    constructor(message : string = "Los dias para pagar de un termino de pago no pueden ser menores a uno"){

        super(message);
        this.name = "DaysToPayCannotBeLessThanOneError"
        
    }
}

export class DiscountCannotBeLessThanZeroError extends AppError{
    code = 2503;
    constructor(message : string = "El descuente de un termino de pago no pueden ser menores a cero"){

        super(message);
        this.name = "DiscountCannotBeLessThanZeroError"
        
    }
}

export class PaymentTermIsAlreadyActiveError extends AppError{
    code = 2504;
    constructor(message : string = "Los dias para pagar de un termino de pago no pueden ser menores a uno"){

        super(message);
        this.name = "PaymentTermIsAlreadyActiveError"
        
    }
}

export class PaymentTermIsAlreadyInactiveError extends AppError{
    code = 2505;
    constructor(message : string = "Los dias para pagar de un termino de pago no pueden ser menores a uno"){

        super(message);
        this.name = "DiscountCannotBeLessThanZeroError"
        
    }
}