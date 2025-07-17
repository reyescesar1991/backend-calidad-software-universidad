"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistryAuditSecondFactorAttempsIsAlreadyMaxError = exports.RegistryAuditNotFoundError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class RegistryAuditNotFoundError extends general_exceptions_1.AppError {
    code = 2200;
    constructor(message = "El usuario no tiene un registro de seguridad para auditar, debe crear el registro de antemano") {
        super(message);
        this.name = "RegistryAuditNotFoundError";
    }
}
exports.RegistryAuditNotFoundError = RegistryAuditNotFoundError;
class RegistryAuditSecondFactorAttempsIsAlreadyMaxError extends general_exceptions_1.AppError {
    code = 2201;
    constructor(message = "El usuario ya alcanzo el maximo de intentos para el segundo factor, su usuario sera bloqueado") {
        super(message);
        this.name = "RegistryAuditSecondFactorAttempsIsAlreadyMaxError";
    }
}
exports.RegistryAuditSecondFactorAttempsIsAlreadyMaxError = RegistryAuditSecondFactorAttempsIsAlreadyMaxError;
//# sourceMappingURL=securityAudit.exception.js.map