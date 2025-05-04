import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { ModuleModel, RouteModel } from "../../../db/models";
import { RouteRepository } from "../../../services/menu/repositories/routeRepository";
import { IModuleRepository, IRouteRepository } from "../../../services/menu";
import { MenuService } from "../../../services/menu/Menu.service";
import { initializeTestEnvironment } from "../../utils/connectDb";
import { ModuleValidator, RouteValidator } from "../../validators";
import { ModuleRepositoryImpl } from "../../../services/menu/repositories/moduleRepository";


export const configureDependencies = async () => {
    // ✅ 1. Conectar PRIMERO
    await initializeTestEnvironment();

    container.register("TransactionManager", TransactionManager);

    container.register("RouteModel", { useValue: RouteModel });
    container.register("ModuleModel", {useValue: ModuleModel});

    container.register<IRouteRepository>("IRouteRepository", { useClass: RouteRepository });
    container.register<IModuleRepository>("IModuleRepository", {useClass : ModuleRepositoryImpl});

    container.register("MenuService", { useClass: MenuService });

    container.register("RouteValidator" , {useClass: RouteValidator});
    container.register("ModuleValidator", { useClass : ModuleValidator});

    console.log("🔧 Dependencias configuradas con conexión activa");
};