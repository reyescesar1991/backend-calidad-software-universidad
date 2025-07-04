import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { PaymentTermModel } from "../../../db/models";
import { IPaymentTermsRepository, PaymentTermsRepositoryImpl } from "../../../services/generalDataService";
import { PaymentTermsValidator } from "../../validators";

export const configurePaymentTermsDependencies = async () => {

    container.register("TransactionManager", TransactionManager);
    container.register("PaymentTermModel", {useValue : PaymentTermModel});

    container.register<IPaymentTermsRepository>("IPaymentTermsRepository", {useClass : PaymentTermsRepositoryImpl});

    container.register("PaymentTermsValidator", {useClass : PaymentTermsValidator});
}