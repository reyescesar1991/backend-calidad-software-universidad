export class PermissionNotFoundError extends Error{

    constructor(){

        super("Permiso no encontrado");
        this.name = "PermissionNotFoundError";
    }
}

export class PermissionAlreadyInactiveError extends Error{

    constructor(){

        super("El permiso ya está inactivo");
        this.name = "PermissionAlreadyInactiveError";
    }
}

export class PermissionUpdateError extends Error{

    constructor(){

        super("Error al actualizar el permiso");
        this.name = "PermissionUpdateError";
    }
}