import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { ModuleModel, RouteModel, SubrouteModel } from "../../../db/models";
import { RouteRepository } from "../../../services/menu/repositories/routeRepository";
import { IModuleRepository, IRouteRepository, ISubrouteRepository, SubrouteRepository } from "../../../services/menu";
import { MenuService } from "../../../services/menu/Menu.service";
import { ModuleValidator, RouteValidator, SubrouteValidator } from "../../validators";
import { ModuleRepositoryImpl } from "../../../services/menu/repositories/moduleRepository";


export const configureDependencies = async () => {

    container.register("TransactionManager" , TransactionManager);
    
    container.register("SubrouteModel" , {useValue : SubrouteModel});
    
    container.register<ISubrouteRepository>("ISubrouteRepository", {useClass: SubrouteRepository});
    
    container.register("MenuService", {useClass : MenuService});
    
    container.register("SubrouteValidator", {
        useClass: SubrouteValidator
    });

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