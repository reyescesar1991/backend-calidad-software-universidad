import { inject, injectable } from "tsyringe";
import { IRolePermissionRepository, IRolePermissionSecurityRepository, IRoleRepository } from "./interfaces/IRoleRepository";
import { PermissionSecurityValidator, PermissionValidator, RoleValidator } from "../../core/validators";
import { ObjectIdParam, RoleDto, UpdateRoleDto } from "../../validations";
import { RoleDocument } from "../../db/models";
import { handleError, RoleNotAdminManagePermissionError, RoleNotValidDefaultSystemError } from "../../core/exceptions";
import { FilterOptions, RoleFilterKeys } from "../../core/types";
import { TransactionManager } from "../../core/database/transactionManager";
import { IPermissionRepository } from "../permission";
import { IPermissionSecurityRepository } from "../permissionSecurity";

@injectable()
export class RoleService {


    constructor(
        @inject("IRoleRepository") private readonly roleRepository: IRoleRepository,
        @inject("RoleValidator") private readonly roleValidator: RoleValidator,
        @inject("TransactionManager") private readonly transactionManager: TransactionManager,
        @inject("IPermissionRepository") private readonly permissionRepository: IPermissionRepository,
        @inject("IPermissionSecurityRepository") private readonly permissionSecurityRepository: IPermissionSecurityRepository,
        @inject("IRolePermissionRepository") private readonly rolePermissionRepository: IRolePermissionRepository,
        @inject("PermissionValidator") private readonly permissionValidator: PermissionValidator,
        @inject("IRolePermissionSecurityRepository") private readonly rolePermissionSecurityRepository : IRolePermissionSecurityRepository,
    ) { }

    async findRoleById(idRole: ObjectIdParam): Promise<RoleDocument | null> {

        try {

            const role = await this.roleRepository.findRoleById(idRole);

            RoleValidator.validateRoleExists(role);

            return role;

        } catch (error) {
            handleError(error);
        }
    }

    async findRoleByCustomId(customIdRole: string): Promise<RoleDocument | null> {

        try {

            const role = await this.roleRepository.findRoleByCustomId(customIdRole);

            RoleValidator.validateRoleExists(role);

            return role;


        } catch (error) {

            handleError(error);
        }
    }

    async searchRolesByFilters(filter: FilterOptions<RoleFilterKeys>): Promise<RoleDocument[] | null> {


        try {

            RoleValidator.validateFilterRole(filter);

            const roles = await this.roleRepository.searchRolesByFilters(filter);

            RoleValidator.validateFoundRoles(roles);

            return roles;

        } catch (error) {

            handleError(error);

        }
    }

    async listRoles(): Promise<RoleDocument[] | null> {

        try {

            const roles = await this.roleRepository.listRoles();

            RoleValidator.validateListRoles(roles);

            return roles;

        } catch (error) {

            handleError(error);

        }
    }

    async createRole(dataRole: RoleDto): Promise<RoleDocument | null> {

        return this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    await this.roleValidator.validateUniquenessRole(dataRole.idRole);

                    if (dataRole.isDefault && dataRole.idRole != '01') throw new RoleNotValidDefaultSystemError();

                    if (dataRole.managePermissions && dataRole.idRole != '04') throw new RoleNotAdminManagePermissionError();

                    const role = await this.roleRepository.createRole(dataRole, session);

                    return role;


                } catch (error) {

                    handleError(error);

                }
            }
        )
    }

    async updateRole(idRole: ObjectIdParam, dataRole: UpdateRoleDto): Promise<RoleDocument | null> {

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const role = await this.roleRepository.findRoleById(idRole);

                    RoleValidator.validateRoleExists(role);

                    RoleValidator.validateIdRoleNotChange(role.idRole);

                    if (dataRole.idRole) await this.roleValidator.validateUniquenessIdRole(dataRole.idRole);

                    return await this.roleRepository.updateRole(idRole, dataRole, session);


                } catch (error) {

                    handleError(error);
                }
            }
        )
    }

    async deleteRole(idRole: ObjectIdParam): Promise<RoleDocument | null> {

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const role = await this.roleRepository.findRoleById(idRole);

                    RoleValidator.validateRoleExists(role);

                    RoleValidator.validateRoleAlreadyInactive(role.isActive);

                    return await this.roleRepository.deleteRole(idRole, session);

                } catch (error) {

                    handleError(error);
                }
            }
        )
    }

    async activateRole(idRole: ObjectIdParam): Promise<RoleDocument | null> {

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const role = await this.roleRepository.findRoleById(idRole);

                    RoleValidator.validateRoleExists(role);

                    RoleValidator.validateRoleAlreadyActive(role.isActive);

                    return await this.roleRepository.activateRole(idRole, session);

                } catch (error) {

                    handleError(error);
                }
            }
        )
    }

    async setDefaultRoleSystem(idRole: ObjectIdParam): Promise<RoleDocument | null> {

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const role = await this.roleRepository.findRoleById(idRole);

                    RoleValidator.validateRoleExists(role);

                    await this.roleRepository.unsetAllDefaultRoles(session);

                    RoleValidator.validateRoleCanBeDefault(role.idRole);

                    return await this.roleRepository.setDefaultRoleSystem(idRole, session);

                } catch (error) {

                    handleError(error);
                }
            }
        )
    }

    async addPermissionRole(idRoleParam: string, idPermission: string): Promise<RoleDocument | null> {

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const role = await this.roleRepository.findRoleByCustomId(idRoleParam);

                    RoleValidator.validateStatusRol(role.isActive);

                    RoleValidator.validateRoleExists(role);

                    const permission = await this.permissionRepository.findPermissionByKey(idPermission);

                    PermissionValidator.validateExistsPermission(permission);

                    RoleValidator.validateRolValidsPermission(idRoleParam, permission.permission);

                    const permissionsUser = await this.roleRepository.getPermissionsRole(role.idRole);

                    RoleValidator.validateRolAlreadyPermissionActive(permissionsUser, permission);

                    return await this.rolePermissionRepository.addPermissionRole(idRoleParam, permission, session);

                } catch (error) {

                    handleError(error);
                }
            }
        )
    }

    async deletePermissionRole(idRoleParam: string, idPermission: string): Promise<RoleDocument | null> {

        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const role = await this.roleRepository.findRoleByCustomId(idRoleParam);

                    //Validamos que el rol exista
                    RoleValidator.validateRoleExists(role);

                    //Validamos que el rol este activo
                    RoleValidator.validateStatusRol(role.isActive);

                    const permission = await this.permissionRepository.findPermissionByKey(idPermission);

                    //Validamos que exista el permiso
                    PermissionValidator.validateExistsPermission(permission);

                    //Validamos que el permiso este presente en el rol
                    await this.roleValidator.validatePermissionBeforeDelete(idRoleParam, idPermission);

                    //Eliminamos el permiso del rol
                    return await this.rolePermissionRepository.deletePermissionRole(idRoleParam, permission, session);


                } catch (error) {

                    handleError(error);
                }
            }
        )
    }


    async addPermissionSecurityRole(idRoleParam: string, idPermissionSecurity: string): Promise<RoleDocument | null>{

        return await this.transactionManager.executeTransaction(

            async (session) => {


                try {

                    const role = await this.roleRepository.findRoleByCustomId(idRoleParam);

                    //Validamos que el rol exista
                    RoleValidator.validateRoleExists(role);

                    //Validamos que el rol este activo
                    RoleValidator.validateStatusRol(role.isActive);

                    //Obtenemos el permiso de seguridad
                    const permissionSecurity = await this.permissionSecurityRepository.findPermissionSecurityByCustomId(idPermissionSecurity);

                    //Verificamos que exista el permiso
                    PermissionSecurityValidator.validateFoundPermissionSecurity(permissionSecurity);

                    //Verificamos que el usuario pueda adquirir ese permiso de seguridad
                    RoleValidator.validateRolValidsPermissionSecurity(idRoleParam, permissionSecurity.id);

                    //obtenemos todos los permisos del usuario actual
                    const permissionsSecurityUser = await this.roleRepository.getPermissionsSecurityRole(role.idRole);

                    //Validamos que el permiso este presente en el rol para no replicar
                    await this.roleValidator.validateRolAlreadyPermissionSecurityActive(permissionsSecurityUser, permissionSecurity);

                    return this.rolePermissionSecurityRepository.addPermissionSecurityRole(idRoleParam, permissionSecurity, session);

                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
    }


    async deletePermissionSecurityRole(idRoleParam: string, idPermissionSecurity: string): Promise<RoleDocument | null> {
        
        return await this.transactionManager.executeTransaction(

            async (session) => {

                try {

                    const role = await this.roleRepository.findRoleByCustomId(idRoleParam);

                    //Validamos que el rol exista
                    RoleValidator.validateRoleExists(role);

                    //Validamos que el rol este activo
                    RoleValidator.validateStatusRol(role.isActive);

                    //Obtenemos el permiso de seguridad
                    const permissionSecurity = await this.permissionSecurityRepository.findPermissionSecurityByCustomId(idPermissionSecurity);

                    //Verificamos que exista el permiso
                    PermissionSecurityValidator.validateFoundPermissionSecurity(permissionSecurity);

                    //Validamos que el permiso este presente en el rol para no replicar
                    await this.roleValidator.validatePermissionSecurityBeforeDelete(idRoleParam, idPermissionSecurity);

                    return await this.rolePermissionSecurityRepository.deletePermissionSecurityRole(idRoleParam, permissionSecurity, session);
                    
                } catch (error) {
                    
                    handleError(error);
                }
            }
        )
        
    }

}