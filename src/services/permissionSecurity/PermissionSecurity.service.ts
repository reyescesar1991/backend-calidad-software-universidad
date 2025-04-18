import { inject, injectable } from "tsyringe";
import { IPermissionSecurityRepository } from "./interfaces/IPermissionSecurityRepository";
import { PermissionSecurityDocument } from "../../db/models";
import { PermissionSecurityValidator } from "../../core/validators";
import { ObjectIdParam, PermissionSecurityDto, UpdatePermissionSecurityDto } from "../../validations";
import { PermissionSecurityDuplicateError, PermissionSecurityNotFoundError, PermissionSecurityUpdateError } from "../../core/exceptions";

@injectable()
export class PermissionSecurityService {

    constructor(@inject("IPermissionSecurityRepository") private readonly repository: IPermissionSecurityRepository) { };

    async createPermissionSecurity(data: PermissionSecurityDto): Promise<PermissionSecurityDocument> {


        await PermissionSecurityValidator.validatePermissionSecurityUniqueness(data.permission);

        try {
            return await this.repository.createPermissionSecurity(data);
        } catch (error) {
            if (error.code === 11000) {
                throw new PermissionSecurityDuplicateError();
            }
            throw error;
        }
    }

    async findPermissionSecurityById(idPermission : ObjectIdParam) : Promise<PermissionSecurityDocument | null>{

        const permissionSecurity = await this.repository.findPermissionSecurityById(idPermission);

        if(!permissionSecurity) throw new PermissionSecurityNotFoundError();

        return permissionSecurity;
    }

    async updatePermissionSecurity(idPermission: ObjectIdParam, data: UpdatePermissionSecurityDto) : Promise<PermissionSecurityDocument | null>{

        const permissionSecurity = await this.repository.updatePermissionSecurity(idPermission, data);

        if(!permissionSecurity) throw new PermissionSecurityUpdateError();

        return permissionSecurity;
    }

    async deletePermissionSecurity(idPermission: ObjectIdParam) : Promise<PermissionSecurityDocument | null>{

        const permission = await this.repository.findPermissionSecurityById(idPermission);

        PermissionSecurityValidator.validateFoundPermissionSecurity(permission);

        PermissionSecurityValidator.validateIsActive(permission);

        return this.repository.deletePermissionSecurity(idPermission);
    }

    async togglePermissionSecurityCan(idPermission: ObjectIdParam) : Promise<PermissionSecurityDocument | null>{


        const permission = await this.repository.findPermissionSecurityById(idPermission);

        PermissionSecurityValidator.validateFoundPermissionSecurity(permission);

        return this.repository.togglePermissionSecurityActive(idPermission);
    }

}