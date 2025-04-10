import { inject, injectable } from "tsyringe";
import { IPermissionRepository } from "./interfaces/IPermissionRepository";
import { CreatePermissionDto, ObjectIdParam, UpdatePermissionDto } from "../../validations";
import { PermissionDocument } from "../../db/models/permissionsModels/permission.model";
import { PermissionNotFoundError, PermissionUpdateError } from "../../core/exceptions";
import { PermissionValidator } from "../../core/validators";

@injectable()
export class PermissionService{


    constructor(@inject("IPermissionRepository") private readonly repository: IPermissionRepository){}

    async createPermission(data : CreatePermissionDto) : Promise<PermissionDocument>{

        return this.repository.createPermission(data);
    }

    async getPermissionById(id : ObjectIdParam) : Promise<PermissionDocument | null>{

        const permission = await this.repository.findPermissionById(id);
        if(!permission) throw new PermissionNotFoundError();
        return permission;
    }

    async updatePermission(
        id: ObjectIdParam,
        data: UpdatePermissionDto
    ) : Promise<PermissionDocument | null>{

        const updatedPermission = await this.repository.updatePermission(id, data);
        if(!updatedPermission) throw new PermissionUpdateError();
        return updatedPermission;
    }

    async deletePermission(id: ObjectIdParam) : Promise<PermissionDocument | null>{

        const permission = await this.repository.findPermissionById(id);
        if(!permission) throw new PermissionNotFoundError();
        PermissionValidator.validateIsActive(permission);
        return this.repository.deletePermission(id);
    }

    async togglePermissionCan(id: ObjectIdParam) : Promise<PermissionDocument | null>{

        const permission = await this.repository.findPermissionById(id);
        if(!permission) throw new PermissionNotFoundError();

        return this.repository.togglePermissionCan(id);
    }
    
    // async updateLabelPermission(id: ObjectIdParam, newLabel : string) : Promise<PermissionDocument | null>{

    //     const 
    // }
}