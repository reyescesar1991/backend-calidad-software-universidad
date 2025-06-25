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

export class UserTwoFactorValueFoundError extends AppError{
    code = 2102;
    constructor(message: string = "El usuario ya tiene un factor activo, ingreselo para continuar o genere otro"){
        super(message);
        this.name = "UserTwoFactorValueFoundError"
    }
}