import { z } from "zod";
import { AppError } from "../generals/general.exceptions";

export class PermissionNotFoundError extends AppError {
    code = 1101;
    constructor(message: string = "Permiso no encontrado") {

        super(message);
        this.name = "PermissionNotFoundError";
    }
}

export class PermissionAlreadyInactiveError extends AppError {
    code = 1102;
    constructor() {

        super("El permiso ya está inactivo");
        this.name = "PermissionAlreadyInactiveError";
    }
}

export class PermissionUpdateError extends AppError {
    code = 1103;
    constructor() {

        super("Error al actualizar el permiso");
        this.name = "PermissionUpdateError";
    }
}

export class LabelInvalidError extends AppError {
    code = 1104;
    constructor(message: string, public details?: z.ZodIssue[]) {
        super(message);
        this.name = "LabelInvalidError";
    }
}

export class LabelDuplicateError extends AppError {
    code = 1105;
    constructor(message: string) {
        super(message);
        this.name = "LabelDuplicateError";
    }
}

export class PermissionDuplicateError extends AppError{
    code = 1106;
    constructor(message: string) {
        super(message);
        this.name = "PermissionDuplicateError";
    }
}

export class PermissionInUseError extends AppError{
    code = 1107;
    constructor(message: string) {
        super(message);
        this.name = "PermissionInUseError";
    }
}