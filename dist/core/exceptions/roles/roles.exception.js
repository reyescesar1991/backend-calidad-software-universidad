"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolNotHavePermissionSecurityError = exports.RolPermissionSecurityNotAvailableError = exports.RolNotHavePermissionsSecurityError = exports.RolPermissionSecurityAlreadyAvailableError = exports.RoleIsNotActiveError = exports.RolPermissionAlreadyAvailableError = exports.RolPermissionNotAvailableError = exports.RolNotHavePermissionsError = exports.RoleIdLockError = exports.RoleAlreadyActiveError = exports.RoleAlreadyInactiveError = exports.IdRoleAlreadyExistsError = exports.RoleNotAdminManagePermissionError = exports.RoleNotValidDefaultSystemError = exports.RoleAlreadyExistsError = exports.RolesNotFoundDatabaseError = exports.RolesNotFoundByFilterError = exports.FilterRoleError = exports.RoleNotFoundError = void 0;
const general_exceptions_1 = require("../generals/general.exceptions");
class RoleNotFoundError extends general_exceptions_1.AppError {
    code = 1501;
    constructor(message = "El rol no existe, intente nuevamente con un ID valido") {
        super(message);
        this.name = "RoleNotFoundError";
    }
}
exports.RoleNotFoundError = RoleNotFoundError;
class FilterRoleError extends general_exceptions_1.AppError {
    code = 1502;
    constructor(message = 'Filtros para encontrar roles no son validos') {
        super(message);
        this.name = "FilterRoleError";
    }
}
exports.FilterRoleError = FilterRoleError;
class RolesNotFoundByFilterError extends general_exceptions_1.AppError {
    code = 1503;
    constructor(message = 'No se ha encontrado roles que coincidan con los parametros del filtro') {
        super(message);
        this.name = "RolesNotFoundByFilterError";
    }
}
exports.RolesNotFoundByFilterError = RolesNotFoundByFilterError;
class RolesNotFoundDatabaseError extends general_exceptions_1.AppError {
    code = 1504;
    constructor(message = 'No se ha encontrado roles en la base de datos') {
        super(message);
        this.name = "RolesNotFoundDatabaseError";
    }
}
exports.RolesNotFoundDatabaseError = RolesNotFoundDatabaseError;
class RoleAlreadyExistsError extends general_exceptions_1.AppError {
    code = 1505;
    constructor(message = 'El Role que intenta crear ya se encuentra registrado, intente con un ID diferente') {
        super(message);
        this.name = "RoleAlreadyExistsError";
    }
}
exports.RoleAlreadyExistsError = RoleAlreadyExistsError;
class RoleNotValidDefaultSystemError extends general_exceptions_1.AppError {
    code = 1506;
    constructor(message = 'El Role que intenta crear no puede ser el rol por defecto del sistema, el rol por defecto ya esta definido') {
        super(message);
        this.name = "RoleNotValidDefaultSystemError";
    }
}
exports.RoleNotValidDefaultSystemError = RoleNotValidDefaultSystemError;
class RoleNotAdminManagePermissionError extends general_exceptions_1.AppError {
    code = 1507;
    constructor(message = 'El Role que intenta crear no puede manejar permisos para otros roles') {
        super(message);
        this.name = "RoleNotAdminManagePermissionError";
    }
}
exports.RoleNotAdminManagePermissionError = RoleNotAdminManagePermissionError;
class IdRoleAlreadyExistsError extends general_exceptions_1.AppError {
    code = 1508;
    constructor(message = 'El id role que esta proporcionando ya esta registrado, intente con otro nuevamente') {
        super(message);
        this.name = "IdRoleAlreadyExistsError";
    }
}
exports.IdRoleAlreadyExistsError = IdRoleAlreadyExistsError;
class RoleAlreadyInactiveError extends general_exceptions_1.AppError {
    code = 1509;
    constructor(message = 'El role ya se encuentra desactivado, intente con un rol activo') {
        super(message);
        this.name = "RoleAlreadyInactiveError";
    }
}
exports.RoleAlreadyInactiveError = RoleAlreadyInactiveError;
class RoleAlreadyActiveError extends general_exceptions_1.AppError {
    code = 1510;
    constructor(message = 'El role ya se encuentra activo, intente con un rol inactivo') {
        super(message);
        this.name = "RoleAlreadyActiveError";
    }
}
exports.RoleAlreadyActiveError = RoleAlreadyActiveError;
class RoleIdLockError extends general_exceptions_1.AppError {
    code = 1511;
    constructor(message = 'El ID de rol de los roles primarios del sistema no puede ser cambiado, intente con un rol no nativo') {
        super(message);
        this.name = "RoleIdLockError";
    }
}
exports.RoleIdLockError = RoleIdLockError;
class RolNotHavePermissionsError extends general_exceptions_1.AppError {
    code = 1512;
    constructor(message = 'El rol no tiene permisos disponibles, configure previamente la data') {
        super(message);
        this.name = "RolNotHavePermissionsError";
    }
}
exports.RolNotHavePermissionsError = RolNotHavePermissionsError;
class RolPermissionNotAvailableError extends general_exceptions_1.AppError {
    code = 1513;
    constructor(message = 'El rol no tiene permisos suficientes para habilitar esa funcionalidad') {
        super(message);
        this.name = "RolPermissionNotAvailable";
    }
}
exports.RolPermissionNotAvailableError = RolPermissionNotAvailableError;
class RolPermissionAlreadyAvailableError extends general_exceptions_1.AppError {
    code = 1514;
    constructor(message = 'El rol ya tiene este permiso habilitado') {
        super(message);
        this.name = "RolPermissionAlreadyAvailable";
    }
}
exports.RolPermissionAlreadyAvailableError = RolPermissionAlreadyAvailableError;
class RoleIsNotActiveError extends general_exceptions_1.AppError {
    code = 1515;
    constructor(message = 'El rol esta inactivo') {
        super(message);
        this.name = "RoleIsNotActiveError";
    }
}
exports.RoleIsNotActiveError = RoleIsNotActiveError;
class RolPermissionSecurityAlreadyAvailableError extends general_exceptions_1.AppError {
    code = 1516;
    constructor(message = 'El rol ya tiene este permiso de seguridad habilitado') {
        super(message);
        this.name = "RolPermissionSecurityAlreadyAvailableError";
    }
}
exports.RolPermissionSecurityAlreadyAvailableError = RolPermissionSecurityAlreadyAvailableError;
class RolNotHavePermissionsSecurityError extends general_exceptions_1.AppError {
    code = 1517;
    constructor(message = 'El rol no tiene permisos de seguridad disponibles, configure previamente la data') {
        super(message);
        this.name = "RolNotHavePermissionsSecurityError";
    }
}
exports.RolNotHavePermissionsSecurityError = RolNotHavePermissionsSecurityError;
class RolPermissionSecurityNotAvailableError extends general_exceptions_1.AppError {
    code = 1518;
    constructor(message = 'El permiso de seguridad no puede ser agregado a este rol, intente con un rol administrador') {
        super(message);
        this.name = "RolPermissionSecurityNotAvailableError";
    }
}
exports.RolPermissionSecurityNotAvailableError = RolPermissionSecurityNotAvailableError;
class RolNotHavePermissionSecurityError extends general_exceptions_1.AppError {
    code = 1519;
    constructor(message = 'Este rol no tiene ningun permiso de seguridad, verifica el ID') {
        super(message);
        this.name = "RolNotHavePermissionSecurityError";
    }
}
exports.RolNotHavePermissionSecurityError = RolNotHavePermissionSecurityError;
//# sourceMappingURL=roles.exception.js.map