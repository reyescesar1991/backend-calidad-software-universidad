import { AppError } from "../generals/general.exceptions";

export class UnauthorizedException2FAError extends AppError{
    code = 2300;
    constructor(message: string = "La verificación de dos factores ha expirado o no se ha realizado. Recuerde que su código de autenticación dura 1 minuto"){
        super(message);
        this.name = "UnauthorizedException2FAError"
    }
}

export class AuthPasswordMismatchUsernameError extends AppError{
    code = 2301;
    constructor(message: string = "Los datos no son validos, intente nuevamente"){
        super(message);
        this.name = "AuthPasswordMismatchUsernameError"
    }
}

export class TwoFactorRequiredError extends Error {
    statusCode = 2302; // Unauthorized
    constructor(message: string, public userId: string, public preAuthToken: string) {
        super(message);
        this.name = 'TwoFactorRequiredError';
    }
}