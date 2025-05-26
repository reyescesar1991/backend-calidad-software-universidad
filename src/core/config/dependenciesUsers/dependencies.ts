import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { UserModel } from "../../../db/models";
import { IUserRepository, UserRepositoryImpl } from "../../../services/userService";
import { UserValidator } from "../../validators";
import { UserService } from "../../../services/userService/user.service";


export const configureUserDependencies = async () => {

    container.register("TransactionManager", TransactionManager);
    container.register("UserModel", {useValue : UserModel});
    container.register<IUserRepository>("IUserRepository", {useClass : UserRepositoryImpl});
    container.register("UserService" , {useClass : UserService});
    container.register("UserValidator", {useClass : UserValidator});
}