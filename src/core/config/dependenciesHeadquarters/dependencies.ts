import { container } from "tsyringe";
import { TransactionManager } from "../../database/transactionManager";
import { HeadquartersModel } from "../../../db/models";
import { IHeadquarterRepository } from "../../../services/locationService";
import { IHeadquarterRepositoryImpl } from "../../../services/locationService/repositories/headquarterRepository";
import { HeadquarterValidator } from "../../validators";
import { LocationService } from "../../../services/locationService/Location.service";

export const configureDependenciesRoles = async () => {

    container.register("TransactionManager", TransactionManager);
    container.register("HeadquartersModel", {useValue : HeadquartersModel});
    container.register<IHeadquarterRepository>("IHeadquarterRepository", {useClass : IHeadquarterRepositoryImpl});
    // container.register<IRolePermissionRepository>("IRolePermissionRepository", {useClass : RolePermissionRepositoryImpl});
    // container.register<IRolePermissionSecurityRepository>("IRolePermissionSecurityRepository", {useClass : RolePermissionSecurityImpl});
    container.register("LocationService", { useClass: LocationService });
    //validators

    container.register("HeadquarterValidator", {useClass : HeadquarterValidator});
}