import { z } from "zod";
import { PermissionDocument, PermissionModel } from "../../../../db/models/permissionsModels/permission.model";
import { LabelDuplicateError, LabelInvalidError, PermissionAlreadyInactiveError } from "../../../exceptions";
import { labelSchema } from "../schemas/labelSchema.zod";

export class PermissionValidator{

    static validateIsActive(permission: PermissionDocument) : void {

        if(!permission.isActive){

            throw new PermissionAlreadyInactiveError();
        }
    }

    static validateLabelFormat(label: string) : void{

        try {
            
            labelSchema.parse(label);

        } catch (error) {
            
            if(error instanceof z.ZodError){

                throw new LabelInvalidError("Formato de label inválido: ", error.errors)
            }
            throw error;
        }
    }

    static readonly validateLabelUniqueness = async (label : string) => {

        const exists = await PermissionModel.findOne({label});
        if(exists) throw new LabelDuplicateError("El label ya existe");
    }
}