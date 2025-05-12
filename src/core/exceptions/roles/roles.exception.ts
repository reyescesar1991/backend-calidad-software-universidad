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

export class RoleNotValidDefaultSystemError extends AppError{

    code = 1506;

    constructor(message : string = 'El Role que intenta crear no puede ser el rol por defecto del sistema, el rol por defecto ya esta definido'){

        super(message);
        this.name = "RoleNotValidDefaultSystemError";
    }
}

export class RoleNotAdminManagePermissionError extends AppError{

    code = 1507;

    constructor(message : string = 'El Role que intenta crear no puede manejar permisos para otros roles'){

        super(message);
        this.name = "RoleNotAdminManagePermissionError";
    }
}

export class IdRoleAlreadyExistsError extends AppError{

    code = 1508;

    constructor(message : string = 'El id role que esta proporcionando ya esta registrado, intente con otro nuevamente'){

        super(message);
        this.name = "IdRoleAlreadyExistsError";
    }
}

export class RoleAlreadyInactiveError extends AppError{

    code = 1509;

    constructor(message : string = 'El role ya se encuentra desactivado, intente con un rol activo'){

        super(message);
        this.name = "RoleAlreadyInactiveError";
    }
}

export class RoleAlreadyActiveError extends AppError{

    code = 1510;

    constructor(message : string = 'El role ya se encuentra activo, intente con un rol inactivo'){

        super(message);
        this.name = "RoleAlreadyActiveError";
    }
}

export class RoleIdLockError extends AppError{

    code = 1511;

    constructor(message : string = 'El ID de rol de los roles primarios del sistema no puede ser cambiado, intente con un rol no nativo'){

        super(message);
        this.name = "RoleIdLockError";
    }
}

export class RolNotHavePermissionsError extends AppError{

    code = 1512;

    constructor(message : string = 'El rol no tiene permisos disponibles, configure previamente la data'){

        super(message);
        this.name = "RolNotHavePermissionsError";
    }
}

export class RolPermissionNotAvailableError extends AppError{

    code = 1513;

    constructor(message : string = 'El rol no tiene permisos suficientes para habilitar esa funcionalidad'){

        super(message);
        this.name = "RolPermissionNotAvailable";
    }
}

export class RolPermissionAlreadyAvailableError extends AppError{

    code = 1514;

    constructor(message : string = 'El rol ya tiene este permiso habilitado'){

        super(message);
        this.name = "RolPermissionAlreadyAvailable";
    }
}

export class RoleIsNotActiveError extends AppError{

    code = 1515;

    constructor(message : string = 'El rol esta inactivo'){

        super(message);
        this.name = "RoleIsNotActiveError";
    }
}

export class RolPermissionSecurityAlreadyAvailableError extends AppError{

    code = 1516;

    constructor(message : string = 'El rol ya tiene este permiso de seguridad habilitado'){

        super(message);
        this.name = "RolPermissionSecurityAlreadyAvailableError";
    }
}

export class RolNotHavePermissionsSecurityError extends AppError{

    code = 1517;

    constructor(message : string = 'El rol no tiene permisos de seguridad disponibles, configure previamente la data'){

        super(message);
        this.name = "RolNotHavePermissionsSecurityError";
    }
}

export class RolPermissionSecurityNotAvailableError extends AppError{

    code = 1518;

    constructor(message : string = 'El permiso de seguridad no puede ser agregado a este rol, intente con un rol administrador'){

        super(message);
        this.name = "RolPermissionSecurityNotAvailableError";
    }
}

export class RolNotHavePermissionSecurityError extends AppError{

    code = 1519;

    constructor(message : string = 'Este rol no tiene ningun permiso de seguridad, verifica el ID'){

        super(message);
        this.name = "RolNotHavePermissionSecurityError";
    }
}
