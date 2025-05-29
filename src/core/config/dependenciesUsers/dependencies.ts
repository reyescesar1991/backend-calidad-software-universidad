import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { UserModel, UserPermissionModel, UserPermissionSecurityModel, UserTwoFactorActiveModel } from "../../../db/models";
import { ITwoFactorUserRepository, IUserPermissionRepository, IUserPermissionSecurityRepository, IUserRepository, TwoFactorUserActiveRepositoryImpl, UserPermissionRepositoryImpl, UserPermissionSecurityRepositoryImpl, UserRepositoryImpl } from "../../../services/userService";
import { UserValidator } from "../../validators";
import { UserService } from "../../../services/userService/user.service";


export const configureUserDependencies = async () => {

    container.register("TransactionManager", TransactionManager);
    
    container.register("UserModel", {useValue : UserModel});
    container.register("UserPermissionModel", {useValue : UserPermissionModel});
    container.register("UserPermissionSecurityModel", {useValue : UserPermissionSecurityModel});
    container.register("UserTwoFactorModel", {useValue : UserTwoFactorActiveModel});

    container.register<IUserRepository>("IUserRepository", {useClass : UserRepositoryImpl});
    container.register<IUserPermissionRepository>("IUserPermissionRepository", {useClass : UserPermissionRepositoryImpl});
    container.register<IUserPermissionSecurityRepository>("IUserPermissionSecurityRepository", {useClass : UserPermissionSecurityRepositoryImpl});
    container.register<ITwoFactorUserRepository>("ITwoFactorUserRepository", {useClass : TwoFactorUserActiveRepositoryImpl});

    container.register("UserService" , {useClass : UserService});
    container.register("UserValidator", {useClass : UserValidator});
}