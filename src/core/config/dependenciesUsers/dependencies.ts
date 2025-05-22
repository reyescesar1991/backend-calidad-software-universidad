import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { UserModel } from "../../../db/models";


export const configureUserDependencies = async () => {

    container.register("TransactionManager", TransactionManager);
    container.register("RoleModel", {useValue : UserModel});
}