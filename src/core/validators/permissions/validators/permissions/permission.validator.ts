import { z } from "zod";
import { PermissionDocument, PermissionModel } from "../../../../../db/models/permissionsModels/permission.model";
import { LabelDuplicateError, LabelInvalidError, PermissionAlreadyInactiveError, PermissionDuplicateError, PermissionNotFoundError } from "../../../../exceptions";
import { labelSchema } from "../../schemas/labelSchema.zod";
import { inject, injectable } from "tsyringe";
import { IPermissionRepository } from "../../../../../services/permission";

@injectable()
export class PermissionValidator{

    constructor(@inject("IPermissionRepository") private readonly repository: IPermissionRepository,){}

    private static UNIQUE_FIELDS = {

        label: LabelDuplicateError,
        permission: PermissionDuplicateError,
    }

    static validateIsActive(permission: PermissionDocument) : void {

        if(!permission.isActive){

            throw new PermissionAlreadyInactiveError();
        }
    }

    static validateExistsPermission(permission : PermissionDocument){

        if(!permission) throw new PermissionNotFoundError();
    }

    static validateLabelFormat(label: string) : void{

        try {
            
            console.log(label);
            
            labelSchema.parse({label : label});
            

        } catch (error) {

            console.log(error);
            
            if(error instanceof z.ZodError){

                console.log(error);
                
                throw new LabelInvalidError("Formato de label inválido: ", error.errors)
            }
            throw error;
        }
    }

    async validateUniqueField<T extends keyof typeof PermissionValidator.UNIQUE_FIELDS>
    (field: T, value: string)
    : Promise<void>
    {

        const exists = await this.repository.findByField(field, value);;

        if(exists){

            const ErrorClass = PermissionValidator.UNIQUE_FIELDS[field];
            throw new ErrorClass(`El ${field} '${value}' ya existe, intente con otro valor`)
        }
    }

}