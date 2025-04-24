

export class RouteAlreadyExistsError extends Error{

    constructor(message : string = "La ruta ya existe, intente nuevamente con un ID valido"){

        super(message);
        this.name = "RouteAlreadyExistsError"
    }
}

export class RouteNotExistsError extends Error{

    constructor(message : string = "La ruta no existe, intente nuevamente con un ID valido"){

        super(message);
        this.name = "RouteNotExistsError"
    }
}

export class ActiveRouteInconsistencyError extends Error{

    constructor(message : string = "La ruta ya posee un estatus de disponibilidad igual a la data enviada, compruebe la data o elimine esa propiedad"){

        super(message);
        this.name = "ActiveRouteInconsistencyError"
    }
}

export class RouteNameAlreadyExistsError extends Error{

    constructor(message : string = "El nombre de ruta ya esta registrado, ingrese otro nombre"){

        super(message);
        this.name = "RouteNameAlreadyExistsError"
    }
}

export class RouteAlreadyInactiveError extends Error{

    constructor(message : string = "La ruta actualmente se encuentra inactiva"){

        super(message);
        this.name = "RouteAlreadyInactiveError"
    }
}