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

    code = 1403;

    constructor(message : string = 'No existen módulos que cumplan las condiciones del filtro'){

        super(message);
        this.name = "ModulesNotFoundByFilterError";
    }
}

export class ModuleAlreadyExistsError extends AppError{

    code = 1404;

    constructor(message : string = 'Módulo ya registrado, intente con un ID diferente'){

        super(message);
        this.name = "ModuleAlreadyExistsError";
    }
}

export class ModuleAlreadyActiveError extends AppError{

    code = 1405;

    constructor(message : string = 'Módulo ya se encuentra activo, intente con un ID diferente de un módulo inactivo'){

        super(message);
        this.name = "ModuleAlreadyActiveError";
    }
}

export class ModuleAlreadyInactiveError extends AppError{

    code = 1406;

    constructor(message : string = 'Módulo ya se encuentra inactivo, intente con un ID diferente de un módulo activo'){

        super(message);
        this.name = "ModuleAlreadyInactiveError";
    }
}

