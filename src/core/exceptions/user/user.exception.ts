import { AppError } from "../generals/general.exceptions";


export class UserNotFoundByIdError extends AppError{
    code = 1801;
    constructor(message : string = "El usuario no fue encontrado, valide el ID e intente nuevamente"){

        super(message);
        this.name = "UserNotFoundByIdError"
        
    }
}

export class UserNotFoundByUsernameError extends AppError{
    code = 1802;
    constructor(message : string = "El usuario no fue encontrado, valide el usuario e intente nuevamente"){

        super(message);
        this.name = "UserNotFoundByUsernameError"
        
    }
}

export class FilterUserConfigError extends AppError{
    code = 1803;
    constructor(message : string = "El filtro no cumple con los parámetros de busqueda, intente nuevamente con un filtro valido"){

        super(message);
        this.name = "FilterUserConfigError"
        
    }
}