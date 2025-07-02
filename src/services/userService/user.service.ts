import { inject, injectable } from "tsyringe";
import { IUserRepository } from "./interfaces/IUserRepository";
import {
  DepartmentValidator,
  RoleValidator,
  UserValidator,
} from "../../core/validators";
import { TransactionManager } from "../../core/database/transactionManager";
import {
  ObjectIdParam,
  objectIdSchema,
  UpdateUserDto,
  UpdateUserPermissionDto,
  UpdateUserPermissionSecurityDto,
  UserDto,
  UserPermissionDto,
  UserPermissionSecurityDto,
  UserTwoFactorActiveDto,
} from "../../validations";
import { ModuleDocument, RouteDocument, SubrouteDocument, UserDocument } from "../../db/models";
import { handleError } from "../../core/exceptions";
import { FilterOptions, ICustomPermission, ModuleWithRoutes, RouteWithSubroutes, SimplifiedSubroute, UserConfigFilterKeys } from "../../core/types";
import { IUserPermissionRepository } from "./interfaces/IUserPermissionRepository";
import { IRoleRepository } from "../role/interfaces/IRoleRepository";
import { IUserPermissionSecurityRepository } from "./interfaces/IUserPermissionSecurityRepository";
import { IRoleConfigRepository } from "../roleConfig";
import { ITwoFactorUserRepository } from "./interfaces/ITwoFactorActiveUser";
import { TwoFactorService } from "../oauthService";
import { Transactional } from "../../core/utils/transaccional-wrapper";
import { ClientSession } from "mongoose";
import { MenuService } from "../menu/Menu.service";
import { permission } from "process";


@injectable()
export class UserService {
  constructor(
    @inject("IUserRepository") private readonly userRepository: IUserRepository,
    @inject("IUserPermissionRepository")
    private readonly userPermissionRepository: IUserPermissionRepository,
    @inject("IUserPermissionSecurityRepository")
    private readonly userPermissionSecurityRepository: IUserPermissionSecurityRepository,
    @inject("IRoleConfigRepository")
    private readonly roleConfigRepository: IRoleConfigRepository,
    @inject("ITwoFactorUserRepository")
    private readonly twoFactorUserActiveRepository: ITwoFactorUserRepository,

    @inject("UserValidator") private readonly userValidator: UserValidator,
    @inject("TransactionManager")
    private readonly transactionManager: TransactionManager,
    @inject("IRoleRepository") private readonly roleRepository: IRoleRepository,

    @inject("DepartmentValidator")
    private readonly departmentValidator: DepartmentValidator,

    @inject("TwoFactorService")
    private readonly twoFactorService: TwoFactorService,

    @inject("MenuService") private readonly menuService: MenuService
  ) { }

  async findUserById(idUser: ObjectIdParam): Promise<UserDocument | null> {
    try {
      const user = await this.userRepository.findUserById(idUser);

      UserValidator.validateUserExists(user);

      return user;
    } catch (error) {
      handleError(error);
    }
  }

  async findUserByCustomId(customIdUser: string): Promise<UserDocument | null> {
    try {

      console.log("CUSTOM ID EN EL SERVICIO USER: ", customIdUser);


      const user = await this.userRepository.findUserByCustomId(customIdUser);

      console.log("USER: ", user);

      UserValidator.validateUserExists(user);

      return user;
    } catch (error) {
      handleError(error);
    }
  }

  async findUserByUsername(username: string): Promise<UserDocument | null> {
    try {
      const user = await this.userRepository.findUserByUsername(username);

      UserValidator.validateUserExistsByUsername(user);

      return user;
    } catch (error) {
      handleError(error);
    }
  }

  async searchUserByFilter(
    filter: FilterOptions<UserConfigFilterKeys>
  ): Promise<UserDocument[] | null> {
    try {
      UserValidator.validateFilterRole(filter);

      const users = await this.userRepository.searchUserByFilter(filter);

      UserValidator.validateUsersExistsByFilter(users);

      return users;
    } catch (error) {
      handleError(error);
    }
  }

  //TODO: Metodo para administradores, middleware de autorizacion
  async createUser(
    dataUser: UserDto,
    idConfigRoleParam: ObjectIdParam
  ): Promise<UserDocument | null> {
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
        const role = await this.roleConfigRepository.findRoleConfigWithRole(
          idConfigRoleParam
        );
        RoleValidator.validateRoleExists(role);

        //TODO: CREAR UN MIDDLEWARE PARA VALIDAR QUE SOLO UN USUARIO CON ROL ADMIN PUEDA USAR ESTA FUNCIONALIDAD

        //4. Obtenemos los permisos del rol que se le quiere asignar al usuario
        const rolePermissions = await this.roleRepository.getPermissionsRole(
          role.idRole
        );
        //5. Obtenemos los permisos de seguridad del rol que se le quiere asignar al usuario
        const rolePermissionSecurity =
          await this.roleRepository.getPermissionsSecurityRole(role.idRole);

        //6. Si el usuario tiene permisos de seguridad es que es un admin, se entra en el if y se crea su registro en tabla intermedia
        if (rolePermissionSecurity.length > 0) {
          const userPermissionsSecurityConfig = rolePermissionSecurity.map(
            (permission) => {
              return {
                permissionSecurityId: permission._id,
                can: true,
                permissionKey: permission.permission,
              };
            }
          );

          let userDataPermissionSecurity: UserPermissionSecurityDto = {
            idUser: dataUser.idUser,
            idRol: role.idRole,
            customPermissionsSecurity: userPermissionsSecurityConfig,
          };
          const objectSecurity =
            await this.userPermissionSecurityRepository.setDataPermissionSecurityUser(
              userDataPermissionSecurity
            );
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

        let userDataPermission: UserPermissionDto = {
          idUser: dataUser.idUser,
          roleId: role.idRole,
          customPermissions: userPermissionsConfig,
        };

        console.log(userDataPermission);

        //8.Pobla la tabla intermedia con la data de los permisos
        await this.userPermissionRepository.setDataPermissionUser(
          userDataPermission
        );

        const newUser = await this.userRepository.createUser(dataUser, session);

        //9.Devuelvo el usuario creado
        return newUser;
      } catch (error) {
        handleError(error);
      }
    });
  }

  //TODO: Metodo para administradores, middleware de autorizacion

  @Transactional()
  async updateUser(
    idUser: ObjectIdParam,
    idCustomUser: string,
    updateDataUser: UpdateUserDto,
    session?: ClientSession
  ): Promise<UserDocument | null> {
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
        await this.departmentValidator.validateExistsDepartment(
          updateDataUser?.department
        );
      }

      //4. Verificamos que si en la data a actualizar esta la roleConfig, este exista y obtenemos el rol para poder tener los permisos
      if (updateDataUser?.roleConfig) {
        // console.log("Rol Config : ", updateDataUser?.roleConfig);

        const role = await this.roleConfigRepository.findRoleConfigWithRole(
          updateDataUser?.roleConfig
        );
        RoleValidator.validateRoleExists(role);

        // console.log("Role obtenido: ", role);

        //5. Si el rol existe y no hay problemas, tendremos que obtener los permisos respectivos a ese nuevo rol
        const rolePermissions = await this.roleRepository.getPermissionsRole(
          role.idRole
        );
        const rolePermissionSecurity =
          await this.roleRepository.getPermissionsSecurityRole(role.idRole);

        console.log("Permisos de accion: ", rolePermissions);
        console.log("Permisos de seguridad: ", rolePermissionSecurity);

        //6. Creamos el objeto array con los permisos de seguridad
        const userPermissionsSecurityConfig = rolePermissionSecurity.map(
          (permission) => {
            return {
              permissionSecurityId: permission._id,
              can: true,
              permissionKey: permission.permission,
            };
          }
        );

        //7. Creamos el objeto actualizador
        let userDataPermissionSecurity: UpdateUserPermissionSecurityDto = {
          idRol: role.idRole,
          customPermissionsSecurity: userPermissionsSecurityConfig,
        };

        console.log(
          "Data actualizada de permisos de seguridad: ",
          userDataPermissionSecurity
        );

        //8.Verificamos que el usuario ya tenga data de permisos de seguridad previamente registrados
        const validateDataPermissionSecurityUser =
          await this.userPermissionSecurityRepository.getDataPermissionSecurityUser(
            idCustomUser
          );

        //9.Si tiene data lo que hacemos es actualizarla, en caso de no tenerla, creamos la data
        if (validateDataPermissionSecurityUser) {
          await this.userPermissionSecurityRepository.updateDataPermissionSecurityUser(
            idCustomUser,
            userDataPermissionSecurity,
            session
          );
        } else {
          let userDataPermissionSecurity: UserPermissionSecurityDto = {
            idUser: idCustomUser,
            idRol: role.idRole,
            customPermissionsSecurity: userPermissionsSecurityConfig,
          };

          await this.userPermissionSecurityRepository.setDataPermissionSecurityUser(
            userDataPermissionSecurity
          );
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
        let userDataPermission: UpdateUserPermissionDto = {
          roleId: role.idRole,
          customPermissions: userPermissionsConfig,
        };

        //12.Pobla la tabla intermedia con la data de los permisos
        await this.userPermissionRepository.updateDataPermissionUser(
          idCustomUser,
          userDataPermission,
          session
        );
      }

      //14. Verificar si en data viene la contraseña del usuario para modificarla

      if (updateDataUser.password) {

        const passwordInHistory = await this.isPasswordInHistory(idUser, updateDataUser.password);

        if (!passwordInHistory) {

          await this.addPasswordToHistory(idUser, updateDataUser.password);
        }
      }

      //13. Actualiza el usuario
      return await this.userRepository.updateUser(
        idUser,
        updateDataUser,
        session
      );
    } catch (error) {
      handleError(error);
    }
  }

  //TODO: Metodo para administradores, middleware de autorizacion

  @Transactional()
  async changeStatusUser(
    newStatus: string,
    idUser: ObjectIdParam,
    sessionParam?: ClientSession
  ): Promise<UserDocument | null> {

    try {
      //1. Validamos que el usuario exista
      await this.userValidator.validateExistsUserDataAsync(idUser);

      //2. Validamos que el estatus nuevo sea distinto al actual
      await this.userValidator.validateStatusUserForChange(idUser, newStatus);

      //3. Cambiamos el estatus
      return await this.userRepository.changeStatusUser(
        newStatus,
        idUser,
        sessionParam
      );
    } catch (error) {
      handleError(error);
    }
  }



  async addPasswordToHistory(
    userId: ObjectIdParam,
    hashedPassword: string
  ): Promise<void> {
    return await this.transactionManager.executeTransaction(async (session) => {
      try {
        //1. Validamos que exista el usuario
        await this.userValidator.validateExistsUserDataAsync(userId);

        //2. Agregamos la contraseña al array de password historico para almacenarla
        return await this.userRepository.addPasswordToHistory(
          userId,
          hashedPassword,
          session
        );
      } catch (error) {
        handleError(error);
      }
    });
  }

  async isPasswordInHistory(
    userId: ObjectIdParam,
    hashedPassword: string
  ): Promise<boolean> {
    try {
      //1. Validamos que exista el usuario
      await this.userValidator.validateExistsUserDataAsync(userId);

      //2. Verificamos si la contraseña ya esta presente en el array de contraseñas
      const isPasswordInHistory = await this.userRepository.isPasswordInHistory(
        userId,
        hashedPassword
      );

      return isPasswordInHistory;
    } catch (error) {
      handleError(error);
    }
  }

  async deletePasswordInHistory(
    userId: ObjectIdParam,
    hashedPassword: string
  ): Promise<boolean> {
    return await this.transactionManager.executeTransaction(async (session) => {
      try {
        //1. Validamos que exista el usuario
        await this.userValidator.validateExistsUserDataAsync(userId);

        //2. Verificamos que la contraseña si este presente en el array de contraseñas
        const isPasswordInHistory =
          await this.userRepository.isPasswordInHistory(userId, hashedPassword);

        //3. Usamos el validador pasandole el valor y que el se encargue de lanzar el error si es necesario
        UserValidator.validatePasswordInHistory(isPasswordInHistory);

        //4. Hacemos la operacion y devolvemos el valor
        const passwordDelete =
          await this.userRepository.deletePasswordInHistory(
            userId,
            hashedPassword,
            session
          );

        return passwordDelete;
      } catch (error) {
        handleError(error);
      }
    });
  }

  async enableTwoFactorAuth(userIdParam: ObjectIdParam): Promise<UserDocument> {
    return await this.transactionManager.executeTransaction(async (session) => {
      try {
        //1. Validamos que el usuario exista
        const user = await this.userRepository.findUserById(userIdParam);
        UserValidator.validateUserExists(user);

        //2. Validamos que el segundo factor ya no este activo
        UserValidator.validateTwoFactorUserIsAlreadyActive(user.hasTwoFactor);

        //3. Sin importar el resultado verificamos que si es falso, exista su registro en la tabla intermedia y se cree por defecto
        const dataTwoFactorUser =
          await this.twoFactorUserActiveRepository.getTwoFactorUser(
            userIdParam
          );

        //4. Sino existe el registro lo creamos
        if (!dataTwoFactorUser) {
          let dataToAddUserFactor: UserTwoFactorActiveDto = {
            userId: userIdParam,
            twoFactorId: objectIdSchema.parse("67e9e6c034fe5c9d5ab4acf0"), //Email por defecto
            isActive: true,
          };

          //5. Lo agregamos
          await this.twoFactorUserActiveRepository.addTwoFactorUser(
            dataToAddUserFactor,
            session
          );
        } else {
          //6. Si existe y esta desactivado, lo activamos en el usuario y en la tabla intermedia
          await this.twoFactorUserActiveRepository.activateTwoFactorUser(
            userIdParam,
            session
          );
        }

        //7. Actualizo el estatus en el registro de user
        return await this.userRepository.enableTwoFactorAuth(
          userIdParam,
          session
        );
      } catch (error) {
        handleError(error);
      }
    });
  }

  async disableTwoFactorAuth(
    userIdParam: ObjectIdParam
  ): Promise<UserDocument> {
    return await this.transactionManager.executeTransaction(async (session) => {
      try {

        //1. Validamos que el usuario exista
        const user = await this.userRepository.findUserById(userIdParam);
        UserValidator.validateUserExists(user);

        //2. Validamos que el segundo factor ya no este inactivo
        UserValidator.validateTwoFactorUserIsAlreadyInactive(user.hasTwoFactor);

        //3. Si existe y esta desactivado, lo desactivamos en el usuario y en la tabla intermedia
        await this.twoFactorUserActiveRepository.inactivateTwoFactorUser(
          userIdParam,
          session
        );

        //7. Actualizo el estatus en el registro de user
        return await this.userRepository.disableTwoFactorAuth(
          userIdParam,
          session
        );
      } catch (error) {
        handleError(error);
      }
    });
  }

  async addQuantityUsers(): Promise<void> {
    try {
      const factorsUsers =
        await this.twoFactorUserActiveRepository.listTwoFactorUsers();

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

      console.log(
        "Se ha actualizado la cantidad para todos los factores correspondientes."
      );
    } catch (error) {
      handleError(error);
    }
  }

  async getStatusUser(customIdUser: string): Promise<string> {

    try {

      const user = await this.userRepository.findUserByCustomId(customIdUser);

      UserValidator.validateUserExists(user);

      return await this.userRepository.getStatusUser(customIdUser);

    } catch (error) {

      handleError(error);
    }
  }

  async getStatusUserActive(customIdUser: string): Promise<string> {

    try {

      const user = await this.userRepository.findUserByCustomId(customIdUser);

      UserValidator.validateUserExists(user);

      const statusUser = await this.userRepository.getStatusUser(customIdUser);

      UserValidator.validateStatusUserIsActive(statusUser);

      return statusUser;

    } catch (error) {

      handleError(error);
    }
  }

  async getSecondFactorUserStatus(idUser: ObjectIdParam): Promise<boolean> {

    try {

      const user = await this.userRepository.findUserById(idUser);

      UserValidator.validateUserExists(user);

      const statusSecondFactorUser = await this.twoFactorUserActiveRepository.getTwoFactorUserActive(idUser);

      return statusSecondFactorUser;

    } catch (error) {

      handleError(error);
    }
  }

  async getCustomPermissionsUser(idUser: string): Promise<ICustomPermission[] | null> {

    try {

      const user = await this.userRepository.findUserByCustomId(idUser);

      UserValidator.validateUserExists(user);

      const customPermissionsUser = await this.userPermissionRepository.getPermissionsUser(user.idUser);

      return customPermissionsUser;

    } catch (error) {

      handleError(error);
    }
  }

  async getModulesUser(routesUser: RouteDocument[]): Promise<ModuleDocument[] | null> {

    try {

      const modulesUser = routesUser.map((subroute) => subroute.idModule);
      console.log(modulesUser);

      // Usando Set para obtener valores únicos
      const uniqueModulesUser = Array.from(new Set(modulesUser));
      console.log("Array sin duplicados:", uniqueModulesUser);

      const modules = await this.menuService.getModulesByUserModules(uniqueModulesUser);

      return modules;

    } catch (error) {

      handleError(error)
    }
  }

  /**
   * Construye la estructura completa del menú (Módulos con Rutas y Subrutas anidadas),
   * basada en los permisos del usuario.
   * @param idUser El ID del usuario.
   * @returns Un array de objetos ModuleWithRoutes, o un array vacío si no hay rutas/permisos.
   */
  async buildUserMenu(idUser: string): Promise<ModuleWithRoutes[]> { // <-- TIPO DE RETORNO CAMBIADO

    try {

      //0. Seguridad

      //0.1 Validamos al usuario, que exista
      const user = await this.findUserByCustomId(idUser);

      UserValidator.validateUserExists(user);

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
      const simplifiedAllowedSubroutes: SimplifiedSubroute[] = allowedSubroutesDocs.map(subroute => ({
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
      const finalMenu: ModuleWithRoutes[] = modules.map(module => {
        // Filtrar las rutas principales que pertenecen a este módulo
        const moduleRoutes: RouteWithSubroutes[] = mainRoutes
          .filter(mainRoute => mainRoute.idModule === module.id) // Las rutas que pertenecen a este módulo
          .map(mainRoute => {
            // Para cada ruta principal, filtrar sus subrutas permitidas
            const nestedSubroutes: SimplifiedSubroute[] = simplifiedAllowedSubroutes.filter(
              subroute => subroute.mainRoute === mainRoute.id // <-- Condición de filtro revisada
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

    } catch (error) {
      handleError(error);
      throw error;
    }
  }
}
