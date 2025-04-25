import { AppError } from "../generals/general.exceptions";


export class SubrouteDuplicateError extends AppError{
    code = 1201;
    constructor(message: string){
        super(message);
        this.name = "SubrouteDuplicateError"
    }
}

export class SubrouteRouteMatchError extends AppError{
    code = 1202;
    constructor(message: string){
        super(message);
        this.name = "SubrouteRouteMatchError"
    }
}

export class SubrouteNotFoundError extends AppError{
    code = 1203;
    constructor(message: string = "La subruta no existe, intente con un ID valido"){

        super(message);
        this.name = "SubrouteNotFoundError";
    }
}

export class SubrouteAlreadyInactiveError extends AppError{
    code = 1204;
    constructor(message: string = "La subruta actualmente esta inactiva"){

        super(message);
        this.name = "SubrouteAlreadyInactiveError"
    }
}

export class SubrouteAlreadyActiveError extends AppError{
    code = 1205;
    constructor(message: string = "La subruta actualmente esta activa"){

        super(message);
        this.name = "SubrouteAlreadyActiveError";
    }
}

export class SubrouteNotFoundByPermissionError extends AppError{
    code = 1206;
    constructor(message: string = "Subruta no encontrada. ID de permiso incorrecto, verifiquelo nuevamente"){

        super(message);
        this.name = "SubrouteNotFoundByPermissionError"
    }
}

export class FilterSubrouteError extends AppError{
    code = 1207;
    constructor(message: string = "Error en el filtro, verifique los datos"){

        super(message);
        this.name = "FilterSubrouteError";
    }
}

export class SubroutesNotFoundedByMainRouteError extends AppError{

    code = 1208;
    constructor(message: string = "La ruta principal solicitada no tiene subrutas asociadas"){

        super(message);
        this.name = "SubroutesNotFoundedByMainRouteError";
    }
}

export class SubrouteNotFoundByCustomIdError extends AppError{
    code = 1209;
    constructor(message : string = "Subruta no encontrada, intente de nuevo con un ID valido"){

        super(message);
        this.name = "SubrouteNotFoundByCustomIdError";
    }
}
