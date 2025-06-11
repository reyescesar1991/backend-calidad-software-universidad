import { container } from "tsyringe"
import { TransactionManager } from "../../database/transactionManager";
import { SessionManagementModel } from "../../../db/models/oauthModels/sessionManagement.model";
import { ISessionManagementRepository, SessionManagementRepositoryImpl } from "../../../services/oauthService";
import { SessionManagementValidator } from "../../validators";


export const configureSessionManagementDependencies = async () => {

    container.register("TransactionManager", TransactionManager);

    container.register("SessionManagementModel", { useValue: SessionManagementModel });

    container.register("SessionManagementValidator" , {useClass: SessionManagementValidator});

    container.register<ISessionManagementRepository>("ISessionManagementRepository", { useClass: SessionManagementRepositoryImpl });
}

