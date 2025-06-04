import { container } from "tsyringe"
import { TwoFactorAuthModel } from "../../../db/models"
import { TransactionManager } from "../../database/transactionManager";
import { ITwoFactorDataRepository } from "../../../services/oauthService/interfaces/ITwoFactorDataRepository";
import { TwoFactorDataRepositoryImpl, TwoFactorService } from "../../../services/oauthService";

export const configureDependenciesTwoFactorUser = async () => {

    container.register("TransactionManager", TransactionManager);

    container.register("TwoFactorAuthModel", {useValue : TwoFactorAuthModel});

    container.register<ITwoFactorDataRepository>("ITwoFactorDataRepository" , {useClass : TwoFactorDataRepositoryImpl});

    container.register("TwoFactorService", {useClass : TwoFactorService});

}