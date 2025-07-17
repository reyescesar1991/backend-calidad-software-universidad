"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotExistsRoutesDatabaseError = exports.FilterOptionsRouteNotValid = exports.RouteAlreadyActiveError = exports.RouteAlreadyInactiveError = exports.RouteNameAlreadyExistsError = exports.ActiveRouteInconsistencyError = exports.RouteNotExistsError = exports.RouteAlreadyExistsError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class RouteAlreadyExistsError extends general_exceptions_1.AppError {
    code = 1301;
    constructor(message = "La ruta ya existe, intente nuevamente con un ID valido") {
        super(message);
        this.name = "RouteAlreadyExistsError";
    }
}
exports.RouteAlreadyExistsError = RouteAlreadyExistsError;
class RouteNotExistsError extends general_exceptions_1.AppError {
    code = 1302;
    constructor(message = "La ruta no existe, intente nuevamente con un ID valido") {
        super(message);
        this.name = "RouteNotExistsError";
    }
}
exports.RouteNotExistsError = RouteNotExistsError;
class ActiveRouteInconsistencyError extends general_exceptions_1.AppError {
    code = 1303;
    constructor(message = "La ruta ya posee un estatus de disponibilidad igual a la data enviada, compruebe la data o elimine esa propiedad") {
        super(message);
        this.name = "ActiveRouteInconsistencyError";
    }
}
exports.ActiveRouteInconsistencyError = ActiveRouteInconsistencyError;
class RouteNameAlreadyExistsError extends general_exceptions_1.AppError {
    code = 1304;
    constructor(message = "El nombre de ruta ya esta registrado, ingrese otro nombre") {
        super(message);
        this.name = "RouteNameAlreadyExistsError";
    }
}
exports.RouteNameAlreadyExistsError = RouteNameAlreadyExistsError;
class RouteAlreadyInactiveError extends general_exceptions_1.AppError {
    code = 1305;
    constructor(message = "La ruta actualmente se encuentra inactiva") {
        super(message);
        this.name = "RouteAlreadyInactiveError";
    }
}
exports.RouteAlreadyInactiveError = RouteAlreadyInactiveError;
class RouteAlreadyActiveError extends general_exceptions_1.AppError {
    code = 1306;
    constructor(message = "La ruta ya se encuentra activa, intente con un ID de una ruta inactiva") {
        super(message);
        this.name = "RouteAlreadyActiveError";
    }
}
exports.RouteAlreadyActiveError = RouteAlreadyActiveError;
class FilterOptionsRouteNotValid extends general_exceptions_1.AppError {
    code = 1307;
    constructor(message = "El filtro no cumple los parametros de busqueda, verifique el filtro") {
        super(message);
        this.name = "FilterOptionsRouteNotValid";
    }
}
exports.FilterOptionsRouteNotValid = FilterOptionsRouteNotValid;
class NotExistsRoutesDatabaseError extends general_exceptions_1.AppError {
    code = 1308;
    constructor(message = "No existen rutas registradas en la base de datos") {
        super(message);
        this.name = "NotExistsRoutesDatabaseError";
    }
}
exports.NotExistsRoutesDatabaseError = NotExistsRoutesDatabaseError;
//# sourceMappingURL=route.exception.js.map