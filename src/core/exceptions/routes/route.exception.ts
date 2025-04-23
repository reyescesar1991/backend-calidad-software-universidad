

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