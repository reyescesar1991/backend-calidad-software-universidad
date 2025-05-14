import { AppError } from "../generals/general.exceptions";

export class RoleConfigNotFoundError extends AppError{
    code = 1601;
    constructor(message : string = "La configuración de rol no existe, intente nuevamente con un ID valido"){

        super(message);
        this.name = "RoleConfigNotFoundError"
        
    }
}

export class RoleConfigNotFoundByNameError extends AppError{
    code = 1602;
    constructor(message : string = "El nombre del rol de la configuración de rol no existe, intente nuevamente con un nombre valido"){

        super(message);
        this.name = "RoleConfigNotFoundByNameError"
        
    }
}

export class FilterRoleConfigError extends AppError{
    code = 1603;
    constructor(message : string = "El filtro no cumple con los parámetros de busqueda, intente nuevamente con un filtro valido"){

        super(message);
        this.name = "FilterRoleConfigError"
        
    }
}

export class RoleConfigsNotFoundByFilterError extends AppError{
    code = 1604;
    constructor(message : string = "No se encontro ninguna configuracion de rol que cumpla los parámetros de busqueda del filtro"){

        super(message);
        this.name = "RoleConfigsNotFoundByFilterError"
        
    }
}

export class RoleConfigAlreadyActiveError extends AppError{
    code = 1605;
    constructor(message : string = "La configuración de rol ya se encuentra activa"){

        super(message);
        this.name = "RoleConfigAlreadyActiveError"
        
    }
}

export class RoleConfigAlreadyInactiveError extends AppError{
    code = 1606;
    constructor(message : string = "La configuración de rol ya se encuentra inactiva"){

        super(message);
        this.name = "RoleConfigAlreadyInactiveError"
        
    }
}

export class RoleConfigAlreadyExistsError extends AppError{
    code = 1607;
    constructor(message : string = "La configuración de rol ya existe, intente con otro nombre de rol"){

        super(message);
        this.name = "RoleConfigAlreadyExistsError"
        
    }
}

export class RoleConfigRoleNotExistsError extends AppError{
    code = 1608;
    constructor(message : string = "El rol que integra agregar a la configuración de rol no existe, intente con un rol valido"){

        super(message);
        this.name = "RoleConfigRoleNotExistsError"
        
    }
}

export class RolConfigMaxLoginAttemptsNotValidError extends AppError{
    code = 1609;
    constructor(message : string = "Todas las configuraciones de rol minímo deben tener 2 intentos de login"){

        super(message);
        this.name = "RolConfigMaxLoginAttemptsNotValidError"
        
    }
}