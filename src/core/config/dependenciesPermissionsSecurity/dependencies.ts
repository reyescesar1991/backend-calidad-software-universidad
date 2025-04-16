import "reflect-metadata";
import { container } from "tsyringe";
import { PermissionSecurityModel } from "../../../db/models";
import { IPermissionSecurityRepository, PermissionSecurityRepository, PermissionSecurityService } from "../../../services/permissionSecurity";

container.register("PermissionSecurityModel" , {useValue : PermissionSecurityModel});

container.register<IPermissionSecurityRepository>("IPermissionSecurityRepository", {
    useClass : PermissionSecurityRepository
});

container.register("PermissionSecurityService", {useClass : PermissionSecurityService});
