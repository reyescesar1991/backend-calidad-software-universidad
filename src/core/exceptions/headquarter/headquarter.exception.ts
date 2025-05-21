import { AppError } from "../generals/general.exceptions";

export class LocationHeadquarterInvalidError extends AppError{
    code = 1601;
    constructor(message : string = "Combinación invalida de ubicacion entre ciudad, estado y código zip"){

        super(message);
        this.name = "LocationHeadquarterInvalidError"
        
    }
}

export class HeadquarterNotExistsError extends AppError{
    code = 1602;
    constructor(message : string = "La sucursal no existe, intente con un ID valido"){

        super(message);
        this.name = "HeadquarterNotExistsError"
        
    }
}

export class HeadquarterAlreadyExistsError extends AppError{
    code = 1605;
    constructor(message : string = "La sucursal ya existe, intente con un ID diferente"){

        super(message);
        this.name = "HeadquarterAlreadyExistsError"
        
    }
}

export class HeadquarterIsAlreadyActiveError extends AppError{
    code = 1603;
    constructor(message : string = "La sucursal ya se encuentra activa, intente con un ID de una sucursal inactiva"){

        super(message);
        this.name = "HeadquarterIsAlreadyActiveError"
        
    }
}

export class HeadquarterIsAlreadyDesactiveError extends AppError{
    code = 1604;
    constructor(message : string = "La sucursal ya se encuentra desactivada, intente con un ID de una sucursal activa"){

        super(message);
        this.name = "HeadquarterIsAlreadyDesactiveError"
        
    }
}

export class FilterHeadquarterError extends AppError{
    code = 1606;
    constructor(message : string = "El filtro de busqueda no es valido, intente ajustar los parárametros"){

        super(message);
        this.name = "FilterHeadquarterError"
        
    }
}

export class HeadquartersByFilterNotFoudError extends AppError{
    code = 1607;
    constructor(message : string = "Ninguna sucursal coincide con los parámetros de busqueda, intente nuevamente"){

        super(message);
        this.name = "HeadquartersByFilterNotFoudError"
        
    }
}

export class HeadquarterKeysAlreadyExistError extends AppError{
    code = 1608;
    constructor(message : string = "Los campos etiqueta, telefono, email y nombre deben ser unicos por sucursal. Intente con datos diferentes"){

        super(message);
        this.name = "HeadquarterKeysAlreadyExistError"
        
    }
}

export class HeadquartersListNotFoudError extends AppError{
    code = 1609;
    constructor(message : string = "No existen sucursales registradas en la base de datos"){

        super(message);
        this.name = "HeadquartersListNotFoudError"
        
    }
}

