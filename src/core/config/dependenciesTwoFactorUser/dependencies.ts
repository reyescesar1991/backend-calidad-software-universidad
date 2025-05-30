import { container } from "tsyringe"
import { TwoFactorAuthModel } from "../../../db/models"
import { TransactionManager } from "../../database/transactionManager";

export const configureDependenciesTwoFactorUser = async () => {

    container.register("TransactionManager", TransactionManager);

    container.register("TwoFactorAuthModel", {useValue : TwoFactorAuthModel});

}