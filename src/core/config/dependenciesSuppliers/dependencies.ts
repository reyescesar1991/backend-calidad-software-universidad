import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { SupplierModel } from "../../../db/models";
import { ISupplierRepository, SupplierRepositoryImpl } from "../../../services/supplierService";
import { SupplierValidator } from "../../validators";

export const configureSuppliersDependencies = async () => {

    container.register("TransactionManager", TransactionManager);

    container.register("SupplierModel", {useValue : SupplierModel});

    container.register<ISupplierRepository>("ISupplierRepository" , {useClass : SupplierRepositoryImpl});

    container.register("SupplierValidator", {useClass : SupplierValidator});

}