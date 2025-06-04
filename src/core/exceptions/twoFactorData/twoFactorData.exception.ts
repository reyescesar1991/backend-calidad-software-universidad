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

export class TwoFactorDataNotExistsByMethodError extends AppError{
    code = 1903;
    constructor(message: string = "No se encontró un factor asociado a ese nombre de método, intente nuevamente"){
        super(message);
        this.name = "TwoFactorDataNotExistsByMethodError"
    }
}

export class TwoFactorDataQuantityNewFactorError extends AppError{
    code = 1904;
    constructor(message: string = "La cantidad de personas asociadas a un nuevo factor de autenticación debe ser cero"){
        super(message);
        this.name = "TwoFactorDataQuantityNewFactorError"
    }
}