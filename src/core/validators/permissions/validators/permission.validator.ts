import { PermissionDocument, PermissionModel } from "../../../../db/models/permissionsModels/permission.model";
import { LabelDuplicateError, PermissionAlreadyInactiveError } from "../../../exceptions";
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
            
            
        }
    }

    static readonly validateLabelUniqueness = async (label : string) => {

        const exists = await PermissionModel.findOne({label});
        if(exists) throw new LabelDuplicateError("El label ya existe");
    }
}