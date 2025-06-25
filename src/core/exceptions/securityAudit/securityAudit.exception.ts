import { AppError } from "../generals/general.exceptions";

export class RegistryAuditNotFoundError extends AppError{
    code = 2200;
    constructor(message: string = "El usuario no tiene un registro de seguridad para auditar, debe crear el registro de antemano"){
        super(message);
        this.name = "RegistryAuditNotFoundError"
    }
}

export class RegistryAuditSecondFactorAttempsIsAlreadyMaxError extends AppError{
    code = 2201;
    constructor(message: string = "El usuario ya alcanzo el maximo de intentos para el segundo factor, su usuario sera bloqueado"){
        super(message);
        this.name = "RegistryAuditSecondFactorAttempsIsAlreadyMaxError"
    }
}

