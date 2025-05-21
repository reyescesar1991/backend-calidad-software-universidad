import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { DepartmentModel } from "../../../db/models";
import { IDepartmentRepository, IDepartmentRepositoryImpl } from "../../../services/locationService";
import { DepartmentValidator } from "../../validators/departments/department.validator";

export const configureDependenciesDepartments = async () => {


    container.register("TransactionManager", TransactionManager);
    container.register("DepartmentModel", {useValue : DepartmentModel});

    container.register<IDepartmentRepository>("IDepartmentRepository", {useClass : IDepartmentRepositoryImpl});

    container.register("DepartmentValidator", {useClass : DepartmentValidator});
}