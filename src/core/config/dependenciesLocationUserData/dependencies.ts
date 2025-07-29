import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { LocationUserModel } from "../../../db/models";
import { ILocationUserDataRepository, LocationUserDataRepositoryImpl } from "../../../services/userService";
import { LocationUserDataValidator } from "../../validators";

export const configureLocationDataUserDependencies = async () => {

    container.register("TransactionManager", TransactionManager);
    
    container.register("LocationUserModel", { useValue: LocationUserModel });

    container.register<ILocationUserDataRepository>("ILocationUserDataRepository", { useClass: LocationUserDataRepositoryImpl });

    container.register("LocationUserDataValidator", { useClass: LocationUserDataValidator });

}