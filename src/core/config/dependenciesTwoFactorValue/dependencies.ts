import { container } from "tsyringe"
import { TwoFactorUserValueModel } from "../../../db/models"
import { TransactionManager } from "../../database/transactionManager";
import { ITwoFactorValueRepository } from "../../../services/oauthService";
import { TwoFactorValueRepositoryImpl } from "../../../services/oauthService/repositories/twoFactorValueRepository";

export const configureDependenciesTwoFactorUser = async () => {

    container.register("TransactionManager", TransactionManager);

    container.register("TwoFactorUserValueModel", {useValue : TwoFactorUserValueModel});

    container.register<ITwoFactorValueRepository>("ITwoFactorDataRepository" , {useClass : TwoFactorValueRepositoryImpl});
}