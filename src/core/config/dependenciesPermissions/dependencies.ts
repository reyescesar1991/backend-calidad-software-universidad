import "reflect-metadata";
import { container } from "tsyringe";
import { PermissionModel } from "../../../db/models";
import { IPermissionRepository, PermissionService } from "../../../services/permission";
import { PermissionRepository } from "../../../services/permission/repositories/permissionRepository";
import { PermissionValidator } from "../../validators";

container.register("PermissionModel", { useValue: PermissionModel });
// Registra el repositorio bajo la clave "IPermissionRepository"
container.register<IPermissionRepository>("IPermissionRepository", { 
    useClass: PermissionRepository 
});
container.register("PermissionService", { useClass: PermissionService });

container.register("PermissionValidator", { useClass: PermissionValidator});