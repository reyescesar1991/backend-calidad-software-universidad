
import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IPermissionRepository } from "./interfaces/IPermissionRepository";
import { CreatePermissionDto, ObjectIdParam, UpdatePermissionDto } from "../../validations";
import { PermissionDocument } from "../../db/models/permissionsModels/permission.model";
import { InvalidParamError, PermissionDuplicateError, PermissionInUseError, PermissionNotFoundError, PermissionUpdateError } from "../../core/exceptions";
import { PermissionValidator } from "../../core/validators";
import { RoleModel } from "../../db/models";

@injectable()
export class PermissionService {

    constructor(@inject("IPermissionRepository") private readonly repository: IPermissionRepository,
                
    
    @inject("PermissionValidator") private readonly permissionValidator: PermissionValidator,
            
    ) { }

    async createPermission(data: CreatePermissionDto): Promise<PermissionDocument> {

        await this.permissionValidator.validateUniqueField("permission" ,data.permission);

        try {
            return await this.repository.createPermission(data);
        } catch (error) {
            if (error.code === 11000) {
                throw new PermissionDuplicateError("El permiso ya existe");
            }
            throw error;
        }
    }

    async getPermissionById(id: ObjectIdParam): Promise<PermissionDocument | null> {

        const permission = await this.repository.findPermissionById(id);
        if (!permission) throw new PermissionNotFoundError();
        return permission;
    }

    async updatePermission(
        id: ObjectIdParam,
        data: UpdatePermissionDto
    ): Promise<PermissionDocument | null> {

        const permissionSecurity = await this.repository.findPermissionById(id);

        if (data.label !== undefined && data.label !== permissionSecurity.label) {
            await this.permissionValidator.validateUniqueField("label", data.label);
        }

        if (data.permission !== undefined && data.permission !== permissionSecurity.permission) {
            await this.permissionValidator.validateUniqueField("permission", data.permission);
        }

        const hasChanges = Object.keys(data).some(key => data[key] !== permissionSecurity[key]);
        if (!hasChanges) {
            return permissionSecurity;
        }

        const updatedPermission = await this.repository.updatePermission(id, data);
        if (!updatedPermission) throw new PermissionUpdateError();
        return updatedPermission;
    }

    async deletePermission(id: ObjectIdParam): Promise<PermissionDocument | null> {

        const permission = await this.repository.findPermissionById(id);
        if (!permission) throw new PermissionNotFoundError();
        PermissionValidator.validateIsActive(permission);
        return this.repository.deletePermission(id);
    }

    async togglePermissionCan(id: ObjectIdParam): Promise<PermissionDocument | null> {

        const permission = await this.repository.findPermissionById(id);
        if (!permission) throw new PermissionNotFoundError();

        return this.repository.togglePermissionCan(id);
    }

    async updateLabelPermission(id: ObjectIdParam, newLabel: string): Promise<PermissionDocument | null> {

        PermissionValidator.validateLabelFormat(newLabel);

        await this.permissionValidator.validateUniqueField("label" , newLabel);

        const permission = await this.repository.findPermissionById(id);
        if (!permission) throw new PermissionNotFoundError();

        return this.repository.updateLabelPermission(id, newLabel);
    }

    async permanentlyDeletePermission(id: ObjectIdParam): Promise<PermissionDocument | null> {
        // 1. Obtener el permiso (y validar que existe)
        const permission = await this.getPermissionById(id);

        if(!permission) throw new PermissionNotFoundError();
    
        // 2. Verificar si el permiso está asignado a algún rol
        const isUsed = await RoleModel.exists({ 
            permissions: permission._id // Busca el ObjectId en el array "permissions"
        });
    
        if (isUsed) {
            throw new PermissionInUseError("El permiso está asignado a uno o más roles");
        }
    
        // 3. Si no está en uso, eliminar permanentemente
        return this.repository.permanentlyDeletePermission(id);
    }

    async listPermissions() : Promise<PermissionDocument[] | null>{

        return this.repository.listPermissions();
    }

    async getPermissionsByStatus(isActive : boolean) : Promise<PermissionDocument[] | null>{

        if (typeof isActive !== "boolean") {
            throw new InvalidParamError("Formato de parámetro invalido");
        }

        const permissions = await this.repository.getPermissionsByStatus(isActive);

        if(permissions.length === 0){

            throw new PermissionNotFoundError(`No hay permisos ${isActive ? "activos" : "inactivos"}`)
        }

        return permissions;
    }
}