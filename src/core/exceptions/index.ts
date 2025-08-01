

export {PermissionNotFoundError} from './permissions/permission.exceptions';
export {PermissionAlreadyInactiveError} from './permissions/permission.exceptions';
export {PermissionUpdateError} from './permissions/permission.exceptions';
export {LabelInvalidError} from './permissions/permission.exceptions';
export {LabelDuplicateError} from './permissions/permission.exceptions';
export {PermissionDuplicateError} from './permissions/permission.exceptions';
export {PermissionInUseError} from './permissions/permission.exceptions';
export {UnauthorizedError} from './permissions/permission.exceptions';
export {ForbiddenError} from './permissions/permission.exceptions';


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

//roles

export {RoleNotFoundError} from './roles/roles.exception';
export {FilterRoleError} from './roles/roles.exception';
export {RolesNotFoundByFilterError} from './roles/roles.exception';
export {RolesNotFoundDatabaseError} from './roles/roles.exception';
export {RoleAlreadyExistsError} from './roles/roles.exception';
export {RoleNotValidDefaultSystemError} from './roles/roles.exception';
export {RoleNotAdminManagePermissionError} from './roles/roles.exception';
export {IdRoleAlreadyExistsError} from './roles/roles.exception';
export {RoleAlreadyInactiveError} from './roles/roles.exception';
export {RoleAlreadyActiveError} from './roles/roles.exception';
export {RoleIdLockError} from './roles/roles.exception';
export {RolNotHavePermissionsError} from './roles/roles.exception';
export {RolPermissionNotAvailableError} from './roles/roles.exception';
export {RolPermissionAlreadyAvailableError} from './roles/roles.exception';
export {RoleIsNotActiveError} from './roles/roles.exception';
export {RolPermissionSecurityAlreadyAvailableError} from './roles/roles.exception';
export {RolNotHavePermissionsSecurityError} from './roles/roles.exception';
export {RolPermissionSecurityNotAvailableError} from './roles/roles.exception';
export {RolNotHavePermissionSecurityError} from './roles/roles.exception';

//RoleConfig

export {RoleConfigNotFoundError} from './roles/roleConfig.exception';
export {RoleConfigNotFoundByNameError} from './roles/roleConfig.exception';
export {FilterRoleConfigError} from './roles/roleConfig.exception';
export {RoleConfigsNotFoundByFilterError} from './roles/roleConfig.exception';
export {RoleConfigAlreadyActiveError} from './roles/roleConfig.exception';
export {RoleConfigAlreadyInactiveError} from './roles/roleConfig.exception';
export {RoleConfigAlreadyExistsError} from './roles/roleConfig.exception';
export {RoleConfigRoleNotExistsError} from './roles/roleConfig.exception';
export {RolConfigMaxLoginAttemptsNotValidError} from './roles/roleConfig.exception';


//headquarter

export {LocationHeadquarterInvalidError} from './headquarter/headquarter.exception';
export {HeadquarterNotExistsError} from './headquarter/headquarter.exception';
export {HeadquarterIsAlreadyActiveError} from './headquarter/headquarter.exception';
export {HeadquarterIsAlreadyDesactiveError} from './headquarter/headquarter.exception';
export {HeadquarterAlreadyExistsError} from './headquarter/headquarter.exception';
export {FilterHeadquarterError} from './headquarter/headquarter.exception';
export {HeadquartersByFilterNotFoudError} from './headquarter/headquarter.exception';
export {HeadquarterKeysAlreadyExistError} from './headquarter/headquarter.exception';
export {HeadquartersListNotFoudError} from './headquarter/headquarter.exception';

//department

export {DepartmentNotFoundError} from './department/department.exception';
export {DepartmentsNotFoundByHeadquarterError} from './department/department.exception';
export {FilterDepartmentError} from './department/department.exception';
export {DepartmentsNotFoundByFilterError} from './department/department.exception';
export {DepartmentsNotFoundByDataBaseError} from './department/department.exception';
export {DepartmentIsAlreadyActiveError} from './department/department.exception';
export {DepartmentIsAlreadyInactiveError} from './department/department.exception';
export {DepartmentAlreadyExistsError} from './department/department.exception';
export {DepartmentUniqueKeysError} from './department/department.exception';

//users
export {UserNotFoundByIdError} from './user/user.exception';
export {UserNotFoundByUsernameError} from './user/user.exception';
export {FilterUserConfigError} from './user/user.exception';
export {UserNotFoundByFilterError} from './user/user.exception';
export {UserAlreadyExistsError} from './user/user.exception';
export {UserUniqueKeysError} from './user/user.exception';
export {UserStatusAlreadyItsSameError} from './user/user.exception';
export {UserNotActiveError} from './user/user.exception';
export {PasswordIsNotInTheHistoryUserError} from './user/user.exception';
export {TwoFactorUserIsAlreadyActive} from './user/user.exception';
export {TwoFactorUserIsAlreadyInactive} from './user/user.exception';
export {UserStatusIsAlreadyNotActiveError} from './user/user.exception';
export {UserEmailNotMatchError} from './user/user.exception';

//two factor data

export {TwoFactorDataNotFoundInDatabaseError} from './twoFactorData/twoFactorData.exception';
export {TwoFactorDataNotExistsError} from './twoFactorData/twoFactorData.exception';
export {TwoFactorDataAlreadyExistsByMethodError} from './twoFactorData/twoFactorData.exception';
export {TwoFactorDataQuantityNewFactorError} from './twoFactorData/twoFactorData.exception';
export {TwoFactorDataNotFoundByMethodError} from './twoFactorData/twoFactorData.exception';
export {TwoFactorDataAlreadyEnableError} from './twoFactorData/twoFactorData.exception';
export {TwoFactorDataAlreadyDisableError} from './twoFactorData/twoFactorData.exception';

//generales

export {AppError} from './generals/general.exceptions';
export {InvalidParamError} from './generals/general.exceptions';
export {BadFormatMongoIDError} from './generals/general.exceptions';
export {DatabaseConnectionError} from './generals/general.exceptions';
export {UnexpectedError} from './generals/general.exceptions';

//session management

export {UserAlreadyHaveASessionError} from './sessionManagement/sessionManagament.exception';
export {UserIsNotLoggedError} from './sessionManagement/sessionManagament.exception';
export {UserSessionTokenIsNotValid} from './sessionManagement/sessionManagament.exception';
export {UserAlreadyNotHaveASessionError} from './sessionManagement/sessionManagament.exception';

//Two Factor value

export {UserTwoFactorValueNotFoundError} from './twoFactorValue/twoFactorValue.exception';
export {UserCodeNotMatchError} from './twoFactorValue/twoFactorValue.exception';
export {UserTwoFactorValueFoundError} from './twoFactorValue/twoFactorValue.exception';

//Security Audit

export {RegistryAuditNotFoundError} from './securityAudit/securityAudit.exception';
export {RegistryAuditSecondFactorAttempsIsAlreadyMaxError} from './securityAudit/securityAudit.exception';

//OAuth

export {UnauthorizedException2FAError} from './oauth/oauth.exception';
export {AuthPasswordMismatchUsernameError} from './oauth/oauth.exception';

//Warehouse

export {WarehouseNotFoundError} from './warehouse/warehouse.exception';
export {WarehouseCustomIdAlreadyExistsError} from './warehouse/warehouse.exception';
export {CurrentCapacityExceedsCapacityWarehouseError} from './warehouse/warehouse.exception';
export {WarehouseIsAlreadyInactiveError} from './warehouse/warehouse.exception';
export {WarehouseIsAlreadyActiveError} from './warehouse/warehouse.exception';
export {AddBoxesFormatError} from './warehouse/warehouse.exception';
export {DecreaseBoxesFormatError} from './warehouse/warehouse.exception';
export {CurrentCapacityDecreaseLessZeroCapacityWarehouseError} from './warehouse/warehouse.exception';
export {WarehouseCustomIdNotMatchError} from './warehouse/warehouse.exception';

//payment term

export {PaymentTermNotFoudError} from './paymentTerm/paymentTerm.exception';
export {PaymentTermsIDAlreadyExistsError} from './paymentTerm/paymentTerm.exception';
export {DaysToPayCannotBeLessThanOneError} from './paymentTerm/paymentTerm.exception';
export {DiscountCannotBeLessThanZeroError} from './paymentTerm/paymentTerm.exception';
export {PaymentTermIsAlreadyActiveError} from './paymentTerm/paymentTerm.exception';
export {PaymentTermIsAlreadyInactiveError} from './paymentTerm/paymentTerm.exception';

// supplier

export {SupplierNotExistsError} from './supplier/supplier.exception';
export {SupplierAlreadyExistsError} from './supplier/supplier.exception';
export {ItHasUniqueDataAndRegisteredError} from './supplier/supplier.exception';
export {SupplierIsAlreadyInactiveError} from './supplier/supplier.exception';
export {SupplierIsAlreadyActiveError} from './supplier/supplier.exception';
export {SuppliersNotExistsError} from './supplier/supplier.exception';

//category product

export {CategoryProductNotFoundError} from './categoryProduct/categoryProduct.exception';
export {CategoriesProductNotFoundError} from './categoryProduct/categoryProduct.exception';
export {CategoriesProductByLabelNotFoundError} from './categoryProduct/categoryProduct.exception';
export {CategoryAlreadyExistsError} from './categoryProduct/categoryProduct.exception';
export {CategoryProductIsAlreadyActiveError} from './categoryProduct/categoryProduct.exception';
export {CategoryProductIsAlreadyInactiveError} from './categoryProduct/categoryProduct.exception';
export {CategoryProductIsAlreadyViewableError} from './categoryProduct/categoryProduct.exception';
export {CategoryProductIsAlreadyNotViewableError} from './categoryProduct/categoryProduct.exception';

//product

export {ProductNotFoundError} from './products/products.exception';
export {ProductsNotFoundInDatabaseError} from './products/products.exception';
export {ProductAlreadyExistsError} from './products/products.exception';
export {ProductDataHasUniqueFieldsAlreadyRegisteredError} from './products/products.exception';
export {ProductQuantitiesValueError} from './products/products.exception';
export {ProductQuantityWarehouseFormatError} from './products/products.exception';
export {ProductCustomIdNotMatchError} from './products/products.exception';
export {ProductIsAlreadyActiveError} from './products/products.exception';
export {ProductIsAlreadyInactiveError} from './products/products.exception';
export {ProductCriteriaPaginationPageError} from './products/products.exception';


//product stock

export {ProductStockNotFoundError} from './products/productsStock.exception';
export {ProductStockAlreadyExistsError} from './products/productsStock.exception';
export {ProductStockQuantityError} from './products/productsStock.exception';
export {ProductsInStockNotFoundError} from './products/productsStock.exception';
export {ProductStockNotExistsError} from './products/productsStock.exception';

//location user

export {LocationDataUserNotExistsError} from './locationUserData/locationUserData.exception';

//function handle error

export {handleError} from './handleErrors/handleErrors';
