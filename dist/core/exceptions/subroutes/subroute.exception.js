"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteSubrouteError = exports.SubrouteNotFoundByCustomIdError = exports.SubroutesNotFoundedByMainRouteError = exports.FilterSubrouteError = exports.SubrouteNotFoundByPermissionError = exports.SubrouteAlreadyActiveError = exports.SubrouteAlreadyInactiveError = exports.SubrouteNotFoundError = exports.SubrouteRouteMatchError = exports.SubrouteDuplicateError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class SubrouteDuplicateError extends general_exceptions_1.AppError {
    code = 1201;
    constructor(message) {
        super(message);
        this.name = "SubrouteDuplicateError";
    }
}
exports.SubrouteDuplicateError = SubrouteDuplicateError;
class SubrouteRouteMatchError extends general_exceptions_1.AppError {
    code = 1202;
    constructor(message) {
        super(message);
        this.name = "SubrouteRouteMatchError";
    }
}
exports.SubrouteRouteMatchError = SubrouteRouteMatchError;
class SubrouteNotFoundError extends general_exceptions_1.AppError {
    code = 1203;
    constructor(message = "La subruta no existe, intente con un ID valido") {
        super(message);
        this.name = "SubrouteNotFoundError";
    }
}
exports.SubrouteNotFoundError = SubrouteNotFoundError;
class SubrouteAlreadyInactiveError extends general_exceptions_1.AppError {
    code = 1204;
    constructor(message = "La subruta actualmente esta inactiva") {
        super(message);
        this.name = "SubrouteAlreadyInactiveError";
    }
}
exports.SubrouteAlreadyInactiveError = SubrouteAlreadyInactiveError;
class SubrouteAlreadyActiveError extends general_exceptions_1.AppError {
    code = 1205;
    constructor(message = "La subruta actualmente esta activa") {
        super(message);
        this.name = "SubrouteAlreadyActiveError";
    }
}
exports.SubrouteAlreadyActiveError = SubrouteAlreadyActiveError;
class SubrouteNotFoundByPermissionError extends general_exceptions_1.AppError {
    code = 1206;
    constructor(message = "Subruta no encontrada. ID de permiso incorrecto, verifiquelo nuevamente") {
        super(message);
        this.name = "SubrouteNotFoundByPermissionError";
    }
}
exports.SubrouteNotFoundByPermissionError = SubrouteNotFoundByPermissionError;
class FilterSubrouteError extends general_exceptions_1.AppError {
    code = 1207;
    constructor(message = "Error en el filtro, verifique los datos") {
        super(message);
        this.name = "FilterSubrouteError";
    }
}
exports.FilterSubrouteError = FilterSubrouteError;
class SubroutesNotFoundedByMainRouteError extends general_exceptions_1.AppError {
    code = 1208;
    constructor(message = "La ruta principal solicitada no tiene subrutas asociadas") {
        super(message);
        this.name = "SubroutesNotFoundedByMainRouteError";
    }
}
exports.SubroutesNotFoundedByMainRouteError = SubroutesNotFoundedByMainRouteError;
class SubrouteNotFoundByCustomIdError extends general_exceptions_1.AppError {
    code = 1209;
    constructor(message = "Subruta no encontrada, intente de nuevo con un ID valido") {
        super(message);
        this.name = "SubrouteNotFoundByCustomIdError";
    }
}
exports.SubrouteNotFoundByCustomIdError = SubrouteNotFoundByCustomIdError;
class DeleteSubrouteError extends general_exceptions_1.AppError {
    code = 1210;
    constructor(message = "Error al eliminar la subruta, intente nuevamente") {
        super(message);
        this.name = "DeleteSubrouteError";
    }
}
exports.DeleteSubrouteError = DeleteSubrouteError;
//# sourceMappingURL=subroute.exception.js.map