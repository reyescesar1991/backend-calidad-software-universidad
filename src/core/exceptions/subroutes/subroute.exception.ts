

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
