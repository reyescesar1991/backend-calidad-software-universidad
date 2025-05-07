import { AppError } from "../generals/general.exceptions";

export class RoleNotFoundError extends AppError{
    code = 1501;
    constructor(message : string = "El rol no existe, intente nuevamente con un ID valido"){

        super(message);
        this.name = "RoleNotFoundError"
        
    }
}

export class FilterRoleError extends AppError{

    code = 1502;

    constructor(message : string = 'Filtros para encontrar roles no son validos'){

        super(message);
        this.name = "FilterRoleError";
    }
}

export class RolesNotFoundByFilterError extends AppError{

    code = 1503;

    constructor(message : string = 'No se ha encontrado roles que coincidan con los parametros del filtro'){

        super(message);
        this.name = "RolesNotFoundByFilterError";
    }
}

export class RolesNotFoundDatabaseError extends AppError{

    code = 1504;

    constructor(message : string = 'No se ha encontrado roles en la base de datos'){

        super(message);
        this.name = "RolesNotFoundDatabaseError";
    }
}

export class RoleAlreadyExistsError extends AppError{

    code = 1505;

    constructor(message : string = 'El Role que intenta crear ya se encuentra registrado, intente con un ID diferente'){

        super(message);
        this.name = "RoleAlreadyExistsError";
    }
}