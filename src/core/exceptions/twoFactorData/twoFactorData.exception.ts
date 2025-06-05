import { AppError } from "../generals/general.exceptions";


export class TwoFactorDataNotFoundInDatabaseError extends AppError{
    code = 1901;
    constructor(message: string = "No existen factores de autenticación en la base de datos"){
        super(message);
        this.name = "TwoFactorDataNotFoundInDatabaseError"
    }
}

export class TwoFactorDataNotExistsError extends AppError{
    code = 1902;
    constructor(message: string = "No se encontró un factor asociado a ese ID, intente nuevamente"){
        super(message);
        this.name = "TwoFactorDataNotExistsError"
    }
}

export class TwoFactorDataAlreadyExistsByMethodError extends AppError{
    code = 1903;
    constructor(message: string = "Se encontró un factor asociado a ese nombre de método, intente nuevamente con uno diferente"){
        super(message);
        this.name = "TwoFactorDataAlreadyExistsByMethodError"
    }
}

export class TwoFactorDataQuantityNewFactorError extends AppError{
    code = 1904;
    constructor(message: string = "La cantidad de personas asociadas a un nuevo factor de autenticación debe ser cero"){
        super(message);
        this.name = "TwoFactorDataQuantityNewFactorError"
    }
}

export class TwoFactorDataNotFoundByMethodError extends AppError{
    code = 1905;
    constructor(message: string = "No se encontró un factor asociado a ese nombre de método, intente nuevamente con uno diferente"){
        super(message);
        this.name = "TwoFactorDataNotFoundByMethodError"
    }
}

export class TwoFactorDataAlreadyEnableError extends AppError{
    code = 1906;
    constructor(message: string = "El factor de autenticación ya se encuentra activo"){
        super(message);
        this.name = "TwoFactorDataAlreadyEnableError"
    }
}

export class TwoFactorDataAlreadyDisableError extends AppError{
    code = 1907;
    constructor(message: string = "El factor de autenticación ya se encuentra inactivo"){
        super(message);
        this.name = "TwoFactorDataAlreadyDisableError"
    }
}