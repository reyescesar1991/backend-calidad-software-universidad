

export class SubrouteDuplicateError extends Error{

    constructor(message: string){
        super(message);
        this.name = "SubrouteDuplicateError"
    }
}

export class SubrouteRouteMatchError extends Error{

    constructor(message: string){
        super(message);
        this.name = "SubrouteRouteMatchError"
    }
}

export class SubrouteNotFoundError extends Error{

    constructor(message: string = "La subruta no existe, intente con un ID valido"){

        super(message);
        this.name = "SubrouteNotFoundError";
    }
}

export class SubrouteAlreadyInactiveError extends Error{

    constructor(message: string = "La subruta actualmente esta inactiva"){

        super(message);
        this.name = "SubrouteAlreadyInactiveError"
    }
}

export class SubrouteAlreadyActiveError extends Error{

    constructor(message: string = "La subruta actualmente esta activa"){

        super(message);
        this.name = "SubrouteAlreadyActiveError";
    }
}

export class SubrouteNotFoundByPermissionError extends Error{

    constructor(message: string = "Subruta no encontrada. ID de permiso incorrecto, verifiquelo nuevamente"){

        super(message);
        this.name = "SubrouteNotFoundByPermissionError"
    }
}

export class FilterSubrouteError extends Error{

    constructor(message: string = "Error en el filtro, verifique los datos"){

        super(message);
        this.name = "FilterSubrouteError";
    }
}

export class SubroutesNotFoundedByMainRouteError extends Error{


    constructor(message: string = "La ruta principal solicitada no tiene subrutas asociadas"){

        super(message);
        this.name = "SubroutesNotFoundedByMainRouteError";
    }
}
