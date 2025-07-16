export abstract class AppError extends Error {
    abstract code: number;
}

export class InvalidParamError extends AppError {
    code = 400;
    constructor(message: string) {
        super(message);
        this.name = "InvalidParamError";
    }
}

export class BadFormatMongoIDError extends AppError {
    code = 400;
    constructor() {
        super("Formato de ID de objeto no es valido");
        this.name = "BadFormatMongoIDError";
    }
}

export class DatabaseConnectionError extends AppError {
    code = 500;
    constructor() {
        super("Error en consulta, intente nuevamente");
        this.name = "DatabaseConnectionError";
    }
}

export class UnexpectedError extends AppError{

    code = 500;
    details: any;
    constructor(error : Error, message : string = "Ha ocurrido un error inesperado, intente nuevamente" + error){

        super(message);
        this.name = "UnexpectedError";
    }
}

export class UnauthorizedSessionError extends AppError{

    code = 401;
    details: any;
    constructor(message : string = "Usted no esta autorizado para realizar esta accion, intente nuevamente", error ?: Error){

        super(message);
        this.name = "UnauthorizedSessionError";
    }
}

