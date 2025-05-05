import { container } from "tsyringe"
import { RoleModel } from "../../../db/models"
import { TransactionManager } from "../../database/transactionManager";

export const configureDependenciesRoles = async () => {

    container.register("TransactionManager", TransactionManager);
    container.register("RoleModel", {useValue : RoleModel});
}