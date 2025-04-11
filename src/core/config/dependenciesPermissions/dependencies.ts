import "reflect-metadata";
import { container } from "tsyringe";
import { PermissionModel } from "../../../db/models";
import { IPermissionRepository, PermissionService } from "../../../services/permission";
import { PermissionRepository } from "../../../services/permission/repositories/permissionRepository";

container.register("PermissionModel", { useValue: PermissionModel });
// Registra el repositorio bajo la clave "IPermissionRepository"
container.register<IPermissionRepository>("IPermissionRepository", { 
    useClass: PermissionRepository 
});
container.register("PermissionService", { useClass: PermissionService });


// export const permissionRepositoryImpl : IPermissionRepository = new PermissionRepository(PermissionModel);
// export const permissionService = new PermissionService(permissionRepositoryImpl);