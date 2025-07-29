import { container } from "tsyringe";
import { initializeTestEnvironment } from "../../utils/connectDb";
import { TransactionManager } from "../../database/transactionManager";
import { ModuleModel } from "../../../db/models";
import { IModuleRepository } from "../../../services/menu";
import { ModuleRepositoryImpl } from "../../../services/menu/repositories/moduleRepository";
import { MenuService } from "../../../services/menu/Menu.service";
import { ModuleValidator } from "../../validators";


export const configureDependenciesModule = async () => {

    container.register("TransactionManager", TransactionManager);

    container.register("ModuleModel", {useValue: ModuleModel});

    container.register<IModuleRepository>("IModuleRepository", {useClass : ModuleRepositoryImpl});

    container.register("MenuService", { useClass: MenuService });

    container.register("ModuleValidator", { useClass : ModuleValidator});
}

