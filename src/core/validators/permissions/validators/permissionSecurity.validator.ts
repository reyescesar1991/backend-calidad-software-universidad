import { PermissionSecurityDocument, PermissionSecurityModel } from "../../../../db/models"
import { PermissionSecurityAlreadyInactiveError, PermissionSecurityDuplicateError, PermissionSecurityNotFoundError } from "../../../exceptions";

export class PermissionSecurityValidator{

    static validateIsActive(permission : PermissionSecurityDocument) : void {

        if(!permission.isActive){

            throw new PermissionSecurityAlreadyInactiveError();
        }
    }

    static validateFoundPermissionSecurity(permission : PermissionSecurityDocument) : void {

        if(!permission){

            throw new PermissionSecurityNotFoundError();
        }
    }

    static readonly validatePermissionSecurityUniqueness = async (permission : string) => {

        const exists = await PermissionSecurityModel.findOne({permission});
        if(exists) throw new PermissionSecurityDuplicateError();
    }
}