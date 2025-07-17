"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionSecurityIdDuplicateError = exports.PermissionSecurityInUseError = exports.LabelSecurityPermissionInvalidError = exports.LabelDuplicatePermissionSecurityError = exports.PermissionSecurityAlreadyInactiveError = exports.PermissionSecurityUpdateError = exports.PermissionSecurityNotFoundError = exports.PermissionSecurityDuplicateError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class PermissionSecurityDuplicateError extends general_exceptions_1.AppError {
    code = 1001;
    constructor(message = "El permiso de seguridad ya existe") {
        super(message);
        this.name = "PermissionSecurityDuplicateError";
    }
}
exports.PermissionSecurityDuplicateError = PermissionSecurityDuplicateError;
class PermissionSecurityNotFoundError extends general_exceptions_1.AppError {
    code = 1002;
    constructor(message = "Permiso de seguridad no encontrado") {
        super(message);
        this.name = "PermissionSecurityNotFoundError";
    }
}
exports.PermissionSecurityNotFoundError = PermissionSecurityNotFoundError;
class PermissionSecurityUpdateError extends general_exceptions_1.AppError {
    code = 1003;
    constructor() {
        super("Error al actualizar el permiso de seguridad");
        this.name = "PermissionUpdateError";
    }
}
exports.PermissionSecurityUpdateError = PermissionSecurityUpdateError;
class PermissionSecurityAlreadyInactiveError extends general_exceptions_1.AppError {
    code = 1004;
    constructor() {
        super("El permiso de seguridad ya está inactivo");
        this.name = "PermissionSecurityAlreadyInactiveError";
    }
}
exports.PermissionSecurityAlreadyInactiveError = PermissionSecurityAlreadyInactiveError;
class LabelDuplicatePermissionSecurityError extends general_exceptions_1.AppError {
    code = 1005;
    constructor(message = "Etiqueta duplicada, intenta nuevamente con una diferente") {
        super(message);
        this.name = "LabelDuplicatePermissionSecurityError";
    }
}
exports.LabelDuplicatePermissionSecurityError = LabelDuplicatePermissionSecurityError;
class LabelSecurityPermissionInvalidError extends general_exceptions_1.AppError {
    details;
    code = 1006;
    constructor(message, details) {
        super(message);
        this.details = details;
        this.name = "LabelInvalidError";
    }
}
exports.LabelSecurityPermissionInvalidError = LabelSecurityPermissionInvalidError;
class PermissionSecurityInUseError extends general_exceptions_1.AppError {
    code = 1007;
    constructor(message) {
        super(message);
        this.name = "PermissionInUseError";
    }
}
exports.PermissionSecurityInUseError = PermissionSecurityInUseError;
class PermissionSecurityIdDuplicateError extends general_exceptions_1.AppError {
    code = 1008;
    constructor(message = "El ID ya esta registrado, intente con uno nuevo") {
        super(message);
        this.name = "PermissionSecurityIdDuplicateError";
    }
}
exports.PermissionSecurityIdDuplicateError = PermissionSecurityIdDuplicateError;
//# sourceMappingURL=permissionSecurity.exception.js.map