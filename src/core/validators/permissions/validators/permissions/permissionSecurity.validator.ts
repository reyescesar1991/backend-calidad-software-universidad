import { z } from "zod";
import { PermissionSecurityDocument, PermissionSecurityModel } from "../../../../../db/models"
import { LabelDuplicatePermissionSecurityError, LabelSecurityPermissionInvalidError, PermissionSecurityAlreadyInactiveError, PermissionSecurityDuplicateError, PermissionSecurityIdDuplicateError, PermissionSecurityNotFoundError } from "../../../../exceptions";
import { labelSchema } from "../../schemas/labelSchema.zod";
import { inject, injectable } from "tsyringe";
import { IPermissionSecurityRepository } from "../../../../../services/permissionSecurity";

@injectable()
export class PermissionSecurityValidator {

    constructor(@inject("IPermissionSecurityRepository") private readonly repository: IPermissionSecurityRepository,){}


        private static UNIQUE_FIELDS = {
    
            label: LabelDuplicatePermissionSecurityError,
            permission: PermissionSecurityDuplicateError,
            id : PermissionSecurityIdDuplicateError,
        }


    static validateIsActive(permission: PermissionSecurityDocument): void {

        if (!permission.isActive) {

            throw new PermissionSecurityAlreadyInactiveError();
        }
    }

    static validateFoundPermissionSecurity(permission: PermissionSecurityDocument): void {

        if (!permission) {

            throw new PermissionSecurityNotFoundError();
        }
    }

    static validateLabelFormat(label: string): void {

        try {

            labelSchema.parse({ label: label });


        } catch (error) {


            if (error instanceof z.ZodError) {


                throw new LabelSecurityPermissionInvalidError("Formato de label inválido: ", error.errors)
            }
            throw error;
        }
    }

    async validateUniqueField<T extends keyof typeof PermissionSecurityValidator.UNIQUE_FIELDS>
    (field: T, value: string)
    : Promise<void>
    {

        const exists = await this.repository.findByField(field, value);;

        if(exists){

            const ErrorClass = PermissionSecurityValidator.UNIQUE_FIELDS[field];
            throw new ErrorClass(`El ${field} '${value}' ya existe, intente con otro valor`)
        }
    }
}