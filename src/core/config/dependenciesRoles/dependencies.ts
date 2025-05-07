import { container } from "tsyringe"
import { RoleModel } from "../../../db/models"
import { TransactionManager } from "../../database/transactionManager";
import { IRolePermissionRepository, IRoleRepository } from "../../../services/role/interfaces/IRoleRepository";
import { RoleRepositoryImpl } from "../../../services/role/repositories/roleRepository";
import { RolePermissionRepositoryImpl } from "../../../services/role/repositories/rolePermissionRepository";

export const configureDependenciesRoles = async () => {

    container.register("TransactionManager", TransactionManager);
    container.register("RoleModel", {useValue : RoleModel});
    container.register<IRoleRepository>("IRoleRepository", {useClass : RoleRepositoryImpl});
    container.register<IRolePermissionRepository>("IRoleRepository", {useClass : RolePermissionRepositoryImpl});
}