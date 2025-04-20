

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
