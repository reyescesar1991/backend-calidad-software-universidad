import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { RouteModel } from "../../../db/models";
import { RouteRepository } from "../../../services/menu/repositories/routeRepository";
import { IRouteRepository } from "../../../services/menu";
import { MenuService } from "../../../services/menu/Menu.service";
import { initializeTestEnvironment } from "../../utils/connectDb";
import { RouteValidator } from "../../validators";


export const configureDependencies = async () => {
    // ✅ 1. Conectar PRIMERO
    await initializeTestEnvironment();

    container.register("TransactionManager", TransactionManager);

    container.register("RouteModel", { useValue: RouteModel });

    container.register<IRouteRepository>("IRouteRepository", { useClass: RouteRepository });

    container.register("MenuService", { useClass: MenuService });

    container.register("RouteValidator" , {useClass: RouteValidator})

    console.log("🔧 Dependencias configuradas con conexión activa");
};