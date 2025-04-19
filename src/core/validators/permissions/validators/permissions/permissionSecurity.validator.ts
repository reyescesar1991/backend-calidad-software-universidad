import { z } from "zod";
import { PermissionSecurityDocument, PermissionSecurityModel } from "../../../../../db/models"
import { LabelDuplicatePermissionSecurityError, LabelSecurityPermissionInvalidError, PermissionSecurityAlreadyInactiveError, PermissionSecurityDuplicateError, PermissionSecurityNotFoundError } from "../../../../exceptions";
import { labelSchema } from "../../schemas/labelSchema.zod";

export class PermissionSecurityValidator {

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

    static readonly validatePermissionSecurityUniqueness = async (permission: string) => {

        const exists = await PermissionSecurityModel.findOne({ permission });
        if (exists) throw new PermissionSecurityDuplicateError();
    }

    static readonly validateLabelUniqueness = async (label: string) => {

        const exists = await PermissionSecurityModel.findOne({ label });
        if (exists) throw new LabelDuplicatePermissionSecurityError();
    }
}