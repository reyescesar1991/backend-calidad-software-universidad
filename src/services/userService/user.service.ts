import { inject, injectable } from "tsyringe";
import { IUserRepository } from "./interfaces/IUserRepository";
import { RoleValidator, UserValidator } from "../../core/validators";
import { TransactionManager } from "../../core/database/transactionManager";
import { ObjectIdParam, UserDto, UserPermissionDto, UserPermissionSecurityDto } from "../../validations";
import { UserDocument } from "../../db/models";
import { handleError } from "../../core/exceptions";
import { FilterOptions, UserConfigFilterKeys } from "../../core/types";
import { RoleService } from "../role/Role.service";
import { IUserPermissionRepository } from "./interfaces/IUserPermissionRepository";
import { IRoleRepository } from "../role/interfaces/IRoleRepository";
import { IUserPermissionSecurityRepository } from "./interfaces/IUserPermissionSecurityRepository";
import { IRoleConfigRepository } from "../roleConfig";

@injectable()
export class UserService {

    constructor(
        @inject("IUserRepository") private readonly userRepository: IUserRepository,
        @inject("IUserPermissionRepository") private readonly userPermissionRepository: IUserPermissionRepository,
        @inject("IUserPermissionSecurityRepository") private readonly userPermissionSecurityRepository: IUserPermissionSecurityRepository,
        @inject("IRoleConfigRepository") private readonly roleConfigRepository : IRoleConfigRepository,
        @inject("UserValidator") private readonly userValidator: UserValidator,
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("IRoleRepository") private readonly roleRepository: IRoleRepository,
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

            const user = await this.userRepository.findUserByCustomId(customIdUser);

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

    async searchUserByFilter(filter: FilterOptions<UserConfigFilterKeys>): Promise<UserDocument[] | null> {

        try {

            UserValidator.validateFilterRole(filter);

            const users = await this.userRepository.searchUserByFilter(filter);

            UserValidator.validateUsersExistsByFilter(users);

            return users;

        } catch (error) {

            handleError(error);
        }
    }

    async createUser(dataUser: UserDto, idConfigRoleParam: ObjectIdParam): Promise<UserDocument | null> {

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    //1. Validamos que no exista previamente el usuario
                    await this.userValidator.validateUniquenessUserData(dataUser.idUser);

                    //2. Validamos que no tenga un campo unico repetido a un usuario ya existente
                    await this.userValidator.validateUniqueKeysUser(
                        {
                            idUser: dataUser.idUser,
                            email: dataUser.email,
                            phoneNumber: dataUser.phoneNumber,
                            username: dataUser.username
                        }
                    );

                    //3. Validamos que exista el role
                    const role = await this.roleConfigRepository.findRoleConfigWithRole(idConfigRoleParam);
                    RoleValidator.validateRoleExists(role);
                    

                    //TODO: CREAR UN MIDDLEWARE PARA VALIDAR QUE SOLO UN USUARIO CON ROL ADMIN PUEDA USAR ESTA FUNCIONALIDAD    

                    //6. Obtenemos los permisos del usuario
                    const rolePermissions = await this.roleRepository.getPermissionsRole(role.idRole);
                    //7. Obtenemos los permisos de seguridad del usuario
                    const rolePermissionSecurity = await this.roleRepository.getPermissionsSecurityRole(role.idRole);

                    //8. Si el usuario tiene permisos de seguridad es que es un admin, se entra en el if y se crea su registro en tabla intermedia
                    if (rolePermissionSecurity.length > 0) {

                        const userPermissionsSecurityConfig = rolePermissionSecurity.map((permission) => {

                            return {

                                permissionSecurityId: permission._id,
                                can: true,
                                permissionKey: permission.permission
                            }
                        });

                        let userDataPermissionSecurity: UserPermissionSecurityDto = {

                            idUser: dataUser.idUser,
                            idRol: role.idRole,
                            customPermissionsSecurity: userPermissionsSecurityConfig
                        }
                        const objectSecurity = await this.userPermissionSecurityRepository.setDataPermissionSecurityUser(userDataPermissionSecurity);
                        console.log(objectSecurity);
                    }

                    //9. Se crea el objeto de permisos para el usuario y se crea el registro en tabla intermedia
                    const userPermissionsConfig = rolePermissions.map((permission) => {

                        return {

                            permissionId: permission._id,
                            can: true,
                            permissionLabel: permission.permission
                        }
                    });


                    let userDataPermission: UserPermissionDto = {

                        idUser: dataUser.idUser,
                        roleId: role.idRole,
                        customPermissions: userPermissionsConfig
                    }

                    console.log(userDataPermission);

                    await this.userPermissionRepository.setDataPermissionUser(userDataPermission);

                    const newUser = await this.userRepository.createUser(dataUser, session);

                    return newUser;

                } catch (error) {

                    handleError(error);
                }
            }
        )
    }
}