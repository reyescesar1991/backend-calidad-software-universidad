import { container } from "tsyringe"
import { TwoFactorUserValueModel } from "../../../db/models"
import { TransactionManager } from "../../database/transactionManager";
import { ITwoFactorValueRepository, TwoFactorUserService } from "../../../services/oauthService";
import { TwoFactorValueRepositoryImpl } from "../../../services/oauthService/repositories/twoFactorValueRepository";

export const configureDependenciesTwoFactorValueUser = async () => {

    container.register("TransactionManager", TransactionManager);

    container.register("TwoFactorUserValueModel", {useValue : TwoFactorUserValueModel});

    container.register<ITwoFactorValueRepository>("ITwoFactorValueRepository" , {useClass : TwoFactorValueRepositoryImpl});

    container.register("TwoFactorUserService", {useClass : TwoFactorUserService});
}