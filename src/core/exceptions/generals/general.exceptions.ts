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

export class DatabaseConnectionError extends Error {
    constructor() {
        super("Error en consulta, intente nuevamente");
        this.name = "DatabaseConnectionError";
    }
}

