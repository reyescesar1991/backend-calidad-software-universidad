import { z } from "zod";
import { AppError } from "../generals/general.exceptions";

export class PermissionSecurityDuplicateError extends AppError{
    code = 1001;
    constructor(message : string = "El permiso de seguridad ya existe"){

        super(message);
        this.name = "PermissionSecurityDuplicateError";
    }
}

export class PermissionSecurityNotFoundError extends AppError {
    code = 1002;
    constructor(message: string = "Permiso de seguridad no encontrado") {

        super(message);
        this.name = "PermissionSecurityNotFoundError";
    }
}

export class PermissionSecurityUpdateError extends AppError {
    code = 1003;
    constructor() {

        super("Error al actualizar el permiso de seguridad");
        this.name = "PermissionUpdateError";
    }
}

export class PermissionSecurityAlreadyInactiveError extends AppError {
    code = 1004;
    constructor() {

        super("El permiso de seguridad ya está inactivo");
        this.name = "PermissionSecurityAlreadyInactiveError";
    }
}

export class LabelDuplicatePermissionSecurityError extends AppError {
    code = 1005;
    constructor(message : string = "Etiqueta duplicada, intenta nuevamente con una diferente") {
        super(message);
        this.name = "LabelDuplicatePermissionSecurityError";
    }
}

export class LabelSecurityPermissionInvalidError extends AppError {
    code = 1006;
    constructor(message: string, public details?: z.ZodIssue[]) {
        super(message);
        this.name = "LabelInvalidError";
    }
}

export class PermissionSecurityInUseError extends AppError{
    code = 1007;
    constructor(message: string) {
        super(message);
        this.name = "PermissionInUseError";
    }
}

export class PermissionSecurityIdDuplicateError extends AppError{
    code = 1008;
    constructor(message : string = "El ID ya esta registrado, intente con uno nuevo"){

        super(message);
        this.name = "PermissionSecurityIdDuplicateError";
    }
}