import { AppError } from "../generals/general.exceptions";

export class UserAlreadyHaveASessionError extends AppError{
    code = 2001;
    constructor(message: string = "El usuario tiene una sesión activa"){
        super(message);
        this.name = "UserAlreadyHaveASessionError"
    }
}

export class UserIsNotLoggedError extends AppError{
    code = 2002;
    constructor(message: string = "El usuario no tiene una sesión activa"){
        super(message);
        this.name = "UserIsNotLoggedError"
    }
}

export class UserSessionTokenIsNotValid extends AppError{
    code = 2003;
    constructor(message: string = "El token enviado por parámetros no coincide con el token guardado en base de datos, intente con un token valido"){
        super(message);
        this.name = "UserSessionTokenIsNotValid"
    }
}

export class UserAlreadyNotHaveASessionError extends AppError{
    code = 2004;
    constructor(message: string = "El usuario no tiene una sesión activa"){
        super(message);
        this.name = "UserAlreadyNotHaveASessionError"
    }
}