import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { WarehouseModel } from "../../../db/models";
import { IWarehouseRepository, WarehouseRepositoryImpl } from "../../../services/locationService";
import { WarehouseValidator } from "../../validators";

export const configureWarehouseDependencies = async () => {


    container.register("TransactionManager", TransactionManager);
    container.register("WarehouseModel", {useValue : WarehouseModel});

    container.register<IWarehouseRepository>("IWarehouseRepository", {useClass : WarehouseRepositoryImpl});

    container.register("WarehouseValidator", {useClass : WarehouseValidator});
}