export class PermissionSecurityDuplicateError extends Error{

    constructor(){

        super("El permiso de seguridad ya existe");
        this.name = "PermissionSecurityDuplicateError";
    }
}

export class PermissionSecurityNotFoundError extends Error {

    constructor(message: string = "Permiso de seguridad no encontrado") {

        super(message);
        this.name = "PermissionSecurityNotFoundError";
    }
}

export class PermissionSecurityUpdateError extends Error {

    constructor() {

        super("Error al actualizar el permiso de seguridad");
        this.name = "PermissionUpdateError";
    }
}

export class PermissionSecurityAlreadyInactiveError extends Error {

    constructor() {

        super("El permiso de seguridad ya está inactivo");
        this.name = "PermissionSecurityAlreadyInactiveError";
    }
}