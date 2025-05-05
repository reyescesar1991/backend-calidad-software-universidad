export {PermissionNotFoundError} from './permissions/permission.exceptions';
export {PermissionAlreadyInactiveError} from './permissions/permission.exceptions';
export {PermissionUpdateError} from './permissions/permission.exceptions';
export {LabelInvalidError} from './permissions/permission.exceptions';
export {LabelDuplicateError} from './permissions/permission.exceptions';
export {PermissionDuplicateError} from './permissions/permission.exceptions';
export {PermissionInUseError} from './permissions/permission.exceptions';


//permission security

export {PermissionSecurityDuplicateError} from './permissions/permissionSecurity.exception';
export {PermissionSecurityNotFoundError} from './permissions/permissionSecurity.exception';
export {PermissionSecurityUpdateError} from './permissions/permissionSecurity.exception';
export {PermissionSecurityAlreadyInactiveError} from './permissions/permissionSecurity.exception';
export {LabelDuplicatePermissionSecurityError} from './permissions/permissionSecurity.exception';
export {LabelSecurityPermissionInvalidError} from './permissions/permissionSecurity.exception';
export {PermissionSecurityInUseError} from './permissions/permissionSecurity.exception';
export {PermissionSecurityIdDuplicateError} from './permissions/permissionSecurity.exception';

//subroutes

export {SubrouteDuplicateError} from './subroutes/subroute.exception';
export {SubrouteRouteMatchError} from './subroutes/subroute.exception';
export {SubrouteNotFoundError} from './subroutes/subroute.exception';
export {SubrouteAlreadyInactiveError} from './subroutes/subroute.exception';
export {SubrouteAlreadyActiveError} from './subroutes/subroute.exception';
export {SubrouteNotFoundByPermissionError} from './subroutes/subroute.exception';
export {FilterSubrouteError} from './subroutes/subroute.exception';
export {SubroutesNotFoundedByMainRouteError} from './subroutes/subroute.exception';
export {SubrouteNotFoundByCustomIdError} from './subroutes/subroute.exception';
export {DeleteSubrouteError} from './subroutes/subroute.exception';

//routes

export {RouteAlreadyExistsError} from './routes/route.exception';
export {RouteNotExistsError} from './routes/route.exception';
export {ActiveRouteInconsistencyError} from './routes/route.exception';
export {RouteNameAlreadyExistsError} from './routes/route.exception';
export {RouteAlreadyInactiveError} from './routes/route.exception';
export {RouteAlreadyActiveError} from './routes/route.exception';
export {FilterOptionsRouteNotValid} from './routes/route.exception';
export {NotExistsRoutesDatabaseError} from './routes/route.exception';


//module

export {ModuleNotFoundError} from './modules/module.exception';
export {FilterModuleError} from './modules/module.exception';
export {ModulesNotFoundByFilterError} from './modules/module.exception';
export {ModuleAlreadyExistsError} from './modules/module.exception';
export {ModuleAlreadyActiveError} from './modules/module.exception';
export {ModuleAlreadyInactiveError} from './modules/module.exception';

//generales

export {AppError} from './generals/general.exceptions';
export {InvalidParamError} from './generals/general.exceptions';
export {BadFormatMongoIDError} from './generals/general.exceptions';
export {DatabaseConnectionError} from './generals/general.exceptions';
export {UnexpectedError} from './generals/general.exceptions';

//function handle error

export {handleError} from './handleErrors/handleErrors';