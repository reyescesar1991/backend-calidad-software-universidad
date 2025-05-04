import { AppError } from "../generals/general.exceptions";


export class ModuleNotFoundError extends AppError{

    code = 1401;

    constructor(message : string = 'Módulo no encontrado, intente con un ID valido'){

        super(message);
        this.name = "ModuleNotFoundError";
    }
}

export class FilterModuleError extends AppError{

    code = 1402;

    constructor(message : string = 'Filtros para encontrar módulos no son validos'){

        super(message);
        this.name = "FilterModuleError";
    }
}

export class ModulesNotFoundByFilterError extends AppError{

    code = 1402;

    constructor(message : string = 'No existen módulos que cumplan las condiciones del filtro'){

        super(message);
        this.name = "ModulesNotFoundByFilterError";
    }
}