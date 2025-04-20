import "reflect-metadata";
import { container } from "tsyringe";
import { PermissionSecurityModel } from "../../../db/models";
import { IPermissionSecurityRepository, PermissionSecurityRepository, PermissionSecurityService } from "../../../services/permissionSecurity";
import { PermissionSecurityValidator } from "../../validators";

container.register("PermissionSecurityModel" , {useValue : PermissionSecurityModel});

container.register<IPermissionSecurityRepository>("IPermissionSecurityRepository", {
    useClass : PermissionSecurityRepository
});

container.register("PermissionSecurityService", {useClass : PermissionSecurityService});

container.register("PermissionSecurityValidator", { useClass: PermissionSecurityValidator});