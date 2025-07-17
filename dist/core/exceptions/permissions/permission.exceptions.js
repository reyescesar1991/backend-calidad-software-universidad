"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionInUseError = exports.PermissionDuplicateError = exports.LabelDuplicateError = exports.LabelInvalidError = exports.PermissionUpdateError = exports.PermissionAlreadyInactiveError = exports.PermissionNotFoundError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class PermissionNotFoundError extends general_exceptions_1.AppError {
    code = 1101;
    constructor(message = "Permiso no encontrado") {
        super(message);
        this.name = "PermissionNotFoundError";
    }
}
exports.PermissionNotFoundError = PermissionNotFoundError;
class PermissionAlreadyInactiveError extends general_exceptions_1.AppError {
    code = 1102;
    constructor() {
        super("El permiso ya está inactivo");
        this.name = "PermissionAlreadyInactiveError";
    }
}
exports.PermissionAlreadyInactiveError = PermissionAlreadyInactiveError;
class PermissionUpdateError extends general_exceptions_1.AppError {
    code = 1103;
    constructor() {
        super("Error al actualizar el permiso");
        this.name = "PermissionUpdateError";
    }
}
exports.PermissionUpdateError = PermissionUpdateError;
class LabelInvalidError extends general_exceptions_1.AppError {
    details;
    code = 1104;
    constructor(message, details) {
        super(message);
        this.details = details;
        this.name = "LabelInvalidError";
    }
}
exports.LabelInvalidError = LabelInvalidError;
class LabelDuplicateError extends general_exceptions_1.AppError {
    code = 1105;
    constructor(message) {
        super(message);
        this.name = "LabelDuplicateError";
    }
}
exports.LabelDuplicateError = LabelDuplicateError;
class PermissionDuplicateError extends general_exceptions_1.AppError {
    code = 1106;
    constructor(message) {
        super(message);
        this.name = "PermissionDuplicateError";
    }
}
exports.PermissionDuplicateError = PermissionDuplicateError;
class PermissionInUseError extends general_exceptions_1.AppError {
    code = 1107;
    constructor(message) {
        super(message);
        this.name = "PermissionInUseError";
    }
}
exports.PermissionInUseError = PermissionInUseError;
//# sourceMappingURL=permission.exceptions.js.map