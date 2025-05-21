import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { DepartmentModel } from "../../../db/models";

export const configureDependenciesDepartments = async () => {


    container.register("TransactionManager", TransactionManager);
    container.register("DepartmentModel", {useValue : DepartmentModel});
}