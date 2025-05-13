import { container } from "tsyringe"
import { TransactionManager } from "../../database/transactionManager";
import { RoleConfigModel } from "../../../db/models";

export const configureDependenciesRoleConfig = async () => {


    container.register("TransactionManager", TransactionManager);
    container.register("RoleModel", {useValue : RoleConfigModel});
}