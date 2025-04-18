export class InvalidParamError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidParamError";
    }
}

export class BadFormatMongoIDError extends Error {
    constructor() {
        super("Formato de ID de objeto no es valido");
        this.name = "BadFormatMongoIDError";
    }
}


