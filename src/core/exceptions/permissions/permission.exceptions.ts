import { z } from "zod";

export class PermissionNotFoundError extends Error {

    constructor() {

        super("Permiso no encontrado");
        this.name = "PermissionNotFoundError";
    }
}

export class PermissionAlreadyInactiveError extends Error {

    constructor() {

        super("El permiso ya está inactivo");
        this.name = "PermissionAlreadyInactiveError";
    }
}

export class PermissionUpdateError extends Error {

    constructor() {

        super("Error al actualizar el permiso");
        this.name = "PermissionUpdateError";
    }
}

export class LabelInvalidError extends Error {
    constructor(message: string, public details?: z.ZodIssue[]) {
        super(message);
        this.name = "LabelInvalidError";
    }
}

export class LabelDuplicateError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "LabelDuplicateError";
    }
}

export class PermissionDuplicateError extends Error{

    constructor(message: string) {
        super(message);
        this.name = "PermissionDuplicateError";
    }
}

export class PermissionInUseError extends Error{

    constructor(message: string) {
        super(message);
        this.name = "PermissionInUseError";
    }
}