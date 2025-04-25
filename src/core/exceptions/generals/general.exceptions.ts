export abstract class AppError extends Error {
    abstract code: number;
}

export class InvalidParamError extends AppError {
    code = 1001;
    constructor(message: string) {
        super(message);
        this.name = "InvalidParamError";
    }
}

export class BadFormatMongoIDError extends AppError {
    code = 1002;
    constructor() {
        super("Formato de ID de objeto no es valido");
        this.name = "BadFormatMongoIDError";
    }
}

export class DatabaseConnectionError extends AppError {
    code = 1003;
    constructor() {
        super("Error en consulta, intente nuevamente");
        this.name = "DatabaseConnectionError";
    }
}

export class UnexpectedError extends AppError{

    code = 1004;
    constructor(error : Error, message : string = "Ha ocurrido un error inesperado, intente nuevamente" + error){

        super(message);
        this.name = "UnexpectedError";
    }
}

