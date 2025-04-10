import { PermissionDocument } from "../../../db/models/permissionsModels/permission.model";
import { PermissionAlreadyInactiveError } from "../../exceptions";

export class PermissionValidator{

    static validateIsActive(permission: PermissionDocument) : void {

        if(!permission.isActive){

            throw new PermissionAlreadyInactiveError();
        }
    }
}