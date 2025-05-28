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

export class UserNotFoundByFilterError extends AppError{
    code = 1804;
    constructor(message : string = "No se han encontrado usuarios de acuerdo a los parámetros del filtro"){

        super(message);
        this.name = "UserNotFoundByFilterError"
        
    }
}

export class UserAlreadyExistsError extends AppError{
    code = 1805;
    constructor(message : string = "El usuario ya existe en el sistema, introduzca un ID diferente"){

        super(message);
        this.name = "UserAlreadyExistsError"
        
    }
}

export class UserUniqueKeysError extends AppError{
    code = 1806;
    constructor(message : string = "Los campos idUser, username, phone y email deben ser unicos por usuario, alguno de los valores colocados ya le pertenecen a otro usuario"){

        super(message);
        this.name = "UserUniqueKeysError"
        
    }
}