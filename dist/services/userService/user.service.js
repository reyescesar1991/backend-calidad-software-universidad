"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tsyringe_1 = require("tsyringe");
const validators_1 = require("../../core/validators");
const transactionManager_1 = require("../../core/database/transactionManager");
const validations_1 = require("../../validations");
const exceptions_1 = require("../../core/exceptions");
const oauthService_1 = require("../oauthService");
const transaccional_wrapper_1 = require("../../core/utils/transaccional-wrapper");
const Menu_service_1 = require("../menu/Menu.service");
let UserService = class UserService {
    userRepository;
    userPermissionRepository;
    userPermissionSecurityRepository;
    roleConfigRepository;
    twoFactorUserActiveRepository;
    userValidator;
    transactionManager;
    roleRepository;
    departmentValidator;
    twoFactorService;
    menuService;
    constructor(userRepository, userPermissionRepository, userPermissionSecurityRepository, roleConfigRepository, twoFactorUserActiveRepository, userValidator, transactionManager, roleRepository, departmentValidator, twoFactorService, menuService) {
        this.userRepository = userRepository;
        this.userPermissionRepository = userPermissionRepository;
        this.userPermissionSecurityRepository = userPermissionSecurityRepository;
        this.roleConfigRepository = roleConfigRepository;
        this.twoFactorUserActiveRepository = twoFactorUserActiveRepository;
        this.userValidator = userValidator;
        this.transactionManager = transactionManager;
        this.roleRepository = roleRepository;
        this.departmentValidator = departmentValidator;
        this.twoFactorService = twoFactorService;
        this.menuService = menuService;
    }
    async findUserById(idUser) {
        try {
            const user = await this.userRepository.findUserById(idUser);
            validators_1.UserValidator.validateUserExists(user);
            return user;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findUserByCustomId(customIdUser) {
        try {
            console.log("CUSTOM ID EN EL SERVICIO USER: ", customIdUser);
            const user = await this.userRepository.findUserByCustomId(customIdUser);
            console.log("USER: ", user);
            validators_1.UserValidator.validateUserExists(user);
            return user;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async findUserByUsername(username) {
        try {
            const user = await this.userRepository.findUserByUsername(username);
            validators_1.UserValidator.validateUserExistsByUsername(user);
            return user;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async searchUserByFilter(filter) {
        try {
            validators_1.UserValidator.validateFilterRole(filter);
            const users = await this.userRepository.searchUserByFilter(filter);
            validators_1.UserValidator.validateUsersExistsByFilter(users);
            return users;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    //TODO: Metodo para administradores, middleware de autorizacion
    async createUser(dataUser, idConfigRoleParam) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                //1. Validamos que no exista previamente el usuario
                await this.userValidator.validateUniquenessUserData(dataUser.idUser);
                //2. Validamos que no tenga un campo unico repetido a un usuario ya existente
                await this.userValidator.validateUniqueKeysUser({
                    idUser: dataUser.idUser,
                    email: dataUser.email,
                    phoneNumber: dataUser.phoneNumber,
                    username: dataUser.username,
                });
                //3. Validamos que exista el role
                const role = await this.roleConfigRepository.findRoleConfigWithRole(idConfigRoleParam);
                validators_1.RoleValidator.validateRoleExists(role);
                //TODO: CREAR UN MIDDLEWARE PARA VALIDAR QUE SOLO UN USUARIO CON ROL ADMIN PUEDA USAR ESTA FUNCIONALIDAD
                //4. Obtenemos los permisos del rol que se le quiere asignar al usuario
                const rolePermissions = await this.roleRepository.getPermissionsRole(role.idRole);
                //5. Obtenemos los permisos de seguridad del rol que se le quiere asignar al usuario
                const rolePermissionSecurity = await this.roleRepository.getPermissionsSecurityRole(role.idRole);
                //6. Si el usuario tiene permisos de seguridad es que es un admin, se entra en el if y se crea su registro en tabla intermedia
                if (rolePermissionSecurity.length > 0) {
                    const userPermissionsSecurityConfig = rolePermissionSecurity.map((permission) => {
                        return {
                            permissionSecurityId: permission._id,
                            can: true,
                            permissionKey: permission.permission,
                        };
                    });
                    let userDataPermissionSecurity = {
                        idUser: dataUser.idUser,
                        idRol: role.idRole,
                        customPermissionsSecurity: userPermissionsSecurityConfig,
                    };
                    const objectSecurity = await this.userPermissionSecurityRepository.setDataPermissionSecurityUser(userDataPermissionSecurity);
                    console.log(objectSecurity);
                }
                //7. Se crea el objeto de permisos para el usuario y se crea el registro en tabla intermedia
                const userPermissionsConfig = rolePermissions.map((permission) => {
                    return {
                        permissionId: permission._id,
                        can: true,
                        permissionLabel: permission.permission,
                    };
                });
                let userDataPermission = {
                    idUser: dataUser.idUser,
                    roleId: role.idRole,
                    customPermissions: userPermissionsConfig,
                };
                console.log(userDataPermission);
                //8.Pobla la tabla intermedia con la data de los permisos
                await this.userPermissionRepository.setDataPermissionUser(userDataPermission);
                const newUser = await this.userRepository.createUser(dataUser, session);
                //9.Devuelvo el usuario creado
                return newUser;
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    //TODO: Metodo para administradores, middleware de autorizacion
    async updateUser(idUser, idCustomUser, updateDataUser, session) {
        try {
            //1. Validamos que el usuario exista
            await this.userValidator.validateExistsUserDataAsync(idUser);
            //2. Validamos que en la data a actualizar no exista un campo repetido en los campos unicos
            await this.userValidator.validateUniqueKeysUser({
                username: updateDataUser?.username,
                email: updateDataUser?.email,
                phoneNumber: updateDataUser?.phoneNumber,
            });
            //3. Verificamos que si en la data a actualizar esta el departamento, este exista
            if (updateDataUser?.department) {
                await this.departmentValidator.validateExistsDepartment(updateDataUser?.department);
            }
            //4. Verificamos que si en la data a actualizar esta la roleConfig, este exista y obtenemos el rol para poder tener los permisos
            if (updateDataUser?.roleConfig) {
                // console.log("Rol Config : ", updateDataUser?.roleConfig);
                const role = await this.roleConfigRepository.findRoleConfigWithRole(updateDataUser?.roleConfig);
                validators_1.RoleValidator.validateRoleExists(role);
                // console.log("Role obtenido: ", role);
                //5. Si el rol existe y no hay problemas, tendremos que obtener los permisos respectivos a ese nuevo rol
                const rolePermissions = await this.roleRepository.getPermissionsRole(role.idRole);
                const rolePermissionSecurity = await this.roleRepository.getPermissionsSecurityRole(role.idRole);
                console.log("Permisos de accion: ", rolePermissions);
                console.log("Permisos de seguridad: ", rolePermissionSecurity);
                //6. Creamos el objeto array con los permisos de seguridad
                const userPermissionsSecurityConfig = rolePermissionSecurity.map((permission) => {
                    return {
                        permissionSecurityId: permission._id,
                        can: true,
                        permissionKey: permission.permission,
                    };
                });
                //7. Creamos el objeto actualizador
                let userDataPermissionSecurity = {
                    idRol: role.idRole,
                    customPermissionsSecurity: userPermissionsSecurityConfig,
                };
                console.log("Data actualizada de permisos de seguridad: ", userDataPermissionSecurity);
                //8.Verificamos que el usuario ya tenga data de permisos de seguridad previamente registrados
                const validateDataPermissionSecurityUser = await this.userPermissionSecurityRepository.getDataPermissionSecurityUser(idCustomUser);
                //9.Si tiene data lo que hacemos es actualizarla, en caso de no tenerla, creamos la data
                if (validateDataPermissionSecurityUser) {
                    await this.userPermissionSecurityRepository.updateDataPermissionSecurityUser(idCustomUser, userDataPermissionSecurity, session);
                }
                else {
                    let userDataPermissionSecurity = {
                        idUser: idCustomUser,
                        idRol: role.idRole,
                        customPermissionsSecurity: userPermissionsSecurityConfig,
                    };
                    await this.userPermissionSecurityRepository.setDataPermissionSecurityUser(userDataPermissionSecurity);
                }
                //10. Creamos el array de permisos de accion para el objeto actualizador
                const userPermissionsConfig = rolePermissions.map((permission) => {
                    return {
                        permissionId: permission._id,
                        can: true,
                        permissionLabel: permission.permission,
                    };
                });
                //11. Creamos el objeto actualizador
                let userDataPermission = {
                    roleId: role.idRole,
                    customPermissions: userPermissionsConfig,
                };
                //12.Pobla la tabla intermedia con la data de los permisos
                await this.userPermissionRepository.updateDataPermissionUser(idCustomUser, userDataPermission, session);
            }
            //14. Verificar si en data viene la contraseña del usuario para modificarla
            if (updateDataUser.password) {
                const passwordInHistory = await this.isPasswordInHistory(idUser, updateDataUser.password);
                if (!passwordInHistory) {
                    await this.addPasswordToHistory(idUser, updateDataUser.password);
                }
            }
            //13. Actualiza el usuario
            return await this.userRepository.updateUser(idUser, updateDataUser, session);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    //TODO: Metodo para administradores, middleware de autorizacion
    async changeStatusUser(newStatus, idUser, sessionParam) {
        try {
            //1. Validamos que el usuario exista
            await this.userValidator.validateExistsUserDataAsync(idUser);
            //2. Validamos que el estatus nuevo sea distinto al actual
            await this.userValidator.validateStatusUserForChange(idUser, newStatus);
            //3. Cambiamos el estatus
            return await this.userRepository.changeStatusUser(newStatus, idUser, sessionParam);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async addPasswordToHistory(userId, hashedPassword) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                //1. Validamos que exista el usuario
                await this.userValidator.validateExistsUserDataAsync(userId);
                //2. Agregamos la contraseña al array de password historico para almacenarla
                return await this.userRepository.addPasswordToHistory(userId, hashedPassword, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async isPasswordInHistory(userId, hashedPassword) {
        try {
            //1. Validamos que exista el usuario
            await this.userValidator.validateExistsUserDataAsync(userId);
            //2. Verificamos si la contraseña ya esta presente en el array de contraseñas
            const isPasswordInHistory = await this.userRepository.isPasswordInHistory(userId, hashedPassword);
            return isPasswordInHistory;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async deletePasswordInHistory(userId, hashedPassword) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                //1. Validamos que exista el usuario
                await this.userValidator.validateExistsUserDataAsync(userId);
                //2. Verificamos que la contraseña si este presente en el array de contraseñas
                const isPasswordInHistory = await this.userRepository.isPasswordInHistory(userId, hashedPassword);
                //3. Usamos el validador pasandole el valor y que el se encargue de lanzar el error si es necesario
                validators_1.UserValidator.validatePasswordInHistory(isPasswordInHistory);
                //4. Hacemos la operacion y devolvemos el valor
                const passwordDelete = await this.userRepository.deletePasswordInHistory(userId, hashedPassword, session);
                return passwordDelete;
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async enableTwoFactorAuth(userIdParam) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                //1. Validamos que el usuario exista
                const user = await this.userRepository.findUserById(userIdParam);
                validators_1.UserValidator.validateUserExists(user);
                //2. Validamos que el segundo factor ya no este activo
                validators_1.UserValidator.validateTwoFactorUserIsAlreadyActive(user.hasTwoFactor);
                //3. Sin importar el resultado verificamos que si es falso, exista su registro en la tabla intermedia y se cree por defecto
                const dataTwoFactorUser = await this.twoFactorUserActiveRepository.getTwoFactorUser(userIdParam);
                //4. Sino existe el registro lo creamos
                if (!dataTwoFactorUser) {
                    let dataToAddUserFactor = {
                        userId: userIdParam,
                        twoFactorId: validations_1.objectIdSchema.parse("67e9e6c034fe5c9d5ab4acf0"), //Email por defecto
                        isActive: true,
                    };
                    //5. Lo agregamos
                    await this.twoFactorUserActiveRepository.addTwoFactorUser(dataToAddUserFactor, session);
                }
                else {
                    //6. Si existe y esta desactivado, lo activamos en el usuario y en la tabla intermedia
                    await this.twoFactorUserActiveRepository.activateTwoFactorUser(userIdParam, session);
                }
                //7. Actualizo el estatus en el registro de user
                return await this.userRepository.enableTwoFactorAuth(userIdParam, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async disableTwoFactorAuth(userIdParam) {
        return await this.transactionManager.executeTransaction(async (session) => {
            try {
                //1. Validamos que el usuario exista
                const user = await this.userRepository.findUserById(userIdParam);
                validators_1.UserValidator.validateUserExists(user);
                //2. Validamos que el segundo factor ya no este inactivo
                validators_1.UserValidator.validateTwoFactorUserIsAlreadyInactive(user.hasTwoFactor);
                //3. Si existe y esta desactivado, lo desactivamos en el usuario y en la tabla intermedia
                await this.twoFactorUserActiveRepository.inactivateTwoFactorUser(userIdParam, session);
                //7. Actualizo el estatus en el registro de user
                return await this.userRepository.disableTwoFactorAuth(userIdParam, session);
            }
            catch (error) {
                (0, exceptions_1.handleError)(error);
            }
        });
    }
    async addQuantityUsers() {
        try {
            const factorsUsers = await this.twoFactorUserActiveRepository.listTwoFactorUsers();
            if (!factorsUsers || factorsUsers.length === 0) {
                console.log("No hay usuarios con segundo factor activo para procesar.");
                return;
            }
            // Usamos un bucle for...of para procesar secuencialmente
            for (const factorUser of factorsUsers) {
                console.log(`Procesando factorId: ${factorUser.twoFactorId}`);
                // await espera a que esta operación termine antes de pasar a la siguiente
                await this.twoFactorService.addUserQuantity(factorUser.twoFactorId);
            }
            console.log("Se ha actualizado la cantidad para todos los factores correspondientes.");
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async getStatusUser(customIdUser) {
        try {
            const user = await this.userRepository.findUserByCustomId(customIdUser);
            validators_1.UserValidator.validateUserExists(user);
            return await this.userRepository.getStatusUser(customIdUser);
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async getStatusUserActive(customIdUser) {
        try {
            const user = await this.userRepository.findUserByCustomId(customIdUser);
            validators_1.UserValidator.validateUserExists(user);
            const statusUser = await this.userRepository.getStatusUser(customIdUser);
            validators_1.UserValidator.validateStatusUserIsActive(statusUser);
            return statusUser;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async getSecondFactorUserStatus(idUser) {
        try {
            const user = await this.userRepository.findUserById(idUser);
            validators_1.UserValidator.validateUserExists(user);
            const statusSecondFactorUser = await this.twoFactorUserActiveRepository.getTwoFactorUserActive(idUser);
            return statusSecondFactorUser;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async getCustomPermissionsUser(idUser) {
        try {
            const user = await this.userRepository.findUserByCustomId(idUser);
            validators_1.UserValidator.validateUserExists(user);
            const customPermissionsUser = await this.userPermissionRepository.getPermissionsUser(user.idUser);
            return customPermissionsUser;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    async getModulesUser(routesUser) {
        try {
            const modulesUser = routesUser.map((subroute) => subroute.idModule);
            console.log(modulesUser);
            // Usando Set para obtener valores únicos
            const uniqueModulesUser = Array.from(new Set(modulesUser));
            console.log("Array sin duplicados:", uniqueModulesUser);
            const modules = await this.menuService.getModulesByUserModules(uniqueModulesUser);
            return modules;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
        }
    }
    /**
     * Construye la estructura completa del menú (Módulos con Rutas y Subrutas anidadas),
     * basada en los permisos del usuario.
     * @param idUser El ID del usuario.
     * @returns Un array de objetos ModuleWithRoutes, o un array vacío si no hay rutas/permisos.
     */
    async buildUserMenu(idUser) {
        try {
            //0. Seguridad
            //0.1 Validamos al usuario, que exista
            const user = await this.findUserByCustomId(idUser);
            validators_1.UserValidator.validateUserExists(user);
            // 1. Obtener los permisos personalizados del usuario (solo los 'can: true')
            const customPermissions = await this.getCustomPermissionsUser(idUser);
            if (!customPermissions || customPermissions.length === 0) {
                return [];
            }
            // 2. Extraer los permissionLabels únicos de esos permisos
            const permissionsLabels = Array.from(new Set(customPermissions.map(p => p.permissionLabel)));
            // 3. Obtener todas las Subroutes que corresponden a esos permissionLabels
            const allowedSubroutesDocs = await this.menuService.getSubroutesByPermissionKeys(permissionsLabels);
            if (!allowedSubroutesDocs || allowedSubroutesDocs.length === 0) {
                return [];
            }
            // 4. Simplificar las Subroutes para el DTO final
            const simplifiedAllowedSubroutes = allowedSubroutesDocs.map(subroute => ({
                id: subroute.id,
                name: subroute.name,
                path: subroute.path,
                active: subroute.active,
                mainRoute: subroute.mainRoute // Mantener mainRoute para el filtrado posterior
            }));
            // 5. Obtener los `mainRoute`s únicos de las subrutas permitidas
            const uniqueMainRouteIds = Array.from(new Set(allowedSubroutesDocs.map(subroute => subroute.mainRoute)));
            // 6. Obtener los documentos de Route correspondientes (IRoute objetos planos)
            const mainRoutes = await this.menuService.getRoutesByMainRouteIds(uniqueMainRouteIds);
            if (!mainRoutes || mainRoutes.length === 0) {
                return [];
            }
            // 7. Obtener los `idModule`s únicos de las rutas principales
            const uniqueModuleIds = Array.from(new Set(mainRoutes.map(route => route.idModule)));
            // 8. Obtener los documentos de Module correspondientes (IModule objetos planos)
            const modules = await this.menuService.getModulesByUserModules(uniqueModuleIds);
            if (!modules || modules.length === 0) {
                return [];
            }
            // 9. Construir la estructura final anidada (ModuleWithRoutes[])
            const finalMenu = modules.map(module => {
                // Filtrar las rutas principales que pertenecen a este módulo
                const moduleRoutes = mainRoutes
                    .filter(mainRoute => mainRoute.idModule === module.id) // Las rutas que pertenecen a este módulo
                    .map(mainRoute => {
                    // Para cada ruta principal, filtrar sus subrutas permitidas
                    const nestedSubroutes = simplifiedAllowedSubroutes.filter(subroute => subroute.mainRoute === mainRoute.id // <-- Condición de filtro revisada
                    );
                    // Devolver el objeto de la ruta principal con sus subrutas anidadas
                    return {
                        id: mainRoute.id,
                        name: mainRoute.name,
                        path: mainRoute.path,
                        icon: mainRoute.icon,
                        active: mainRoute.active,
                        subroutes: nestedSubroutes
                    };
                });
                // Devolver el objeto del módulo con sus rutas anidadas
                return {
                    id: module.id,
                    title: module.title,
                    routes: moduleRoutes
                };
            });
            // Opcional: Ordenar módulos, rutas y subrutas si es necesario
            // finalMenu.sort((a, b) => a.title.localeCompare(b.title));
            // finalMenu.forEach(module => {
            //     module.routes.sort((a, b) => a.name.localeCompare(b.name));
            //     module.routes.forEach(route => route.subroutes.sort((a, b) => a.name.localeCompare(b.name)));
            // });
            return finalMenu;
        }
        catch (error) {
            (0, exceptions_1.handleError)(error);
            throw error;
        }
    }
};
exports.UserService = UserService;
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "updateUser", null);
__decorate([
    (0, transaccional_wrapper_1.Transactional)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "changeStatusUser", null);
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("IUserRepository")),
    __param(1, (0, tsyringe_1.inject)("IUserPermissionRepository")),
    __param(2, (0, tsyringe_1.inject)("IUserPermissionSecurityRepository")),
    __param(3, (0, tsyringe_1.inject)("IRoleConfigRepository")),
    __param(4, (0, tsyringe_1.inject)("ITwoFactorUserRepository")),
    __param(5, (0, tsyringe_1.inject)("UserValidator")),
    __param(6, (0, tsyringe_1.inject)("TransactionManager")),
    __param(7, (0, tsyringe_1.inject)("IRoleRepository")),
    __param(8, (0, tsyringe_1.inject)("DepartmentValidator")),
    __param(9, (0, tsyringe_1.inject)("TwoFactorService")),
    __param(10, (0, tsyringe_1.inject)("MenuService")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, validators_1.UserValidator,
        transactionManager_1.TransactionManager, Object, validators_1.DepartmentValidator,
        oauthService_1.TwoFactorService,
        Menu_service_1.MenuService])
], UserService);
//# sourceMappingURL=user.service.js.map