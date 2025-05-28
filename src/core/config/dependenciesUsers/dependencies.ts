import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { UserModel, UserPermissionModel, UserPermissionSecurityModel } from "../../../db/models";
import { IUserPermissionRepository, IUserPermissionSecurityRepository, IUserRepository, UserPermissionRepositoryImpl, UserPermissionSecurityRepositoryImpl, UserRepositoryImpl } from "../../../services/userService";
import { UserValidator } from "../../validators";
import { UserService } from "../../../services/userService/user.service";


export const configureUserDependencies = async () => {

    container.register("TransactionManager", TransactionManager);
    
    container.register("UserModel", {useValue : UserModel});
    container.register("UserPermissionModel", {useValue : UserPermissionModel});
    container.register("UserPermissionSecurityModel", {useValue : UserPermissionSecurityModel});

    container.register<IUserRepository>("IUserRepository", {useClass : UserRepositoryImpl});
    container.register<IUserPermissionRepository>("IUserPermissionRepository", {useClass : UserPermissionRepositoryImpl});
    container.register<IUserPermissionSecurityRepository>("IUserPermissionSecurityRepository", {useClass : UserPermissionSecurityRepositoryImpl});

    container.register("UserService" , {useClass : UserService});
    container.register("UserValidator", {useClass : UserValidator});
}