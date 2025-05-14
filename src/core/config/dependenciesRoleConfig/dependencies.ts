import { container } from "tsyringe"
import { TransactionManager } from "../../database/transactionManager";
import { RoleConfigModel } from "../../../db/models";
import { IRoleConfigRepository, RoleConfigRepositoryImpl } from "../../../services/roleConfig";
import { RoleConfigValidator } from "../../validators";
import { RoleConfigService } from "../../../services/roleConfig/roleConfig.service";

export const configureDependenciesRoleConfig = async () => {


    container.register("TransactionManager", TransactionManager);
    container.register("RoleConfigModel", {useValue : RoleConfigModel});

    container.register<IRoleConfigRepository>("IRoleConfigRepository", {useClass : RoleConfigRepositoryImpl});


    container.register("RoleConfigValidator", {useClass : RoleConfigValidator});

    container.register("RoleConfigService", { useClass: RoleConfigService });
}