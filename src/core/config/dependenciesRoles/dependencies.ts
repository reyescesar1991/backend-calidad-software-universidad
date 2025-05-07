import { container } from "tsyringe"
import { RoleModel } from "../../../db/models"
import { TransactionManager } from "../../database/transactionManager";
import { IRolePermissionRepository, IRolePermissionSecurityRepository, IRoleRepository } from "../../../services/role/interfaces/IRoleRepository";
import { RoleRepositoryImpl } from "../../../services/role/repositories/roleRepository";
import { RolePermissionRepositoryImpl } from "../../../services/role/repositories/rolePermissionRepository";
import { RolePermissionSecurityImpl } from "../../../services/role/repositories/rolePermissionSecurityRepository";
import { RoleValidator } from "../../validators";

export const configureDependenciesRoles = async () => {

    container.register("TransactionManager", TransactionManager);
    container.register("RoleModel", {useValue : RoleModel});
    container.register<IRoleRepository>("IRoleRepository", {useClass : RoleRepositoryImpl});
    container.register<IRolePermissionRepository>("IRolePermissionRepository", {useClass : RolePermissionRepositoryImpl});
    container.register<IRolePermissionSecurityRepository>("IRolePermissionSecurityRepository", {useClass : RolePermissionSecurityImpl});

    //validator roles

    container.register("RoleValidator", {useClass : RoleValidator});
}