import { AppError } from "../generals/general.exceptions";

export class UserTwoFactorValueNotFoundError extends AppError{
    code = 2100;
    constructor(message: string = "El usuario no tiene registro en la tabla de segundo factor"){
        super(message);
        this.name = "UserTwoFactorValueNotFoundError"
    }
}

export class UserCodeNotMatchError extends AppError{
    code = 2101;
    constructor(message: string = "El código enviado no coincide con el enviado, intente nuevamente"){
        super(message);
        this.name = "UserCodeNotMatchError"
    }
}