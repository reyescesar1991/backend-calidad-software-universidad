import { AppError } from "../generals/general.exceptions";


export class RouteAlreadyExistsError extends AppError{
    code = 1301;
    constructor(message : string = "La ruta ya existe, intente nuevamente con un ID valido"){

        super(message);
        this.name = "RouteAlreadyExistsError"
        
    }
}

export class RouteNotExistsError extends AppError{
    code = 1302;
    constructor(message : string = "La ruta no existe, intente nuevamente con un ID valido"){

        super(message);
        this.name = "RouteNotExistsError"
    }
}

export class ActiveRouteInconsistencyError extends AppError{
    code = 1303;
    constructor(message : string = "La ruta ya posee un estatus de disponibilidad igual a la data enviada, compruebe la data o elimine esa propiedad"){

        super(message);
        this.name = "ActiveRouteInconsistencyError"
    }
}

export class RouteNameAlreadyExistsError extends AppError{
    code = 1304;
    constructor(message : string = "El nombre de ruta ya esta registrado, ingrese otro nombre"){

        super(message);
        this.name = "RouteNameAlreadyExistsError"
    }
}

export class RouteAlreadyInactiveError extends AppError{
    code = 1305;
    constructor(message : string = "La ruta actualmente se encuentra inactiva"){

        super(message);
        this.name = "RouteAlreadyInactiveError"
    }
}

export class RouteAlreadyActiveError extends AppError{
    code = 1306;
    constructor(message : string = "La ruta ya se encuentra activa, intente con un ID de una ruta inactiva"){

        super(message);
        this.name = "RouteAlreadyActiveError"
    }
}