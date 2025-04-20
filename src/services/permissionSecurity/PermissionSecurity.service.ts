import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { IPermissionSecurityRepository } from "./interfaces/IPermissionSecurityRepository";
import { PermissionSecurityDocument, RoleModel } from "../../db/models";
import { PermissionSecurityValidator } from "../../core/validators";
import { ObjectIdParam, PermissionSecurityDto, UpdatePermissionSecurityDto } from "../../validations";
import { InvalidParamError, PermissionNotFoundError, PermissionSecurityDuplicateError, PermissionSecurityInUseError, PermissionSecurityNotFoundError, PermissionSecurityUpdateError } from "../../core/exceptions";

@injectable()
export class PermissionSecurityService {

    constructor(@inject("IPermissionSecurityRepository") private readonly repository: IPermissionSecurityRepository,
        @inject("PermissionSecurityValidator") private permissionValidator: PermissionSecurityValidator,

    ) { };

    async createPermissionSecurity(data: PermissionSecurityDto): Promise<PermissionSecurityDocument> {


        await this.permissionValidator.validateUniqueField("permission", data.permission);

        await this.permissionValidator.validateUniqueField("label", data.label);

        await this.permissionValidator.validateUniqueField("id", data.id);

        try {
            return await this.repository.createPermissionSecurity(data);
        } catch (error) {
            if (error.code === 11000) {
                throw new PermissionSecurityDuplicateError();
            }
            throw error;
        }
    }

    async findPermissionSecurityById(idPermission: ObjectIdParam): Promise<PermissionSecurityDocument | null> {

        const permissionSecurity = await this.repository.findPermissionSecurityById(idPermission);

        if (!permissionSecurity) throw new PermissionSecurityNotFoundError();

        return permissionSecurity;
    }

    async updatePermissionSecurity(idPermission: ObjectIdParam, data: UpdatePermissionSecurityDto): Promise<PermissionSecurityDocument | null> {

        const permission = await this.repository.findPermissionSecurityById(idPermission);

        PermissionSecurityValidator.validateFoundPermissionSecurity(permission);

        if (data.label !== undefined && data.label !== permission.label) {
            await this.permissionValidator.validateUniqueField("label", data.label);
        }

        if (data.id !== undefined && data.id !== permission.id) {
            await this.permissionValidator.validateUniqueField("id", data.id);
        }

        const hasChanges = Object.keys(data).some(key => data[key] !== permission[key]);
        if (!hasChanges) {
            return permission;
        }

        const permissionSecurity = await this.repository.updatePermissionSecurity(idPermission, data);

        if (!permissionSecurity) throw new PermissionSecurityUpdateError();

        return permissionSecurity;
    }

    async deletePermissionSecurity(idPermission: ObjectIdParam): Promise<PermissionSecurityDocument | null> {

        const permission = await this.repository.findPermissionSecurityById(idPermission);

        PermissionSecurityValidator.validateFoundPermissionSecurity(permission);

        PermissionSecurityValidator.validateIsActive(permission);

        return this.repository.deletePermissionSecurity(idPermission);
    }

    async togglePermissionSecurityActive(idPermission: ObjectIdParam): Promise<PermissionSecurityDocument | null> {


        const permission = await this.repository.findPermissionSecurityById(idPermission);

        PermissionSecurityValidator.validateFoundPermissionSecurity(permission);

        return this.repository.togglePermissionSecurityActive(idPermission);
    }

    async updateLabelPermissionSecurity(idPermission: ObjectIdParam, newLabel: string): Promise<PermissionSecurityDocument | null> {


        const permission = await this.repository.findPermissionSecurityById(idPermission);

        PermissionSecurityValidator.validateFoundPermissionSecurity(permission);

        PermissionSecurityValidator.validateLabelFormat(newLabel);

        await this.permissionValidator.validateUniqueField("label", newLabel);

        return this.repository.updateLabelPermissionSecurity(idPermission, newLabel);
    }

    async listPermissionsSecurity(): Promise<PermissionSecurityDocument[] | null> {

        return this.repository.listPermissionsSecurity();
    }

    async getPermissionsSecurityByStatus(isActive: boolean): Promise<PermissionSecurityDocument[] | null> {

        if (typeof isActive !== "boolean") {
            throw new InvalidParamError("Formato de parámetro invalido");
        }

        const permissionsSecurity = await this.repository.getPermissionsSecurityByStatus(isActive);

        if (permissionsSecurity.length === 0) {

            throw new PermissionNotFoundError(`No hay permisos ${isActive ? "activos" : "inactivos"}`);

        }

        return permissionsSecurity;

    }

    async changeIsSystemDefinedPermissionSecurity(idPermission: ObjectIdParam): Promise<PermissionSecurityDocument | null> {

        const permissionSecurity = await this.repository.findPermissionSecurityById(idPermission);

        PermissionSecurityValidator.validateFoundPermissionSecurity(permissionSecurity);

        return this.repository.changeIsSystemDefinedPermissionSecurity(idPermission);
    }

    async permanentlyDeletePermissionSecurity(idPermission: ObjectIdParam): Promise<PermissionSecurityDocument | null> {


        const permissionSecurity = await this.repository.findPermissionSecurityById(idPermission);

        PermissionSecurityValidator.validateFoundPermissionSecurity(permissionSecurity);

        const isUsed = await RoleModel.exists({
            permissionsSecurity: permissionSecurity._id // Busca el ObjectId en el array "permissions"
        });

        if (isUsed) {
            throw new PermissionSecurityInUseError("El permiso de seguridad está asignado a uno o más roles");
        }

        return this.repository.permanentlyDeletePermissionSecurity(idPermission);
    }

}